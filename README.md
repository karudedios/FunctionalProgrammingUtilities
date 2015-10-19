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

return (
  given(value)
    .when(v => v ===  5)
      .then(v => v * 20)
    .when(v => v === 10)
      .then(v => v * 10)
    .when(v => v === 20)
      .then(v => v *  5)
    .when(v => v % 20 === 0)
      .then(v => v - 20)
    .when(v => v % 10 === 0)
      .then(v => v - 10)
      .otherwise(v => v - 5)
    .apply(v => v - 25)
    .out());

```

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