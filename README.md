# access-by-path

[![NPM version](http://img.shields.io/npm/v/access-by-path.svg?style=flat)](https://www.npmjs.org/package/access-by-path)
[![Build Status](https://img.shields.io/travis/paulzi/access-by-path/master.svg)](https://travis-ci.org/paulzi/access-by-path)
[![Downloads](https://img.shields.io/npm/dt/access-by-path.svg)](https://www.npmjs.org/package/access-by-path)
![License](https://img.shields.io/npm/l/access-by-path.svg)

Functions of getting and setting the values of the object fields by the string representation of the path to them.

[Russian readme](https://github.com/paulzi/access-by-path/blob/master/README.ru.md)

## Install

```sh
npm install access-by-path
```

## Usage

### getByPath

```javascript
import { getByPath } from 'access-by-path';

let obj = { a: 1, b: { c: 2, d: 3}};
let result = getByPath(obj, 'b.d'); // 3
```

`getByPath(obj, path[, defaultValue[, splitChar[, escapeChar]]])`

- `obj {Object}` - object
- `path {string}` - path to field
- `defaultValue {*} [undefined]` - return value if the field is not found in object
- `splitChar {string} ['.']` - path delimiter character
- `escapeChar {string} ['\\']` - character to escape delimiter

### setByPath

```javascript
import { setByPath } from 'access-by-path';

let obj = { a: 1, b: { c: 2, d: 3}};
setByPath(obj, 'b.d', 4); // { a: 1, b: { c: 2, d: 4}}
```

`setByPath(obj, path, value[, splitChar[, escapeChar]])`

- `obj {Object}` - object
- `path {string}` - path to field
- `value {*}` - set value
- `splitChar {string} ['.']` - path delimiter character
- `escapeChar {string} ['\\']` - character to escape delimiter

## Testing

To run tests, use:

```sh
npm test
```
