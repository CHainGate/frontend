import { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'https://raw.githubusercontent.com/CHainGate/backend/main/swaggerui/config/openapi.yaml',
  apiFile: './baseApi.ts',
  apiImport: 'chaingateApi',
  outputFile: '../api/chaingate.generated.ts',
  exportName: 'chaingateApi',
  hooks: true,
}

export default config