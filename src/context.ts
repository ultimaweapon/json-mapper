import { MappingContext } from './types';

export class Context implements MappingContext {
  constructor() {
    this.parts = [];
  }

  currentPath(): string {
    return getPath(this.parts);
  }

  pathFor(name: string | number, strip?: number): string {
    let parts;

    if (strip !== undefined) {
      if (strip < 0 || strip > this.parts.length) {
        throw new RangeError('The number of part to strip is not valid.');
      }

      parts = this.parts.slice(0, this.parts.length - strip);
    } else {
      parts = this.parts;
    }

    return getPath([...parts, name]);
  }

  parentPath(): string {
    return this.parts.length ? getPath(this.parts.slice(0, this.parts.length - 1)) : '';
  }

  push(part: string | number): void {
    this.parts.push(part);
  }

  pop(): void {
    this.parts.pop();
  }

  private readonly parts: Array<string | number>;
}

function getPath(parts: Array<string | number>): string {
  let r = '';

  for (const p of parts) {
    if (typeof p === 'number') {
      r += `[${p}]`;
    } else if (r) {
      r += `.${p}`;
    } else {
      r = p;
    }
  }

  return r;
}
