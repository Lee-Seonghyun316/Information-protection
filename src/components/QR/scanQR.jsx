import React, {useEffect, useRef, useState} from 'react'
import QrReader from 'react-qr-reader';
import styles from './QR.module.css';
import {decrypt} from "../encryption/encrypt";
import Header from "../header/header";
import Footer from "../footer/footer";
import {useNavigate} from "react-router";
import InfoRepository from "../infoRepository/infoRepository";

const ScanQR = ({authService, infoRepository}) => {
    const QRContentRef = useRef();
    const navigate = useNavigate();
    const historyState = navigate?.location?.state;
    const [userId, setUserId] = useState(historyState && historyState.id);

    const [clientIds, setClientIds] = useState();

    useEffect(() => {
        if (!userId) {
            console.log('!userId');
            return;
        }
        console.log(userId, 'userId');
        console.log(clientIds, 'clientIds1')
        const stopSync = infoRepository.syncInfos(userId, clientIds => {
            setClientIds(clientIds);
        });
        return () => stopSync();
        console.log(clientIds, 'clientIds2')
    }, [userId, infoRepository]);

    const handleScan = QRdata => {
        if (QRdata) {
            console.log(QRdata, typeof (QRdata), "handleScan1");
            // const decryptData = decrypt(QRdata, 'sHiN6fO-pRoT12eCtion-sEc4rEt-kE-Y-91048');
            if (clientIds) {
                console.log(clientIds, 'clientIds');
                for (let i = 0; i < clientIds?.length; i++) {
                    const secretKey = 'infoKey' + clientIds[i].id;
                    console.log(secretKey, 'secretKey & scanQR');
                    const decryptData = decrypt(QRdata, secretKey);
                    if (!decryptData) {
                        QRContentRef.current.innerText = "QR 코드 인식중..";
                        if (i === clientIds.length - 1) {
                            QRContentRef.current.innerText = "QR 코드 오류 :(";
                        }
                    } else {
                        QRContentRef.current.innerText = `😀 이름 : ${decryptData.name} \n📞 전화번호 : ${decryptData.phone} \n🏠 주소 : ${decryptData.address}`;
                        console.log(decryptData, "handleScan2");
                        break;
                    }
                }
            }
            else {
                QRContentRef.current.innerText = "정보 확인 권한 없음 :( \n 👩 권한 요청:mn031621019@gmail.com";
            }
        }
    }

    const handleError = err => {
        console.log(err);
    }

    const onLogout = () => {
        authService.logout();
    }

    useEffect(() => {
        authService.onAuthChange(user => {
            if (user) {
                setUserId(user.uid);
                console.log(userId, 'userId');
            } else {
                navigate('/');
            }
        });
    });


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
