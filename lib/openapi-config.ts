import { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'https://api.swaggerhub.com/apis/a-lesi/open-api_config_service/1.0.0',
  apiFile: './baseApi.ts',
  apiImport: 'chaingateApi',
  outputFile: '../api/chaingate.generated.ts',
  exportName: 'chaingateApi',
  hooks: true,
}

export default config