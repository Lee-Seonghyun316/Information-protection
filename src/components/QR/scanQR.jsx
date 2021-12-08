import React from 'react'
import QrReader from 'react-qr-reader';
import styles from './QR.module.css';
import {decrypt} from "../encryption/encrypt";

const handleScan = QRdata => {
    if(QRdata){
        console.log(QRdata, typeof(QRdata), "handleScan1");
        const decryptData = decrypt(QRdata, process.env.REACT_APP_ENCRYPT_KEY);
        console.log(decryptData, "handleScan2")
    }
}

const handleError = err => {
    console.log(err);
}

const ScanQR = () => {
    return (
        <div className={styles.container}>
            <p>QR </p>
            <QrReader
                className={styles.qrReader}
                delay={300}
                onError={handleError}
                onScan={handleScan}
                />
        </div>
    )
}

export default ScanQR
