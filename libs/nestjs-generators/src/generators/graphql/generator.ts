import { formatFiles, names, Tree } from '@nx/devkit';
import * as path from 'path';
import { GraphqlGeneratorSchema } from './schema';
import { libraryGenerator, resolverGenerator } from '@nx/nest';

interface NormalizedOptions {
  name: string;
  directory?: string;

  createDataLib: boolean;
  createFeatureLib: boolean;
  createUtilLib: boolean;

  dataLibName?: string;
  featureLibName?: string;
  utilLibName?: string;

  simpleName?: boolean;
  strict?: boolean;

  projectName: string;
}

function normalizeOptions(
  tree: Tree,
  options: GraphqlGeneratorSchema
): NormalizedOptions {
  options.dataLibName = options.dataLibName || 'data';
  options.featureLibName = options.featureLibName || 'feature';
  options.utilLibName = options.utilLibName || 'util';

  const fullProjectDirectory = options.directory
    ? `${names(options.directory).fileName}/${options.name}`
    : options.name;

  const projectName = fullProjectDirectory.replace(new RegExp('/', 'g'), '-');

  return { ...options, projectName };
}

export async function graphqlGenerator(
  tree: Tree,
  options: GraphqlGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, options);

  let directory = path.join(normalizedOptions.name);
  if (normalizedOptions.directory) {
    directory = path.join(normalizedOptions.directory, normalizedOptions.name);
  }

  if (normalizedOptions.createDataLib) {
    await libraryGenerator(tree, {
      name: normalizedOptions.dataLibName,
      directory: directory,
      simpleName: normalizedOptions.simpleName,
      strict: normalizedOptions.strict,
      service: true,
      standaloneConfig: true,
    });
  }

  if (normalizedOptions.createFeatureLib) {
    await libraryGenerator(tree, {
      name: normalizedOptions.featureLibName,
      directory: directory,
      simpleName: normalizedOptions.simpleName,
      strict: normalizedOptions.strict,
      standaloneConfig: true,
    });

    await resolverGenerator(tree, {
      name: `${normalizedOptions.name}-${normalizedOptions.featureLibName}`,
      project: `${normalizedOptions.projectName}-${normalizedOptions.featureLibName}`,
      flat: true,
      directory: 'lib',
    });
  }

  if (normalizedOptions.createUtilLib) {
    await libraryGenerator(tree, {
      name: normalizedOptions.utilLibName,
      directory: directory,
      simpleName: normalizedOptions.simpleName,
      strict: normalizedOptions.strict,
      standaloneConfig: true,
    });
  }

  await formatFiles(tree);
}

export default graphqlGenerator;
