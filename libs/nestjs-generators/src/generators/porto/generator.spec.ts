import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { portoGenerator } from './generator';
import { PortoGeneratorSchema } from './schema';

describe('libs generator', () => {
  let tree: Tree;
  const options: PortoGeneratorSchema = {
    name: 'test',
    directory: 'api',

    createDataLib: true,
    createFeatureLib: true,
    createUtilLib: true,
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should generate all libs', async () => {
    await portoGenerator(tree, options);

    const configData = readProjectConfiguration(tree, 'api-test-data');
    const configFeature = readProjectConfiguration(tree, 'api-test-feature');
    const configUtil = readProjectConfiguration(tree, 'api-test-util');

    expect(configData).toBeDefined();
    expect(configFeature).toBeDefined();
    expect(configUtil).toBeDefined();
  });
});
