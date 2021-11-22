import React, {useEffect} from 'react';
import styles from './keeper.module.css'
import Header from "../header/header";
import Footer from "../footer/footer";
import {useNavigate} from "react-router-dom";


const Keeper = ({authService}) => {
    const onLogout = () => {
        authService.logout();
    }
    const navigate = useNavigate();
    useEffect(() => {
        authService.onAuthChange(user => {
            if (!user) {
                navigate('/');
            }
        });
    });
    return (
        <section className={styles.keeper}>
            <Header onLogout={onLogout}/>
        </section>
    )
};

export default Keeper;