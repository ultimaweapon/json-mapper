import { getClass, getProperties } from './config';
import { Context } from './context';
import { InvalidProperty } from './errors';
import { Constructor, GenericClass, JsonArray, JsonObject, JsonScalar, JsonValue, PolymorphismObject, Type, TypeArgument } from './types';

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: null): null;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: BooleanConstructor): boolean;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param required true to disallow null; otherwise false.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
 export function fromJSON(json: JsonValue, type: BooleanConstructor, required: true): boolean;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param required true to disallow null; otherwise false.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: BooleanConstructor, required: false): boolean | null;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: NumberConstructor): number;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param required true to disallow null; otherwise false.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: NumberConstructor, required: true): number;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param required true to disallow null; otherwise false.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: NumberConstructor, required: false): number | null;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: StringConstructor): string;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param required true to disallow null; otherwise false.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: StringConstructor, required: true): string;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param required true to disallow null; otherwise false.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: StringConstructor, required: false): string | null;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON<T>(json: JsonValue, type: new (...args: any[]) => T): T;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param required true to disallow null; otherwise false.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON<T>(json: JsonValue, type: new (...args: any[]) => T, required: true): T;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param required true to disallow null; otherwise false.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON<T>(json: JsonValue, type: new (...args: any[]) => T, required: false): T | null;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param elem Type of array element.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: ArrayConstructor, elem: null): Array<null>;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param elem Type of array element.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: ArrayConstructor, elem: BooleanConstructor): Array<boolean>;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param elem Type of array element.
 * @param allowNull false to disallow null in the element; otherwise true.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: ArrayConstructor, elem: BooleanConstructor, allowNull: false): Array<boolean>;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param elem Type of array element.
 * @param allowNull false to disallow null in the element; otherwise true.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: ArrayConstructor, elem: BooleanConstructor, allowNull: true): Array<boolean | null>;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param elem Type of array element.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: ArrayConstructor, elem: NumberConstructor): Array<number>;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param elem Type of array element.
 * @param allowNull false to disallow null in the element; otherwise true.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: ArrayConstructor, elem: NumberConstructor, allowNull: false): Array<number>;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param elem Type of array element.
 * @param allowNull false to disallow null in the element; otherwise true.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: ArrayConstructor, elem: NumberConstructor, allowNull: true): Array<number | null>;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param elem Type of array element.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: ArrayConstructor, elem: StringConstructor): Array<string>;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param elem Type of array element.
 * @param allowNull false to disallow null in the element; otherwise true.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: ArrayConstructor, elem: StringConstructor, allowNull: false): Array<string>;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param elem Type of array element.
 * @param allowNull false to disallow null in the element; otherwise true.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON(json: JsonValue, type: ArrayConstructor, elem: StringConstructor, allowNull: true): Array<string | null>;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param elem Type of array element.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON<T>(json: JsonValue, type: ArrayConstructor, elem: new(...args: any[]) => T): Array<T>;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param elem Type of array element.
 * @param allowNull false to disallow null in the element; otherwise true.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON<T>(json: JsonValue, type: ArrayConstructor, elem: new(...args: any[]) => T, allowNull: false): Array<T>;

/**
 * Convert JSON value to the instance of the specified type according to its mapping configurations.
 *
 * @param json JSON value to convert.
 * @param type Type to convert to.
 * @param elem Type of array element.
 * @param allowNull false to disallow null in the element; otherwise true.
 *
 * @returns The converted value.
 * @throws {MappingError} The value cannot converted.
 */
export function fromJSON<T>(json: JsonValue, type: ArrayConstructor, elem: new(...args: any[]) => T, allowNull: true): Array<T | null>;
export function fromJSON(json: JsonValue, type: Constructor | null, opt1?: boolean | null | Constructor, opt2?: boolean): unknown {
  let t: Type;
  let o: Options;

  if (opt1 === null || typeof opt1 === 'function') {
    t = [Array, [opt1]];
    o = { required: true };

    if (typeof opt2 === 'boolean') {
      t[1] = [{ type: opt1, required: !opt2 }];
    }
  } else {
    t = type;
    o = { required: typeof opt1 === 'boolean' ? opt1 : true };
  }

  return convertTo(new Context(), json, t, o);
}

function convertTo(ctx: Context, json: JsonValue | undefined, type: Type, options: Options): unknown {
  // handle undefined and null
  if (json === undefined) {
    if (options.optional) {
      return undefined;
    }

    throw new InvalidProperty('Expect a value, got none.', ctx.currentPath());
  } else if (json === null) {
    if (options.required && type !== null) {
      throw new InvalidProperty('Expect non-null, got null.', ctx.currentPath());
    }

    return null;
  }

  // do conversion
  if (type === null) {
    // when we reached here that mean json is not null due to it already handled by the above code
    throw new InvalidProperty(`Expect null, got ${typeof json}.`, ctx.currentPath());
  } else if (type === Boolean) {
    return convertToBoolean(ctx, json);
  } else if (type === Number) {
    return convertNumber(ctx, json);
  } else if (type === String) {
    return convertToString(ctx, json);
  } else if (type === Date) {
    return convertToDate(ctx, json);
  } else if (Array.isArray(type)) {
    // generic class
    if (type[0] === Array) {
      const e = type[1][0];

      if (e === undefined) {
        throw new InvalidProperty("No type argument is provided. Did you forgot to specify 'args' option?", ctx.currentPath());
      }

      return convertToArray(ctx, json, e);
    } else {
      return convertToObject(ctx, json, type);
    }
  } else if (typeof type === 'function') {
    return convertToObject(ctx, json, type);
  } else {
    throw new Error(`Unsupported type '${type}'.`);
  }
}

function convertToBoolean(ctx: Context, json: JsonScalar | JsonObject | JsonArray): boolean {
  if (typeof json !== 'boolean') {
    throw new InvalidProperty(`Expect boolean, got ${typeof json}.`, ctx.currentPath());
  }

  return json;
}

function convertNumber(ctx: Context, json: JsonScalar | JsonObject | JsonArray): number {
  if (typeof json !== 'number') {
    throw new InvalidProperty(`Expect number, got ${typeof json}.`, ctx.currentPath());
  }

  return json;
}

function convertToString(ctx: Context, json: JsonScalar | JsonObject | JsonArray): string {
  if (typeof json !== 'string') {
    throw new InvalidProperty(`Expect string, got ${typeof json}.`, ctx.currentPath());
  }

  return json;
}

function convertToDate(ctx: Context, json: JsonScalar | JsonObject | JsonArray): Date {
  if (typeof json !== 'string') {
    throw new InvalidProperty(`Expect string, got ${typeof json}.`, ctx.currentPath());
  }

  const v = Date.parse(json);

  if (isNaN(v)) {
    throw new InvalidProperty(`Expect ISO 8601 string, got ${json}.`, ctx.currentPath());
  }

  return new Date(v);
}

function convertToArray(ctx: Context, json: JsonScalar | JsonObject | JsonArray, elem: TypeArgument): Array<unknown> {
  if (!Array.isArray(json)) {
    throw new InvalidProperty(`Expect array, got ${typeof json}.`, ctx.currentPath());
  }

  const v = new Array();
  let t;
  let o: Options;

  if (elem === null || typeof elem === 'function' || Array.isArray(elem)) {
    t = elem;
    o = { required: true };
  } else {
    t = elem.type;
    o = { required: elem.required };
  }

  for (let i = 0; i < json.length; i++) {
    ctx.push(i);
    v.push(convertTo(ctx, json[i], t, o));
    ctx.pop();
  }

  return v;
}

function convertToObject(ctx: Context, json: JsonScalar | JsonObject | JsonArray, type: Constructor | GenericClass, base?: Constructor): object {
  // get class configurations
  const ctor = typeof type === 'function' ? type : type[0];
  const args = typeof type === 'function' ? undefined : type[1];
  const conf = getClass(ctor);

  if (!conf) {
    throw new InvalidProperty(`No configuration for ${ctor.name}, perhaps you did not decorated it with JsonClass?`, ctx.currentPath());
  }

  // check if custom reader is present
  if (conf.reader) {
    if (base) {
      throw new InvalidProperty(`${ctor.name} cannot specify a custom reader if it is involve in polymorphism mapping.`, ctx.currentPath());
    }

    return conf.reader(ctx, json);
  } else if (typeof json !== 'object') {
    throw new InvalidProperty(`Expect object, got ${typeof json}.`, ctx.currentPath());
  } else if (Array.isArray(json)) {
    throw new InvalidProperty(`Expect object, got array.`, ctx.currentPath());
  }

  // map properties
  const obj = new ctor() as { [p: string]: unknown };
  const proto = ctor.prototype as Object;
  const props = getProperties(proto, base);
  const completed = new Set<string>();

  for (const prop of props) {
    let type: Type;

    // skip if we already mapped property with the same name
    // this can be happen if the derived class override properties on the base class
    if (completed.has(prop.name)) {
      continue;
    }

    ctx.push(prop.name);

    const value = json[prop.name];
    const options: Options = { optional: prop.optional };

    // determine type
    if (prop.discriminator) {
      const r = prop.discriminator(ctx, obj, value);

      if (typeof r === 'function' || Array.isArray(r) || r === null) {
        type = r;
        options.required = true;
      } else {
        type = r.type;
        options.required = r.required;
      }
    } else if (typeof prop.type === 'function') {
      type = prop.type;
    } else if (typeof prop.type === 'number') {
      if (!args) {
        throw new InvalidProperty("No type argument is provided. Did you forgot to specify 'args' option?", ctx.currentPath());
      }

      const a = args[prop.type];

      if (a === undefined) {
        throw new InvalidProperty("No type argument is provided. Did you forgot to specify 'args' option?", ctx.currentPath());
      } else if (typeof a === 'function' || Array.isArray(a) || a === null) {
        type = a;
        options.required = true;
      } else {
        type = a.type;
        options.required = a.required;
      }
    } else {
      type = Reflect.getMetadata('design:type', proto, prop.name);

      if (type === undefined) {
        throw new InvalidProperty('No design time metadata; perhaps you forgot to enable emitDecoratorMetadata?', ctx.currentPath());
      } else if (type === Object) {
        // design:type will be Object if a property is union type (e.g. string | null)
        throw new InvalidProperty("The union type need to specify type with 'type' option explicitly.", ctx.currentPath());
      }

      options.required = true; // non-union type will always non-null

      if (prop.args) {
        type = [type as Constructor, prop.args];
      }
    }

    // override required
    if (prop.required !== undefined) {
      options.required = prop.required;
    }

    // convert value
    const r = convertTo(ctx, value, type, options);

    if (r !== undefined) {
      obj[prop.name] = r;
    }

    ctx.pop();
    completed.add(prop.name);
  }

  // check if the object require a derived instance
  // beware for any bugs here if you don't fully understand prototype chain in JavaScript
  if (proto.hasOwnProperty('getType')) {
    // TODO: check if a returned type is derived from base type
    const sub = convertToObject(ctx, json, (obj as unknown as PolymorphismObject).getType(ctx), ctor) as typeof obj;

    // move base properties to the derived instance
    const completed = new Set<string>();

    for (const { name, movable } of props) {
      if (completed.has(name)) {
        continue;
      }

      if (movable === undefined || movable) {
        sub[name] = obj[name];
      }

      completed.add(name);
    }

    return sub;
  } else {
    return obj;
  }
}

interface Options {
  required?: boolean;
  optional?: boolean;
}
