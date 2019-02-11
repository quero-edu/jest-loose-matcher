import '../src';
import { anything, between, approximately, atLeast, atMost, oneOf } from '../src';

describe('ToLooselyEqual', () => {
  it('Works with plain values', () => {
    expect(1).toLooselyEqual(1);
    expect(true).toLooselyEqual(true);
    expect({ foo: 1, bar: { baz: 2 } }).toLooselyEqual({ foo: 1, bar: { baz: 2 } });
    expect([1, [2, [3]]]).toLooselyEqual([1, [2, [3]]]);
  });

  it('Works with comparators', () => {
    expect(1).toLooselyEqual(anything());
    expect(2).toLooselyEqual(between(1, 3));
    expect(3).toLooselyEqual(approximately(2.9, 0.1));
    expect(4).toLooselyEqual(atLeast(3));
    expect(5).toLooselyEqual(atMost(6));
    expect(6).toLooselyEqual(oneOf(1, 2, 3, 4, 5, 6, 7, 8, 9));
  });

  it('Works with deep nested objects', () => {
    expect({
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
          f: {
            g: 4,
            h: {
              i: 5,
              j: {
                k: new Date('2001-02-03T04:05:06.007Z'),
              },
            },
          },
        },
      },
    }).toLooselyEqual({
      a: 1,
      b: {
        c: anything(),
        d: {
          e: 3,
          f: {
            g: between(-Infinity, Infinity),
            h: {
              i: 5,
              j: {
                k: approximately(new Date('2001-02-03T04:05:06.010Z'), 4),
              },
            },
          },
        },
      },
    });
  });

  it('Works with deep nested arrays', () => {
    expect([1, [2, [3, [4, [5]]]]]).toLooselyEqual([anything(), [atLeast(0), [3, [4, [oneOf(4, 5, 6)]]]]]);
  });

  it('Works when an operator is explicitly undefined', () => {
    expect({ foo: undefined }).toLooselyEqual({ foo: oneOf(undefined) });
    expect({ foo: oneOf(undefined) }).toLooselyEqual({ foo: undefined });
  });
});
