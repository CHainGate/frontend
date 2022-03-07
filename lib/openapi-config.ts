import { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'https://petstore3.swagger.io/api/v3/openapi.json',
  apiFile: './baseApi.ts',
  apiImport: 'chaingateApi',
  outputFile: '../api/chaingate.generated.ts',
  exportName: 'chaingateApi',
  hooks: true,
}

export default config