import * as React from 'react';
import type { NextPage } from 'next';
import Sidebar from "../src/Sidebar";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../lib/hooks";

const Home: NextPage = () =>  {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const authInfo = useAppSelector((state) => state.authInfo);

    React.useEffect(() => {
        if (localStorage) {
            const token = sessionStorage.getItem('token');
            console.log("LocalState: ", token)
        }
        if (!authInfo.isAuthenticated) {
            router.push('/login').then();
        }
    }, []);


    return (<></>);
}

export default Home;