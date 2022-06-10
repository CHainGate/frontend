import * as React from 'react';
import { AlertProps } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CopySnackbar({isOpen, setIsOpen} : {isOpen: boolean, setIsOpen: any}) {

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        autoHideDuration={1500}
      >
        <Alert onClose={() => setIsOpen(false)} severity="success" sx={{ width: '100%' }}>
          Copied successfully.
        </Alert>
      </Snackbar>
    </>
  )
}