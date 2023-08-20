import { formatFiles, Tree } from '@nx/devkit';
import * as path from 'path';
import { RestGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/nest';

function normalizeOptions(
  tree: Tree,
  options: RestGeneratorSchema
): RestGeneratorSchema {
  options.dataLibName = options.dataLibName || 'data';
  options.featureLibName = options.featureLibName || 'feature';
  options.utilLibName = options.utilLibName || 'util';

  return options;
}

export async function restGenerator(tree: Tree, options: RestGeneratorSchema) {
  options = normalizeOptions(tree, options);

  let directory = path.join(options.name);
  if (options.directory) {
    directory = path.join(options.directory, options.name);
  }

  if (options.createDataLib) {
    await libraryGenerator(tree, {
      name: options.dataLibName,
      directory: directory,
      simpleName: options.simpleName,
      strict: options.strict,
      service: true,
      standaloneConfig: true,
    });
  }

  if (options.createFeatureLib) {
    await libraryGenerator(tree, {
      name: options.featureLibName,
      directory: directory,
      simpleName: options.simpleName,
      strict: options.strict,
      controller: true,
      standaloneConfig: true,
    });
  }

  if (options.createUtilLib) {
    await libraryGenerator(tree, {
      name: options.utilLibName,
      directory: directory,
      simpleName: options.simpleName,
      strict: options.strict,
      standaloneConfig: true,
    });
  }

  await formatFiles(tree);
}

export default restGenerator;
