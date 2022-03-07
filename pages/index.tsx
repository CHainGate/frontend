import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import { GetPetByIdApiArg, useGetPetByIdQuery } from '../api/chaingate.generated';

const Home: NextPage = () => {
  const router = useRouter();

  const apiArg : GetPetByIdApiArg = {petId: 1};
  const result = useGetPetByIdQuery(apiArg);
  const { isLoading, error, data } = result;

  return (
    <div className={styles.container}>
      test
      <article>
        {error ? (
          <>Oh no, there was an error</>
        ) : router.isFallback || isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.name}</h3>
            <img src={data.photoUrls[0]} alt={data.name} />
          </>
        ) : null}
      </article>
    </div>
  )
}

export default Home
