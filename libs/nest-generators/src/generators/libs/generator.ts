import { formatFiles, Tree } from '@nrwl/devkit';
import * as path from 'path';
import { LibsGeneratorSchema } from './schema';
import { libraryGenerator } from '@nrwl/nest';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NormalizedSchema extends LibsGeneratorSchema {}

function normalizeOptions(
  tree: Tree,
  options: LibsGeneratorSchema,
): NormalizedSchema {
  options.dataLibName = options.dataLibName || 'data';
  options.featureLibName = options.featureLibName || 'feature';
  options.utilLibName = options.utilLibName || 'util';

  return options;
}

export default async function (tree: Tree, options: LibsGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  const directory = path.join(
    normalizedOptions.directory,
    normalizedOptions.name,
  );

  if (normalizedOptions.createDataLib === true) {
    libraryGenerator(tree, {
      name: normalizedOptions.dataLibName,
      directory: directory,
      strict: normalizedOptions.strict,
      service: true,
    });
  }

  if (normalizedOptions.createFeatureLib === true) {
    libraryGenerator(tree, {
      name: normalizedOptions.featureLibName,
      directory: directory,
      strict: normalizedOptions.strict,
      controller: true,
    });
  }

  if (normalizedOptions.createUtilLib === true) {
    libraryGenerator(tree, {
      name: normalizedOptions.utilLibName,
      directory: directory,
      strict: normalizedOptions.strict,
    });
  }

  await formatFiles(tree);
}
