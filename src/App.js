import './App.css';
import {Route, Routes} from "react-router-dom"
import {Home} from "./pages/Home";
import {BaseComponent} from "./pages/BaseComponent";

function App() {

    return (
        <div className="App min-h-screen bg-[#ffffff]">
            <Routes>
                <Route path={'/'} element={<BaseComponent/>}>
                    <Route exact path={'/'} element={<Home/>}/>
                </Route>
            </Routes>

        </div>
    );
}

export default App;
