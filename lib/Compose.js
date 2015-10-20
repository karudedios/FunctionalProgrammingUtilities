"use strict";

export default {
  compose(...funcs) {
    if (!funcs.length) throw "Must specify functions to compose";
    if (funcs.some((x) => !(x instanceof Function))) throw "Functions only allowed";

    return funcs.reduce((composed, toCompose) => ((...args) => toCompose(composed(...args))), funcs.shift());
  }
};