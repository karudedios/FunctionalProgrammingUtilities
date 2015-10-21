"use strict";

import { compose } from './../lib/bundle';

let assert = require('assert');

describe("Compose", () => {
  it("should throw when non-function/s received", () => {
    let f0 = (a) => 2 * a;
    let f1 = compose.bind(null, f0, 0, 0);

    assert.throws(f1, "Functions only allowed");
  });

  it("should throw when called with no functions", () => {
    assert.throws(compose, "Must specify functions to compose");
  });

  it("should allow for 2 functions to be composed", () => {
    let f0 = (a) => 2 * a * a;
    let f1 = (a) => a / a;
    let composition = compose(f1, f0);

    assert.strictEqual(composition(5), 2, "Looks like the functions were not composed correctly.");
  });

  it("should allow for +2 functions to be composed", () => {
    let f0 = a => a * 2;
    let f1 = a => a / 4;
    let f2 = a => Math.pow(a, 3);
    let f3 = a => Math.sqrt(a);
    let composition = compose(f0, f1, f2, f3);

    assert.strictEqual(composition(5), Math.sqrt(Math.pow((5 * 2) / 4, 3)), "composition did not work LTR"); 
  });
});