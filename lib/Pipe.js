"use strict";

export default {
  pipe(value, ...funcs) {
    return funcs.reduce((v, func) => func(v), value);
  }
};