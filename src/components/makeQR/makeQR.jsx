import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './makeQR.module.css';
import CryptoJS from "crypto-js";

const MakeQR = ({authService, infoRepository}) => {
    const navigate = useNavigate();
    const historyState = navigate?.location?.state;
    const [userId, setUserId] = useState(historyState && historyState.id);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const imgRef = useRef();

    const encrypt = (data, key) => {
        console.log(data, "text1");
        const result = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
        console.log(result, "text2");
        return result;
    }
    const decrypt = (text, key) => {
        try {
            console.log(text, "decryption1")
            const bytes = CryptoJS.AES.decrypt(text, key);
            const result = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            console.log(result, "decryption2");
            return result;
        } catch (err) {
            console.error(err);
            return;
        }
    }

    const data = {
        name: "test",
        age: 30,
        phone: "44444444",
    };

    const text = encrypt(data, "secret-key-1");
    decrypt(text, "secret-key-1");

    const onLogout = () => {
        authService.logout();
    }

    useEffect(() => {
        authService.onAuthChange(user => {
            if (user) {
                setUserId(user.uid);
            } else {
                navigate('/');
            }
        });
    });

    const generateQR = (e) => {
        e.preventDefault();
        const url = `https://chart.googleapis.com/chart?cht=qr&chl=${name}${phone}${address}&chs=300x300`;
        imgRef.current.src = url;
        const QR = {
            id: Date.now(),
            url: url,
        }
        infoRepository.saveInfo(userId, QR);
    }
    return (
        <section className={styles.section}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.formBox}>
                        <form className={styles.form}>
                            <h3>정보를 입력하세요</h3>
                            <input
                                placeholder="이름"
                                onChange={e => setName(e.target.value)}
                            />
                            <input
                                placeholder="연락처"
                                onChange={e => setPhone(e.target.value)}
                            />
                            <input
                                placeholder="주소"
                                onChange={e => setAddress(e.target.value)}
                            />
                            <button className={styles.button} onClick={generateQR}>생성하기</button>
                        </form>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.box}>
                            <img ref={imgRef} src="" alt="" className={styles.img}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>
    )
}

export default MakeQR;