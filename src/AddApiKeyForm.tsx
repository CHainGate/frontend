import * as React from 'react';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useDeleteApiKeyMutation, useGenerateApiKeyMutation, useGetApiKeyQuery } from '../api/chaingate.api';
import { DeleteApiKeyApiArg, GenerateApiKeyApiArg } from '../api/chaingate.generated';
import { useAppSelector } from '../lib/hooks';
import styles from "../styles/ApiKey.module.scss"



export default function AddApiKeyForm() {
  const [showApiKey, setShowApiKey] = React.useState<boolean>(false);
  const mode = useAppSelector((state) => state.internal.mode.mode);
  const { data, isLoading: getApiKeyLoading, isError } = useGetApiKeyQuery({ mode });

  // create API Key
  const [generateApiKey, { isLoading: generateApiKeyLoading, error }] = useGenerateApiKeyMutation()
  const createApiKey = () => {
    const arg: GenerateApiKeyApiArg = {
      apiKeyRequestDto: {
        mode
      }
    }
    generateApiKey(arg)
  }

  // delete API Key
  const [ deleteApiKey, {} ] = useDeleteApiKeyMutation();
  const deleteApiKeyHandler = (id: string) => {
    const args: DeleteApiKeyApiArg = {
      id: id
    };
    deleteApiKey(args)
  }

  const handleClickToClipboard = (address: string | undefined) => {
    if (address) {
      navigator.clipboard.writeText(address)
    }
  };

    return (
    <>
      <h2>API Key</h2>
      <div>
      <FormControl sx={{ width: 665, marginBottom: 2}} variant="outlined" className={showApiKey ? styles.overflow : ""}>
        <InputLabel htmlFor="outlined-adornment-api-key">API Key</InputLabel>
        <OutlinedInput
          id="outlined-adornment-api-key"
          type={showApiKey ? 'text' : 'password'}
          value={data ? data.key : "" }
          readOnly={true}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle api key visibility"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              <IconButton
                aria-label="toggle api key visibility"
                onClick={() => handleClickToClipboard(data?.key)}
                edge="end"
              >
                <ContentCopyIcon/>
              </IconButton>
            </InputAdornment>
          }
          label="API Key"
        />
      </FormControl>
      </div>
      <div>
        {data?.key
          ? <Button color="primary" variant="contained" onClick={() => deleteApiKeyHandler(data.id)} sx={{ width: 665}}>
            DELETE API KEY
          </Button>
          : <Button color="primary" variant="contained" onClick={createApiKey} sx={{ width: 665}}>
            CREATE API KEY
          </Button>
        }
      </div>
    </>
  )
}