# Jest Loose Matcher

[![Build Status](https://travis-ci.org/quero-edu/jest-loose-matcher.svg?branch=master)](https://travis-ci.org/quero-edu/jest-loose-matcher)

Loosely matches any value

## Install

`npm install --save-dev jest-loose-matcher`

## How to use

Import any comparator from `jest-loose-matcher` and use it in combination with `toLooselyEqual` method:

```js
const { anything, between, approximately } = require('jest-loose-matcher');

it('Works with plain values', () => {
  expect(1).toLooselyEqual(anything());
  expect(0.12).toLooselyEqual(between(0, 1));
  expect(4.15).toLooselyEqual(approximately(4, 0.2));
});
```

You can also match deep nested objects and arrays:

```js
const { oneOf, atLeast, atMost } = require('jest-loose-matcher');

it('Works with nested objects or arrays', () => {
  expect({
    foo: 3,
    bar: 15,
    baz: {
      qux: 82,
    },
    spam: false,
  }).toLooselyEqual({
    foo: oneOf(1, 3, 5, 7, 9),
    bar: atLeast(10),
    baz: {
      qux: atMost(100)
    },
    spam: false,
  });
});
```

### Default comparators

List of default comparators:

1. `anything`. Eg.: `anything()`.
1. `approximately`. Eg.: `approximately(new Date('2014-03-11T16:41:32.217Z'), 3 * 60 * 60 * 1000)`.
1. `atLeast`. Eg.: `atLeast(50)`.
1. `atMost` `atMost(100)`.
1. `between`. Eg.: `between(0, 1)`.
1. `oneOf`. Eg.: `oneOf('a', 'b', 'c')`

### Custom comparators

A comparator is any object that has the method `compare` which receives a value as the first parameter and returns an object with the keys `pass` (boolean) and `message` (function that returns a message). Eg.:

```js
const isEven = {
  compare(value) {
    if (value % 2 === 0) {
      return { pass: true, message: () => '' };
    }
    return { pass: false, message: () => `${value} is not even` };
  },
};
```

If you want to provide arguments to your comparator, just turn it into a function that returns an object with the method `compare`:

```js
function matches(regex) {
  return {
    compare(value) {
      if (typeof value !== 'string') {
        return { pass: false, message: () => `could not match ${value} since it is not a string` };  
      } else if (!regex.test(value)) {
        return { pass: false, message: () => `${value} does not match ${regex}` };
      }

      return { pass: true, message: () => '' };
    },
  };
}
```

Then you can use it in your loose matchers:

```js
const { isEven, matches } = require('./custom-comparators');

it('Works with custom comparators', () => {
  expect({
    foo: 14,
    bar: ['http://site.com/abc']
  }).toLooselyEqual({
    foo: isEven,
    bar: [matches(/http:\/\/site\.com\/\w+/)],
  });
});
```
