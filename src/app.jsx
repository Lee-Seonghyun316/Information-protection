import './app.module.css';
import Login from "./components/login/login";
import styles from './app.module.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Keeper from "./components/keeper/keeper";
import {useEffect, useState} from 'react';
import axios from 'axios';
import {initializeApp} from "firebase/app";
import AuthService from './service/auth_service'
import Qrmake from './components/qrmake/qrmake';
import Qrscan from './components/qrscan/qrscan';
import InfoRepository from "./components/infoRepository/infoRepository";
import {css} from "@emotion/react";
import PacmanLoader from "react-spinners/PacmanLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function App() {
    const [app, setApp] = useState('');
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#37006a");

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
    }, [])

    return <div className={styles.app}>
        {loading ? (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login authService={new AuthService(app)}/>}/>
                <Route exact path="/keeper" element={<Keeper authService={new AuthService(app)} app={app}/>}/>
                <Route exact path="/make" element={<Qrmake authService={new AuthService(app)}
                                                           infoRepository={new InfoRepository(app)}/>}/>
                <Route exact path="/scan" element={<Qrscan authService={new AuthService(app)}/>}/>
            </Routes>
        </BrowserRouter>
    ) : (
        <div className="sweet-loading">
            <h4>loading...</h4>
            <PacmanLoader
                color={color} loading={loading} css={override} size={25}/>
        </div>
    )}
    </div>
}

export default App;
