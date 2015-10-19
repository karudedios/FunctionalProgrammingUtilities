[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/karudedios/FunctionalProgrammingUtilities/master/LICENSE)
[![devDependency Status](https://david-dm.org/karudedios/FunctionalProgrammingUtilities/dev-status.svg)](https://david-dm.org/karudedios/FunctionalProgrammingUtilities#info=devDependencies)

# Functional Programming Utilities

**Travis CI Status:**

| Master | Develop |
| -------|-------- |
| [![Build Status](https://travis-ci.org/karudedios/FunctionalProgrammingUtilities.svg?branch=master)](https://travis-ci.org/karudedios/FunctionalProgrammingUtilities) | [![Build Status](https://travis-ci.org/karudedios/FunctionalProgrammingUtilities.svg?branch=develop)](https://travis-ci.org/karudedios/FunctionalProgrammingUtilities) |

## Description
This repository is a holder of various utilities that could come in handy if you're introduced to the Functional Programming world in Javascript.


## Utilities

### Given
Replacement for `switch/case` and `if/else if/else`

```javascript
/* Regular Approach */

let value = getRandomValue();
let res = 0;

switch(value) {
  case  5:
    res = value * 20;
    break;
  case 10:
    res = value * 10;
    break;
  case 20:
    res = value *  5;
    break;
  default:
    res = value;
    break;
}

let response = res;

if (response % 20 === 0) {
  response -= 20;
} 
if (response % 10 === 0) {
  response -= 10;
} else {
  response -= 5;
}

response -= 25;

return response;

/* Given Approach */

import { given } from "...";

let value = getRandomValue();

let makeHigherOrder = (f) => (b) => (a) => f(a, b);
let equalTo = makeHigherOrder((a, b) => a === b);
let subtract = makeHigherOrder((a, b) => a - b);

let multiplyBy = makeHigherOrder((a, b) => a * b);
let divisibleBy = makeHigherOrder((a, b) => a % b === 0);

return (
  given(value)
    .when(equalTo(5))
      .then(multiplyBy(20))
    .when(equalTo(10))
      .then(multiplyBy(10))
    .when(equalTo(20))
      .then(multiplyBy(5))
    .when(divisibleBy(20))
      .then(subtract(20))
    .when(divisibleBy(10))
      .then(subtract(10))
      .otherwise(subtract(5))
    .apply(subtract(25))
    .out());

```

As you can see this approach allows for a far more clear and sentence like composition.

### Validator
Wrapper whose only purpose is to check whether a value is `valid` or `invalid` according to the constraints that said item is evaluated with, it can as well replace `if/else`.

```javascript
/* Regular Approach */

let v = getRandomValue();
let r = 0;

if (v % 20 === 0) {
  r = v;
} else {
  r = v % 20;
}

return r;

/* Validator Approach */
import { Validator } from '...';

return Validator
  .from(getRandomValue())
  .where(v => v % 20 === 0)
  .match({
    valid: v => v,
    invalid: v => v % 20
  });

```