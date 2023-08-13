import {Header} from "../components/layouts/Header";
import {Banner} from "../components/layouts/Banner";
import {Post} from "../features/Post/Post";

export const Home = () => {
    return (
        <>
            <div className={'h-full bg-blue'}>
                <Header/>
                <Banner/>
                <Post/>
            </div>

        </>
    )
}