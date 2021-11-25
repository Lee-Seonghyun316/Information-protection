import './app.module.css';
import Login from "./components/login/login";
import styles from './app.module.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Keeper from "./components/keeper/keeper";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { initializeApp } from "firebase/app";
import AuthService from './service/auth_service'

function App() {
    const [app, setApp] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(
                    'https://t9om6df3d6.execute-api.ap-northeast-2.amazonaws.com/default/awsfirebase'
                )
                const firebaseConfig = res.data
                setApp(initializeApp(firebaseConfig))
                setLoading(true)
            } catch (err) {
                console.log(err)
            }
        };
        getRandomLists();
    },[])

    return loading ? (
        <div className={styles.app}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login authService={new AuthService(app)}/>} />
                    <Route exact path="/keeper" element={<Keeper authService={new AuthService(app)} app={app}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    ) : (
        <div>loading...</div>
    );
}

export default App;
