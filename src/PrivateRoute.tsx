import router, { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { useEffect } from 'react';
import { AppDispatch } from '../lib/store';
import jwt_decode from 'jwt-decode';
import { AuthInfo, clearUser, setCredentials } from '../lib/authInfo/reducers';
import { CircularProgress } from '@mui/material';
import * as React from 'react';

function isTokenValid(token: string): boolean {
  const decodedToken: any = jwt_decode(token);
  const expDate = new Date(decodedToken.exp * 1000);
  const dateNow = new Date(Date.now());
  return dateNow < expDate;
}

function updateStore(token: string, dispatch: AppDispatch) {
  const result: boolean = isTokenValid(token);
  const decodedToken: any = jwt_decode(token);
  if (result) {
    const authInfo: AuthInfo = {
      username: decodedToken.name,
      token,
      isAuthenticated: true,
    };
    dispatch(setCredentials(authInfo));
  } else {
    dispatch(clearUser());
    router.push('/login').then();
  }
}

export default function PrivateRoute({ children }: any) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authInfo = useAppSelector((state) => state.authInfo);
  const loginRoute = '/login';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !authInfo.isAuthenticated) {
      updateStore(token, dispatch);
    } else if (router.pathname !== loginRoute) {
      clearUser();
      router.push(loginRoute);
    }
  }, [])

  if (!authInfo.isAuthenticated && router.pathname !== loginRoute) {
    return <CircularProgress/>;
  }

  return children;
}