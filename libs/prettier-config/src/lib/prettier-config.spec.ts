import { prettierConfig } from './prettier-config';

describe('prettierConfig', () => {
  it('should work', () => {
    expect(prettierConfig()).toEqual('prettier-config');
  });
});
