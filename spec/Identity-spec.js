"use strict";

import { Identity } from './../lib/bundle';

let assert = require('assert');

describe("[Identity] Functional Utilities: ", () => {
  it("should return the same provided value if null", () => {
    let v;
    assert.strictEqual(Identity(v), v);
  });

  it("should return the same provided value if not null", () => {
    let v = 5;
    assert.strictEqual(Identity(v), v);
  });
});