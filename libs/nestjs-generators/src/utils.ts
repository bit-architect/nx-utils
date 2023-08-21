import { names } from '@nx/devkit';

export function getProjectName(
  name: string,
  libName: string,
  directory?: string
) {
  let fullProjectDirectory = directory
    ? `${names(directory).fileName}/${name}`
    : name;

  fullProjectDirectory = `${fullProjectDirectory}/${libName}`;

  const projectName = fullProjectDirectory.replace(new RegExp('/', 'g'), '-');
  return projectName;
}
