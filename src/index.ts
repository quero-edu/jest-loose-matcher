import anything from './comparators/anything';
import approximately from './comparators/approximately';
import atLeast from './comparators/at-least';
import atMost from './comparators/at-most';
import between from './comparators/between';
import oneOf from './comparators/one-of';
import { milliseconds, seconds, minutes, hours, days } from './time-interval';
import './matcher';

export {
  anything,
  approximately,
  atLeast,
  atMost,
  between,
  oneOf,
};

export default {
  helpers: {
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
  },
};
