import { formatFiles, Tree } from '@nx/devkit';
import * as path from 'path';
import { RestGeneratorSchema } from './schema';
import {
  controllerGenerator,
  libraryGenerator,
  serviceGenerator,
} from '@nx/nest';
import { getProjectName } from '../../utils';

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
    const projectName = getProjectName(
      options.name,
      options.dataLibName,
      options.directory
    );

    await libraryGenerator(tree, {
      name: options.dataLibName,
      directory: directory,
      simpleName: options.simpleName,
      strict: options.strict,
      standaloneConfig: true,
    });

    await serviceGenerator(tree, {
      name: `${options.name}-${options.featureLibName}`,
      project: projectName,
      flat: true,
      directory: path.join('lib', 'services'),
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

    await controllerGenerator(tree, {
      name: `${options.name}-${options.featureLibName}`,
      project: projectName,
      flat: true,
      directory: path.join('lib', 'controllers'),
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
