import * as React from 'react';
import { Button } from '@mui/material';
import { useGenerateApiKeyMutation } from '../api/chaingate.api';
import { GenerateApiKeyApiArg } from '../api/chaingate.generated';
import { useAppSelector } from '../lib/hooks';

export default function AddApiKeyForm({keyType, buttonText} : {keyType: "secret" | "public", buttonText: string}) {
  const mode = useAppSelector((state) => state.internal.mode.mode);
  const [generateApiKey, { isLoading, error }] = useGenerateApiKeyMutation()
  const createApiKey = () => {
    const arg: GenerateApiKeyApiArg = {
      apiKeyRequestDto: {
        mode
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