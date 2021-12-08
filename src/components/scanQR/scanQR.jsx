import React from 'react'
import QrReader from 'react-qr-reader';
import styles from './scanQR.module.css';

const handleScan = data => {
    console.log(data);
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
