import { assert } from 'chai';
import { toJSON } from './writer';

describe('toJSON', function () {
  it('should return an object when value is a map', function () {
    const r = toJSON(new Map([['foo', 123]]), false) as any;

    assert.isObject(r);
    assert.hasAllKeys(r, ['foo']);
    assert.strictEqual(r.foo, 123);
  });
});
