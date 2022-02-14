import { assert } from 'chai';
import { toJSON } from './writer';

describe('toJSON', function () {
  it('should return an object of numbers when value is a map of numbers', function () {
    const r = toJSON(new Map([['foo', 123]]), false) as any;

    assert.isObject(r);
    assert.hasAllKeys(r, ['foo']);
    assert.strictEqual(r.foo, 123);
  });
  it('should return an object of arrays when value is a map of arrays', function () {
    const r = toJSON(new Map([['foo', ['bar', 'baz']]]), false) as any;

    assert.isObject(r);
    assert.hasAllKeys(r, ['foo']);
    assert.deepEqual(r.foo, ['bar', 'baz']);
  });
});
