import React, {useEffect} from 'react';
import styles from './keeper.module.css'
import Header from "../header/header";
import Footer from "../footer/footer";
import {useNavigate, Link } from "react-router-dom";


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
            <div className={styles.container}>

                <Link to ="/makeqr" >
                    <button className = {styles.button}></button>
                </Link>

                <Link to ="/scanqr">
                    <button className =  {styles.button2}></button>
                </Link>
                

            </div>
            
            <Footer/>
        </section>
    )
};

export default Keeper;