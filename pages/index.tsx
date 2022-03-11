import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import { GetPetByIdApiArg, useGetPetByIdQuery } from '../api/chaingate.generated';
import {Link} from "@mui/material";
import * as React from "react";

const Home: NextPage = () => {
  const router = useRouter();

  const user = async () => {
    await fetch('http://localhost/backend/user', {method: 'GET'})
  }

  const logout = async () => {
    await fetch('http://localhost/backend/logout', {method: 'GET'})
  }

  const registerUser = async (event: any) => {
    event.preventDefault()

    await fetch(
      'http://localhost/backend/register',
      {
        body: JSON.stringify({
          name: event.target.name.value,
          email: event.target.email.value,
          password: event.target.password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
  }


  const loginUser = async (event: any) => {
    event.preventDefault()

    await fetch(
      'http://localhost/backend/login',
      {
        body: JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
  }

  const apiArg : GetPetByIdApiArg = {petId: 1};
  const result = useGetPetByIdQuery(apiArg);
  const { isLoading, error, data } = result;

  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={registerUser}>
          <label htmlFor="name">name</label>
          <input id="name" type="text" autoComplete="name" required/>
          <label htmlFor="email">email</label>
          <input id="email" type="text" autoComplete="email" required/>
          <label htmlFor="password">password</label>
          <input id="password" type="password" autoComplete="password" required/>
          <button type="submit">Register</button>
        </form>
        <form onSubmit={loginUser}>
          <label htmlFor="email">email</label>
          <input id="email" type="text" autoComplete="email" required/>
          <label htmlFor="password">password</label>
          <input id="password" type="password" autoComplete="password" required/>
          <button type="submit">Login</button>
        </form>
        <button onClick={user}>user</button>
        <button onClick={logout}>logout</button>
      </div>
        <h2>test</h2>
      <article>
        {error ? (
          <>Oh no, there was an error</>
        ) : router && router.isFallback || isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.name}</h3>
            {data.photoUrls[0] && (<Image src={data.photoUrls[0]} alt={data.name} layout="fill" />)}
          </>
        ) : null}
      </article>
    <Link href="/muiHome" color="secondary">
        Go to the about page
    </Link>
    </div>
  )
}

export default Home
