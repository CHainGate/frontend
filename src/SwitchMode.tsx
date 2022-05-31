import { Switch } from '@mui/material';
import * as React from 'react';
import { changeMode } from '../lib/authInfo/reducers';
import { useAppDispatch, useAppSelector } from '../lib/hooks';

export default function SwitchMode() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.internal.mode.mode);

  const handleChange = () => {
    dispatch(changeMode());
  };

  return (
    <>
      Switch Mode
      <Switch
        checked={mode === "main"}
        onChange={handleChange}/>
    </>
  )
}