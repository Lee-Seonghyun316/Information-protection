import './app.module.css';
import Login from "./components/login/login";
import styles from './app.module.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Keeper from "./components/keeper/keeper";


function App({authService}) {
    return (
        <div className={styles.app}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login authService={authService}/>} />
                    <Route exact path="/keeper" element={<Keeper authService={authService}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
