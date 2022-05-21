import * as React from 'react';
import { Button } from '@mui/material';
import { useGenerateApiKeyMutation } from '../api/chaingate.api';
import { GenerateApiKeyApiArg } from '../api/chaingate.generated';

export default function AddApiKeyForm({keyType, buttonText} : {keyType: "secret" | "public", buttonText: string}) {
  const [generateApiKey, { isLoading, error }] = useGenerateApiKeyMutation()
  const createApiKey = () => {
    const arg: GenerateApiKeyApiArg = {
      apiKeyRequestDto: {
        mode: "test"
      }
    }
    generateApiKey(arg)
  }
  return (
    <>
      <Button color="primary" variant="contained" onClick={createApiKey} fullWidth>
        {buttonText}
      </Button>
    </>
  )
}