"use strict";

import { compose, id } from './bundle';

export default {
  pipe(value, ...funcs) {
    return compose(...funcs, id)(value);
  }
};