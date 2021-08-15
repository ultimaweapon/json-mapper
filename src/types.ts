export type JsonObject = { [p: string]: JsonValue };
export type JsonArray = JsonValue[];
export type JsonScalar = boolean | number | string;
export type JsonValue = JsonScalar | JsonObject | JsonArray | null;

export type Constructor = new(...args: any[]) => object;
export type GenericClass = [Constructor, TypeArgument[]];
export type Type = Constructor | GenericClass | null;
export type TypeParameter = number;
export type TypeArgument = Type | { type: Type, required?: boolean };

export interface MappingContext {
  currentPath(): string;

  /**
   * Get full path of the specified property based on current path.
   *
   * @param name The property name or array index to get the full path.
   * @param strip The number of path part to strip at the end from the current path before append the specified property name.
   *
   * @returns Full path of the specified property based on the current path.
   */
  pathFor(name: string | number, strip?: number): string;

  parentPath(): string;
}

export interface PolymorphismObject {
  /**
   * Get the type for mapping based on the current mapped data of this class.
   *
   * @param ctx Current mapping context.
   *
   * @returns Constructor of the derived type to map from the same JSON object.
   * @throws {MappingError} The JSON data cannot be mapped.
   */
  getType(ctx: MappingContext): Constructor | GenericClass;
}
