[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/karudedios/FunctionalProgrammingUtilities/master/LICENSE)
[![devDependency Status](https://david-dm.org/karudedios/FunctionalProgrammingUtilities/dev-status.svg)](https://david-dm.org/karudedios/FunctionalProgrammingUtilities#info=devDependencies)

# Functional Programming Utilities

**Travis CI Status:**

| **Master** | [![Build Status](https://travis-ci.org/karudedios/FunctionalProgrammingUtilities.svg?branch=master)](https://travis-ci.org/karudedios/FunctionalProgrammingUtilities) |
| -------|-------- |
| **Develop**| [![Build Status](https://travis-ci.org/karudedios/FunctionalProgrammingUtilities.svg?branch=develop)](https://travis-ci.org/karudedios/FunctionalProgrammingUtilities) |

**Code Coverage Status:**

| **Master** | [![Coverage Status](https://coveralls.io/repos/karudedios/FunctionalProgrammingUtilities/badge.svg?branch=master&service=github)](https://coveralls.io/github/karudedios/FunctionalProgrammingUtilities?branch=master) |
| -------|-------- |
| **Develop**| [![Coverage Status](https://coveralls.io/repos/karudedios/FunctionalProgrammingUtilities/badge.svg?branch=develop&service=github)](https://coveralls.io/github/karudedios/FunctionalProgrammingUtilities?branch=develop) |

## Description
This repository is a holder of various utilities that could come in handy if you're introduced to the Functional Programming world in Javascript.


## Utilities

### Identity
Function whose only purpose is to return the same provided value.

```javascript
/* Regular Approach*/

let v = getRandomValue();
let oddAction = (n) => n * 2;

return v % 2 == 0 ? v : oddAction(v);

/* Identity Approach */

import { Identity } from "functional-programming-utilities";

let v = getRandomValue();
let oddAction = (n) => n * 2;

return (v % 2 === 0 ? Identity : oddAction)(v);
```

This isn't the best example, but there's probaby no *best* example, since Identity simply returns whatever you throw at him.

### Pipe
Takes care of passing a value through multiple functions in a left-associative manner.

```javascript
/* Regular Approach */

let addTwo = (v) => v + 2;
let timesTen = (v) => v * 10;
let minusThree = (v) => v - 3;

let r1 = addTwo(5);
let r2 = timesTen(r1);
let r3 = MinusThree(r2);

return r3;

/* Pipe Approach */

import { pipe } from "functional-programming-utilities";

let addTwo = (v) => v + 2;
let timesTen = (v) => v * 10;
let minusThree = (v) => v - 3;

return pipe(5, addTwo, timesTen, minusThree);
```

### Compose
Joins n functions in a left-associative manner to be called one after another when invoked.

```javascript
/* Regular Approach */

let addTwo = (v) => v + 2;
let timesTen = (v) => v * 10;
let minusThree = (v) => v - 3;

return minusThree(timesTen(addTwo(5)));

/* Compose Approach */

import { compose } from "functional-programming-utilities";

let addTwo = (v) => v + 2;
let timesTen = (v) => v * 10;
let minusThree = (v) => v - 3;

return compose(addTwo, timesTen, minusThree)(5);
```

### Curry
Takes a function that receives n parameters and yields a function that will wait until n parameters are provided before invoking the original function.

```javascript
/* Regular Approach */

let divide = (a, b) => a / b;
// divide(10) => undefined; divide(10, 2) => 5

let divideBy = (b) => (a) => a / b;
// divideBy(10) => Function; divideBy(2)(10) => 5

let halve = divideBy(2);
return halve(10);

/* Curry Approach */

let divide = curry((b, a) => a / b);
// divide(10) => Function; divide(2, 10) => 5; divide(2)(10) => 5

let halve = divide(2);

return halve(10);
```

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

import { given } from "functional-programming-utilities";

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
import { Validator, id } from 'functional-programming-utilities';

return Validator
  .from(getRandomValue())
  .where(v => v % 20 === 0)
  .match({
    valid: id,
    invalid: v => v % 20
  });

```