export interface GraphqlGeneratorSchema {
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
}
