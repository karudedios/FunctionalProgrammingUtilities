"use strict";

import { identity, id } from './../lib/bundle';

let assert = require('assert');

describe("Identity", () => {
  it("should have id and identity be the same", () => {
    assert.strictEqual(identity, id, "identity and id should be the exact same");
  });

  it("should return the same provided value if null", () => {
    let v;
    assert.strictEqual(id(v), v);
  });

  it("should return the same provided value if not null", () => {
    let v = 5;
    assert.strictEqual(id(v), v);
  });
});