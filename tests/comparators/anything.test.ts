import { anything } from '../../src';

describe('Comparators/Anything', () => {
  it('Comparison always returns true', () => {
    const result = anything().compare();

    expect(result.pass).toEqual(true );
    expect(result.message()).toEqual('');
  });
});
