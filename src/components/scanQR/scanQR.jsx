import React from 'react'
import QrReader from 'react-qr-reader';
import styles from './scanQR.module.css';
import {decrypt, encrypt} from "../encryption/encrypt";

const handleScan = QRdata => {
    if(QRdata){
        console.log(QRdata, typeof(QRdata), "handleScan1");
        const decryptData = decrypt(QRdata, "secret-key-1");
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
