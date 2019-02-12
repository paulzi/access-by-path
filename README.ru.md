# access-by-path

[![NPM version](http://img.shields.io/npm/v/access-by-path.svg?style=flat)](https://www.npmjs.org/package/access-by-path)
[![Build Status](https://img.shields.io/travis/paulzi/access-by-path/master.svg)](https://travis-ci.org/paulzi/access-by-path)
[![Downloads](https://img.shields.io/npm/dt/access-by-path.svg)](https://www.npmjs.org/package/access-by-path)
![License](https://img.shields.io/npm/l/access-by-path.svg)

Функции получения и задания значения элементам объекта по строковому представлению пути до них.

[English readme](https://github.com/paulzi/access-by-path/)

## Установка

```sh
npm install access-by-path
```

## Использование

### getByPath

```javascript
import { getByPath } from 'access-by-path';

let obj = { a: 1, b: { c: 2, d: 3}};
let result = getByPath(obj, 'b.d'); // 3
```

`getByPath(obj, path[, defaultValue[, splitChar[, escapeChar]]])`

- `obj {Object}` - объект
- `path {string}` - путь до поля
- `defaultValue {*} [undefined]` - возвращаемое значение если поле не найдено
- `splitChar {string} ['.']` - символ-разделитель компонентов пути  
- `escapeChar {string} ['\\']` - символ для экранирования разделителя  

### setByPath

```javascript
import { setByPath } from 'access-by-path';

let obj = { a: 1, b: { c: 2, d: 3}};
setByPath(obj, 'b.d', 4); // { a: 1, b: { c: 2, d: 4}}
```

`setByPath(obj, path, value[, splitChar[, escapeChar]])`

- `obj {Object}` - объект
- `path {string}` - путь до поля
- `value {*}` - задаваемое значение
- `splitChar {string} ['.']` - символ-разделитель компонентов пути  
- `escapeChar {string} ['\\']` - символ для экранирования разделителя  



## Тестирование

Для запуска тестов используйте:

```sh
npm test
```
