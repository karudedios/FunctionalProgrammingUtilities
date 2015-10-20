"use strict";

import { Identity, id } from './../lib/bundle';

let assert = require('assert');

describe("[Identity] Functional Utilities: ", () => {
  it("should have id and Identity be the same", () => {
    assert.strictEqual(Identity, id, "Identity and id should be the exact same");
  });

  it("should return the same provided value if null", () => {
    let v;
    assert.strictEqual(Identity(v), v);
  });

  it("should return the same provided value if not null", () => {
    let v = 5;
    assert.strictEqual(Identity(v), v);
  });
});