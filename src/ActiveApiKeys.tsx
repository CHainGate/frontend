import { useDeleteApiKeyMutation, useGetApiKeyQuery } from '../api/chaingate.api';
import { ApiKeyResponseDto, DeleteApiKeyApiArg } from '../api/chaingate.generated';
import * as React from 'react';
import { Button, CircularProgress } from '@mui/material';

export default function ActiveApiKeys({keyType} : {keyType: "secret" | "public" }) {
  const { data, isLoading, isError } = useGetApiKeyQuery({mode: 'test'});
  const [ deleteApiKey, {} ] = useDeleteApiKeyMutation();
  const deleteApiKeyHandler = (id: string) => {
    const args: DeleteApiKeyApiArg = {
      id: id
    };
    deleteApiKey(args)
  }

  let content = (
    <>
      {data &&
      <>
        <div key={data.id}>{data.key} {data.createdAt}
            <Button color="primary" variant="contained" onClick={() => deleteApiKeyHandler(data.id)} fullWidth>
                delete key
            </Button>
        </div>
      </>
      }
    </>
  )

  if (isLoading) {
    content = <CircularProgress/>
  }

  return (
    <>
      {content}
    </>
  )
}