export class MappingError extends Error {
}

export class InvalidProperty extends MappingError {
  constructor(message: string, readonly property: string) {
    super(message);
  }
}
