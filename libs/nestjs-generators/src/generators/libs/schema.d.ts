export interface LibsGeneratorSchema {
  name: string;
  directory?: string;

  createDataLib: boolean;
  createFeatureLib: boolean;
  createUtilLib: boolean;

  dataLibName?: string;
  featureLibName?: string;
  utilLibName?: string;

  strict?: boolean;
}
