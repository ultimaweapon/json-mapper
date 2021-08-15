# TypeScript decorators for mapping between JSON and Classes

This is a powerful utility to convert and validate JSON value for TypeScript. The main purposes of this library is to enforce JSON schemas and make it
able to use `instanceof` to determine the type of JSON value.

The original source code of this package came from https://github.com/GillianPerard/typescript-json-serializer

## Runtime requirements

- ES2015
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)

## Required compiler options

- `experimentalDecorators`
- `emitDecoratorMetadata`

## Basic usages

### Create model

Create a model to represent a JSON object:

```ts
import { JsonClass, JsonProperty } from '@ultimicro/json-mapper';

@JsonClass()
class Foo {
  @JsonProperty()
  v1: string;

  @JsonProperty({ type: Number }) // nullable type required to specify type explicitly
  v2: number | null;

  @JsonProperty({ args: [String] })
  v3: string[];

  @JsonProperty({ optional: true })
  v4?: Date;

  constructor(v1: string, v2: number | null, v3: string[]) {
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
  }
}
```

### Convert JSON to the model instance

```ts
import { fromJSON } from '@ultimicro/json-mapper';

const json = JSON.parse('{"v1": "abc", "v2": 123, "v3": ["foo"], "v4": "2006-01-02T15:04:05.000Z"}');
const model = fromJSON(json, Foo);
```

### Convert the model instance to JSON

```ts
import { toJSON } from '@ultimicro/json-mapper';

const model = new Foo('abc', 123, ['foo']);
const str = toJSON(model);
const obj = toJSON(model, false); // invoke JSON.stringify(obj) to get JSON string
```

## Advance usage

### Map a class as single value instead of object

```ts
import { InvalidProperty, JsonArray, JsonClass, JsonObject, JsonScalar, MappingContext } from '@ultimicro/json-mapper';

@JsonClass({ reader: readBar, writer: writeBar })
class Bar {
  constructor(readonly value: string) {
  }
}

function readBar(ctx: MappingContext, json: JsonScalar | JsonObject | JsonArray): Bar {
  if (typeof json !== 'string') {
    throw new InvalidProperty(`Expect string, got ${typeof json}.`, ctx.currentPath());
  }

  return new Bar(json);
}

function writeBar(ctx: MappingContext, obj: Bar): JsonScalar | JsonObject | JsonArray {
  return obj.value;
}
```

### Using 3rd party classes as a model

```ts
import { configClass, configProperty } from '@ultimicro/json-mapper';
import { SomeClass } from 'somelib';

// the bottom code MUST run exactly one
configClass(SomeClass); // use the second argument to specify custom reader/writer to treat this class as a single value like the above example
configProperty(SomeClass, { name: 'prop1', type: String }); // you can use any additional options that are available on JsonProperty

// now you can use SomeClass as a JSON model anywhere
```

### Property with dynamic type

```ts
import { InvalidProperty, JsonClass, JsonProperty, JsonValue, MappingContext, Type } from '@ultimicro/json-mapper';

@JsonClass()
class Foo {
  @JsonProperty({ discriminator: getValueType })
  v1: string | number | null;

  constructor(v1: string | number | null) {
    this.v1 = v1;
  }
}

function getValueType(ctx: MappingContext, obj: Foo, json: JsonValue): Type | { type: Type, required?: boolean } {
  if (json === null) {
    return null;
  }

  // you can access all PREVIOUS properies of your class here
  switch (typeof json) {
    case 'string':
      return String;
    case 'number':
      return Number;
    default:
      throw new InvalidProperty(`Unknow value ${typeof json}.`, ctx.currentPath());
  }
}
```

### Polymorephism support

Polymorphism work by constructing a base object then invoke `getType` after mapping is completed to get a constructor of the real value, which will
get invoked afterward and map all remaining properties. Then the properties of the base object will be moved to the real value except if it is marked
with `movable: false`:

```ts
import { Constructor, GenericClass, InvalidProperty, JsonClass, JsonProperty, MappingContext, PolymorphismObject } from '@ultimicro/json-mapper';

const enum ValueType {
  Foo = 0,
  Bar = 1
}

@JsonClass()
abstract class Base implements PolymorphismObject {
  constructor(type: ValueType) {
    this.type = type;
  }

  getType(ctx: MappingContext): Constructor | GenericClass {
    switch (this.type) {
      case ValueType.Foo:
        return Foo;
      case ValueType.Bar:
        return Bar;
      default:
        throw new InvalidProperty(`Unknow type ${this.type}.`, ctx.pathFor('type'));
    }
  }

  @JsonProperty({ movable: false }) // we don't need to move this value due to the derived class explicitly assign it via constructor
  private type: ValueType;
}

@JsonClass()
class Foo extends Base {
  @JsonProperty()
  v1: string;

  constructor(v1: string) {
    super(ValueType.Foo);
    this.v1 = v1;
  }
}

@JsonClass()
class Bar extends Base {
  @JsonProperty()
  v1: number;

  constructor(v1: number) {
    super(ValueType.Bar);
    this.v1 = v1;
  }
}
```

### Generic class support

```ts
import { JsonClass, JsonProperty } from '@ultimicro/json-mapper';

@JsonClass()
class Foo<T1, T2> {
  @JsonProperty({ type: 0 })
  v1: T1;

  @JsonProperty({ type: 1, required: false })
  v2: T2 | null;

  constructor(v1: T1, v2: T2 | null) {
    this.v1 = v1;
    this.v2 = v2;
  }
}

@JsonClass()
class Bar {
  @JsonProperty({ args: [String, Number] })
  v1: Foo<string, number>;

  @JsonProperty({ args: [{ type: String, required: false }, Number] })
  v2: Foo<string | null, number>;

  constructor(v1: Foo<string, number>, v2: Foo<string | null, number>) {
    this.v1 = v1;
    this.v2 = v2;
  }
}
```
