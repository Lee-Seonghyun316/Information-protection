import React, {useRef} from 'react'
import QrReader from 'react-qr-reader';
import styles from './QR.module.css';
import {decrypt} from "../encryption/encrypt";
import Header from "../header/header";
import Footer from "../footer/footer";

const ScanQR = ({authService}) => {
    const QRContentRef = useRef();

    const handleScan = QRdata => {
        if (QRdata) {
            console.log(QRdata, typeof (QRdata), "handleScan1");
            const decryptData = decrypt(QRdata, "secret-key-1");
            if (!decryptData) {
                QRContentRef.current.innerText = "QR 코드 인식 오류 :( ";
            } else {
                QRContentRef.current.innerText = `😀 이름 : ${decryptData.data.name} \n📞 전화번호 : ${decryptData.data.phone} \n🏠 주소 : ${decryptData.data.address}`;
            }
            console.log(decryptData, "handleScan2")
        }
    }

    const handleError = err => {
        console.log(err);
    }

    const onLogout = () => {
        authService.logout();
    }

    return (
        <section className={styles.section}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.formBox}>
                        <div className={styles.contentWrap}>
                            <h3 className={styles.title}>QR 코드 확인</h3>
                            <p>QR 코드를 인식하세요. </p>
                            <div className={styles.content} ref={QRContentRef}>
                            </div>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <QrReader
                            className={styles.qrReader}
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                        />
                    </div>
                </div>
            </div>
            <Footer/>
        </section>

    )
}

export default ScanQR
