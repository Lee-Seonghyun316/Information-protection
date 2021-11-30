import React, {useEffect} from 'react';
import styles from './keeper.module.css'
import Header from "../header/header";
import Footer from "../footer/footer";
import {useNavigate} from "react-router-dom";
import 'material-icons/iconfont/filled.css';

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
    const moveToMake = (e) => {
        e.preventDefault();
        navigate('/make')
    }
    const moveToScan = (e) => {
        e.preventDefault();
        navigate('/scan')
    }
    return (
        <section className={styles.keeper}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.icon}>
                        <span class="material-icons" style={{fontSize: '36px'}}>lock</span>
                    </div>
                    <div className={styles.content}>
                        <h3>QR코드 생성하기</h3>
                        <p>설명</p>
                        <p>설명</p>
                        <button className={styles.button} onClick={moveToMake}>이동하기</button>
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.icon}>
                    <span class="material-icons" style={{fontSize: '36px'}}>search</span>
                    </div>
                    <div className={styles.content}>
                        <h3>QR코드 스캔하기</h3>
                        <p>설명</p>
                        <p>설명</p>
                        <button className={styles.button} onClick={moveToScan}>이동하기</button>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
};

export default Keeper;