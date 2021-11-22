import React from 'react';
import Header from "../header/header";
import Footer from "../footer/footer";
import styles from './login.module.css';

const Login = ({authService}) => {
    const onLogin = event =>{
        authService //
            .login(event.currentTarget.textContent)
            .then(console.log);
    }
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