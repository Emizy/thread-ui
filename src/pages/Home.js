import {Banner} from "../components/layouts/Banner";
import {Post} from "../features/Post/Post";
import {useEffect} from "react";

export const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className={'h-full bg-blue'}>
                <Banner/>
                <Post/>
            </div>

        </>
    )
}