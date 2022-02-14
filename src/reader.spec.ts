import { assert } from 'chai';
import { fromJSON } from './reader';

describe('fromJSON', function () {
  it('should return a map of numbers when value is NumberConstructor', function () {
    const r = fromJSON({ foo: 123 }, Map, String, Number);

    assert.instanceOf(r, Map);
    assert.hasAllKeys(r, ['foo']);
    assert.strictEqual(r.get('foo'), 123);
  });
  it('should return a map of arrays when value is ArrayConstructor', function () {
    const r = fromJSON({ foo: ['bar', 'baz'] }, Map, String, Array, String);

    assert.instanceOf(r, Map);
    assert.hasAllKeys(r, ['foo']);
    assert.deepEqual(r.get('foo'), ['bar', 'baz']);
  });
});
