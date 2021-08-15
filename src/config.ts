/// <reference types="reflect-metadata"/>
import { Constructor, JsonArray, JsonObject, JsonScalar, JsonValue, MappingContext, Type, TypeArgument, TypeParameter } from './types';

/**
 * Make the specified class to support mapping to/from JSON. This function is using for integrating external library with json-mapper. For your
 * application code use decorators instead.
 *
 * @param ctor The constructor of the class to support mapping.
 * @param conf The configurations to use.
 */
export function configClass(ctor: Constructor, conf?: ClassConfigurations): void {
  Reflect.defineMetadata(ClassKey, conf ?? {}, ctor);
}

/**
 * Add mapping configurations for the property of the specified class. This function is using for integrating external library with json-mapper. For
 * your application code use decorators instead.
 *
 * @param owner A constructor or prototype of the class who own the property to configure.
 * @param conf The configurations to use.
 */
export function configProperty(owner: Constructor | Object, conf: PropertyConfigurations): void {
  const proto = typeof owner === 'function' ? owner.prototype : owner;
  let set = Reflect.getMetadata(PropertiesKey, proto) as PropertyConfigurations[];

  if (set === undefined) {
    Reflect.defineMetadata(PropertiesKey, set = [], proto);
  }

  set.push(conf);
}

export function getClass(ctor: Constructor): ClassConfigurations | undefined {
  return Reflect.getMetadata(ClassKey, ctor);
}

export function getProperties(proto: Object | null, stop?: Constructor): PropertyConfigurations[] {
  if (proto === null || (stop !== undefined && proto.constructor === stop)) {
    return [];
  }

  // it is possible for the class to have no properties defined in that case we need to fallback to empty array
  return [...(Reflect.getMetadata(PropertiesKey, proto) ?? []), ...getProperties(Reflect.getPrototypeOf(proto), stop)];
}

export interface ClassConfigurations {
  /**
   * Custom reader for convert JSON to the associated class.
   *
   * @param ctx Current mapping context.
   * @param json Raw JSON value.
   *
   * @returns The instance of the class where this configurations is associated with.
   * @throws {MappingError} The JSON value cannot be converted.
   */
  reader?(ctx: MappingContext, json: JsonScalar | JsonObject | JsonArray): object;

  /**
   * Custom writer for convert the instance of the associated class to JSON.
   *
   * @param ctx Current mapping context.
   * @param obj The instance of the class that associated with this configurations to convert.
   *
   * @returns JSON value for the specified instance.
   * @throws {MappingError} The instance cannot be converted.
   */
  writer?(ctx: MappingContext, obj: object): JsonScalar | JsonObject | JsonArray;
}

export interface PropertyConfigurations {
  /**
   * Name of the property.
   */
  name: string;

  /**
   * Type of the property, can be a constructor or the index of type parameter. This required for nullable type (e.g. string | null).
   */
  type?: Constructor | TypeParameter;

  /**
   * Custom function to dynamically determine the type for this property. This usually required if the property is a union type composed more than one
   * non-nullable.
   *
   * @param ctx Current mapping context.
   * @param obj The instance of the class where this property is belong to with all previous properties already get mapped.
   * @param json Raw JSON value for this property.
   *
   * @returns The type for this property. In the first form the null value will not allowed for the property.
   * @throws {MappingError} The type cannot determined.
   */
  discriminator?(ctx: MappingContext, obj: object, json: JsonValue): Type | { type: Type, required?: boolean };

  /**
   * Type arguments for the type of this property. Required for generic type and collection type (e.g. Array).
   */
  args?: Array<TypeArgument>;

  /**
   * Disallow null for this property. Use to override nullable from discriminator or type parameter.
   */
  required?: boolean;

  /**
   * Skip this property if the value is undefined. Use on optional property (e.g. name?: string).
   */
  optional?: boolean;

  /**
   * Allow this property to copy to the instance of the derived class for polymorphism denormalization. Specify false if
   * this property will be written by the constructor of the derived class with hard-coded value.
   */
  movable?: boolean;
}

const ClassKey = 'json:class';
const PropertiesKey = 'json:properties';
