import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
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

  return (
    <div className={styles.container}>
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
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation fdd &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
