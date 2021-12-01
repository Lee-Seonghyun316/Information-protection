import React, {useEffect, useState} from 'react';
import Header from "../header/header";
import Footer from "../footer/footer";
import styles from './login.module.css';
import {useNavigate} from "react-router-dom";

const Login = ({authService}) => {
    const navigate = useNavigate();
    const goToKeeper = (userId) => {
        navigate(
            '/keeper',
            {state: {id: userId}});
    }

    const onLogin = event => {
        authService //
            .login(event.currentTarget.textContent)
            .then(data => goToKeeper(data.user.uid));
    }

    useEffect(()=>{
        authService.onAuthChange(user => {
            user && goToKeeper(user.id);
        });
    });

    return (
        <section className={styles.loginContainer}>
            <Header/>
            <section className={styles.login}>
                <h1>login</h1>
                <ul className={styles.social}>
                    <li>
                        <button className={styles.button} onClick={onLogin}>Google</button>
                    </li>
                    <li>
                        <button className={styles.button} onClick={onLogin}>Github</button>
                    </li>
                </ul>
            </section>
            <Footer/>
        </section>
    )
}

export default Login;