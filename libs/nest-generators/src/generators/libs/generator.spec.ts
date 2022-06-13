import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree } from '@nrwl/devkit';

import generator from './generator';
import { LibsGeneratorSchema } from './schema';

describe('libs generator', () => {
  let appTree: Tree;
  const options: LibsGeneratorSchema = {
    name: 'test',

    createDataLib: true,
    createFeatureLib: true,
    createUtilLib: true,

    directory: 'foobar',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await expect(generator(appTree, options)).resolves.not.toThrowError();
  });
});
