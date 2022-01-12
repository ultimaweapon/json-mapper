import { getClass, getProperties } from './config';
import { Context } from './context';
import { InvalidProperty } from './errors';
import { Constructor } from './types';

/**
 * Convert a value to JSON according to the mapping configurations of the specified value.
 *
 * @param value The value to convert.
 *
 * @returns The stringified JSON.
 * @throws {MappingError} The value cannot be converted.
 */
export function toJSON(value: unknown): string;

/**
 * Convert a value to JSON according to the mapping configurations of the specified value.
 *
 * @param value The value to convert.
 * @param stringify true to stringify the converted value or false to get the value to stringify later.
 *
 * @returns The stringified value.
 * @throws {MappingError} The value cannot be converted.
 */
export function toJSON(value: unknown, stringify: true): string;

/**
 * Convert a value to JSON according to the mapping configurations of the specified value.
 *
 * @param value The value to convert.
 * @param stringify true to stringify the converted value or false to get the value to stringify later.
 *
 * @returns The value to stringify later.
 * @throws {MappingError} The value cannot be converted.
 */
export function toJSON(value: unknown, stringify: false): unknown;
export function toJSON(value: unknown, stringify?: boolean): unknown {
  const c = new Context();

  if (value === undefined) {
    throw new InvalidProperty(`${typeof value} is not a valid value for json.`, c.currentPath());
  }

  const r = convertFrom(c, value);

  if (stringify === undefined || stringify) {
    return JSON.stringify(r);
  } else {
    return r;
  }
}

function convertFrom(ctx: Context, value: unknown): unknown {
  switch (typeof value) {
    case 'boolean':
    case 'number':
    case 'string':
      return value;
    case 'object':
      if (value === null) {
        return null;
      } else if (Array.isArray(value)) {
        return convertFromArray(ctx, value);
      } else if (value instanceof Date) {
        return value;
      } else if (value instanceof Map) {
        return convertFromMap(ctx, value);
      } else {
        return convertFromObject(ctx, value);
      }
    default:
      throw new InvalidProperty(`Don't know how to convert ${typeof value} to JSON.`, ctx.currentPath());
  }
}

function convertFromArray(ctx: Context, value: Array<unknown>): Array<unknown> {
  const r = new Array<unknown>(value.length);

  for (let i = 0; i < value.length; i++) {
    ctx.push(i);
    r[i] = convertFrom(ctx, value[i]);
    ctx.pop();
  }

  return r;
}

function convertFromMap(ctx: Context, value: Map<unknown, unknown>): object {
  const res: any = {};

  for (const [k, v] of value) {
    if (typeof k !== 'string') {
      throw new InvalidProperty(`Type of map key other than string is not supported yet.`, ctx.currentPath());
    }

    ctx.push(k);
    res[k] = convertFrom(ctx, v);
    ctx.pop();
  }

  return res;
}

function convertFromObject(ctx: Context, value: object): unknown {
  // get mapping configurations
  const proto = Reflect.getPrototypeOf(value) as Object;
  const ctor = proto.constructor as Constructor;
  const conf = getClass(ctor);

  if (!conf) {
    const msg = `No mapping configurations for ${ctor.name}, perhaps you forgot to decorated it with JsonClass?`;
    const path = ctx.currentPath();

    throw new InvalidProperty(msg, path);
  } else if (conf.writer) {
    return conf.writer(ctx, value);
  }

  // map properties
  const props = getProperties(proto);
  const src = value as any;
  const res: any = {};
  const completed = new Set<string>();

  for (const { name, optional } of props) {
    if (completed.has(name)) {
      // we are in the base property that already overriden by the derived class
      continue;
    }

    ctx.push(name);

    const value = src[name];
    const complete = () => {
      ctx.pop();
      completed.add(name);
    };

    if (value === undefined) {
      if (optional) {
        complete();
        continue;
      }

      throw new InvalidProperty(`Property ${name} on ${ctor.name} is undefined but did not specified it is optional.`, ctx.currentPath());
    }

    res[name] = convertFrom(ctx, value);
    complete();
  }

  return res;
}
