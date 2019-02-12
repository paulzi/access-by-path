import { getByPath, setByPath } from '../src';

const chai   = require('chai');
const assert = chai.assert;

describe("getByPath() tests", function() {
    it('simple get', function() {
        assert.strictEqual(getByPath({a: 'a', b: {c: 'd'}}, 'a'), 'a');
        assert.strictEqual(getByPath({'1': '2', '3': {'4': '5'}}, '3.4'), '5');
        assert.isUndefined(getByPath({a: 1, b: {c: 2, d: 3}}, 'c'));
        assert.isUndefined(getByPath({a: 1, b: {c: 2, d: 3}}, 'b.e'));
    });

    it('get by array', function() {
        assert.strictEqual(getByPath({a: 'a', b: {c: 'd'}}, ['a']), 'a');
        assert.strictEqual(getByPath({'1': '2', '3': {'4': '5'}}, ['3', '4']), '5');
        assert.isUndefined(getByPath({a: 1, b: {c: 2, d: 3}}, ['c']));
        assert.isUndefined(getByPath({a: 1, b: {c: 2, d: 3}}, ['b', 'e']));
        assert.strictEqual(getByPath({'a.b': 1, 'c.d.': {'\\e.f\\': 2, '': 3}}, ['c.d.', '\\e.f\\']), 2);
        assert.strictEqual(getByPath({'a.b': 1, 'c.d.': {'\\e.f\\': 2, '': 3}}, ['c.d.', '']), 3);
    });

    it('empty, dot, escape key', function() {
        assert.strictEqual(getByPath({a: 1, '': {'.': 2, d: 3}}, '.\\.'), 2);
        assert.strictEqual(getByPath({a: 'a', 'b.c': {'d-e': 'b', ':g': 'c'}}, 'b\\.c.:g'), 'c');
        assert.strictEqual(getByPath({a: {'b\\.e\\': 'x'}, b: 'y'}, 'a.b\\\\\\.e\\'), 'x');
    });

    it('array', function() {
        assert.strictEqual(getByPath({a: [1, 'b', {'c': 'd'}]}, 'a.2.c'), 'd');
        assert.strictEqual(getByPath([1, ['b'], {'c': 'd'}], '1.0'), 'b');
    });

    it('some return value', function() {
        let data = {a: false, b: {c: true, d: null, e: undefined}, f: NaN, g: Number.NEGATIVE_INFINITY, h: {}, i: []};
        assert.strictEqual(getByPath(data, 'a'), false);
        assert.deepEqual(getByPath(data, 'b'), {c: true, d: null, e: undefined});
        assert.strictEqual(getByPath(data, 'b.c'), true);
        assert.isNull(getByPath(data, 'b.d'));
        assert.isUndefined(getByPath(data, 'b.e'));
        assert.isNaN(getByPath(data, 'f'));
        assert.strictEqual(getByPath(data, 'g'), Number.NEGATIVE_INFINITY);
        assert.deepEqual(getByPath(data, 'h'), {});
        assert.deepEqual(getByPath(data, 'i'), []);
    });

    it('defaultValue', function() {
        let data = {a: false, b: {c: true, d: null, e: undefined}, f: NaN, g: Number.NEGATIVE_INFINITY, h: {}, i: [[]]};
        assert.strictEqual(getByPath(data, 'z', 'z'), 'z');
        assert.strictEqual(getByPath(data, 'b.z', 'bz'), 'bz');
        assert.strictEqual(getByPath(data, 'a', 'a'), false);
        assert.strictEqual(getByPath(data, 'b.c', 'a'), true);
        assert.isNull(getByPath(data, 'b.d', 'a'));
        assert.strictEqual(getByPath(data, 'b.e', 'a'), 'a');
        assert.isNaN(getByPath(data, 'f', 'a'));
        assert.strictEqual(getByPath(data, 'g', 'a'), Number.NEGATIVE_INFINITY);
        assert.deepEqual(getByPath(data, 'h'), {});
        assert.deepEqual(getByPath(data, 'i'), [[]]);
        assert.deepEqual(getByPath(data, 'i.0'), []);
    });

    it('splitChar', function() {
        assert.strictEqual(getByPath({a: 1, b: {c: 2, d: [{e: 3}, {f: 4}]}}, 'b/d/1/f', undefined, '/'), 4);
        assert.strictEqual(getByPath({'a.b': {'c.d': 'e.f'}}, "a.b\nc.d", undefined, "\n"), 'e.f');
    });

    it('escapeChar', function() {
        assert.strictEqual(getByPath({'a.b': {'c.d': 'e.f'}}, 'a\\.b.c\\.d'), 'e.f');
        assert.strictEqual(getByPath({'@a.b.': {'.c.d@': '@e.f.'}}, '@@a@.b@..@.c@.d@@', undefined, '.', '@'), '@e.f.');
        assert.strictEqual(getByPath({"a.b\t": {"\tc.d\t": 'e.f'}}, "a\t.b\t\t.\tc\t.d\t", undefined, '.', "\t"), 'e.f');
    });
});


describe("setByPath() tests", function() {
    it('simple set', function() {
        let data = {a: 1, b: {c: 2}};
        setByPath(data, 'a', 3);
        assert.strictEqual(data.a, 3);
        setByPath(data, 'b.c', 4);
        assert.strictEqual(data.b.c, 4);
        setByPath(data, 'c', 5);
        assert.strictEqual(data.c, 5);
        setByPath(data, 'd.e.f', 6);
        assert.strictEqual(data.d.e.f, 6);
    });

    it('set by array', function() {
        let data = {a: 1, b: {c: 2}};
        setByPath(data, ['a'], 3);
        assert.strictEqual(data.a, 3);
        setByPath(data, ['b', 'c'], 4);
        assert.strictEqual(data.b.c, 4);
        setByPath(data, ['c'], 5);
        assert.strictEqual(data.c, 5);
        setByPath(data, ['d', 'e', 'f'], 6);
        assert.strictEqual(data.d.e.f, 6);
        setByPath(data, ['e.f.', '.g', '', '\\e\\'], 7);
        assert.strictEqual(data['e.f.']['.g']['']['\\e\\'], 7);
    });

    it('empty, dot, escape key', function() {
        let data = {a: 1, b: {c: 2}, '': {'.': 3}};
        setByPath(data, '.\\.', 4);
        assert.strictEqual(data['']['.'], 4);
        setByPath(data, 'b\\.d.:g', 5);
        assert.strictEqual(data['b.d'][':g'], 5);
    });

    it('array', function() {
        let data = {a: [1, 'b', {c: 'd', e: []}]};
        setByPath(data, 'a.2.c', 'e');
        assert.strictEqual(data.a[2].c, 'e');
        setByPath(data, 'a.2.3', '3');
        assert.strictEqual(data.a[2]['3'], '3');
        setByPath(data, 'b.0', [1, 2, 3]);
        assert.deepEqual(data.b, {'0': [1, 2, 3]});
        setByPath(data, 'a.4', true);
        assert.strictEqual(data.a[4], true);
        setByPath(data, 'a.2.e.1', true);
        assert.deepEqual(data.a[2].e, [undefined, true]);
        setByPath(data, 'a.x', true);
        assert.strictEqual(data.a.x, true);
    });

    it('some set value', function() {
        let data = {};
        setByPath(data, 'a', false);
        assert.strictEqual(data.a, false);
        setByPath(data, 'b', {c: 0});
        assert.deepEqual(data.b, {c: 0});
        setByPath(data, 'b.d', 0);
        assert.strictEqual(data.b.d, 0);
        setByPath(data, 'c.d', null);
        assert.isNull(data.c.d);
        setByPath(data, 'd', undefined);
        assert.isUndefined(data.d);
        setByPath(data, 'e', NaN);
        assert.isNaN(data.e);
        setByPath(data, 'f', Number.NEGATIVE_INFINITY);
        assert.strictEqual(data.f, Number.NEGATIVE_INFINITY);
        setByPath(data, 'g', {});
        assert.deepEqual(data.g, {});
        setByPath(data, 'h', []);
        assert.deepEqual(data.h, []);
    });

    it('splitChar', function() {
        let data = {a: 1, b: {c: 2, d: [{e: 3}, {f: 4}]}};
        setByPath(data, 'b/d/1/f', 5, '/');
        assert.strictEqual(data.b.d[1].f, 5);
        setByPath(data, "a.b\nc.d", 'e.f', "\n");
        assert.strictEqual(data['a.b']['c.d'], 'e.f');
    });

    it('escapeChar', function() {
        let data = {'a.b': {'c.d': 'e.f'}};
        setByPath(data, 'a\\.b.c\\.d', 'f.e');
        assert.strictEqual(data['a.b']['c.d'], 'f.e');
        setByPath(data, '@@a@.b@..@.c@.d@@', '@e.f.', '.', '@');
        assert.strictEqual(data['@a.b.']['.c.d@'], '@e.f.');
        setByPath(data, "a\t.b\t\t.\tc\t.d\t", 'xyz', '.', "\t");
        assert.strictEqual(data["a.b\t"]["\tc.d\t"], 'xyz');
    });
});