import { formatFiles, names, Tree } from '@nx/devkit';
import * as path from 'path';
import { GraphqlGeneratorSchema } from './schema';
import { libraryGenerator, resolverGenerator } from '@nx/nest';
import { getProjectName } from '../../utils';

function normalizeOptions(
  tree: Tree,
  options: GraphqlGeneratorSchema
): GraphqlGeneratorSchema {
  options.dataLibName = options.dataLibName || 'data';
  options.featureLibName = options.featureLibName || 'feature';
  options.utilLibName = options.utilLibName || 'util';

  return { ...options };
}

export async function graphqlGenerator(
  tree: Tree,
  options: GraphqlGeneratorSchema
) {
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
    const projectName = getProjectName(
      options.name,
      options.featureLibName,
      options.directory
    );

    await libraryGenerator(tree, {
      name: options.featureLibName,
      directory: directory,
      simpleName: options.simpleName,
      strict: options.strict,
      standaloneConfig: true,
    });

    await resolverGenerator(tree, {
      name: `${options.name}-${options.featureLibName}`,
      project: projectName,
      flat: true,
      directory: 'lib',
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

export default graphqlGenerator;
