import React, {useState} from 'react';
import QrReader from 'react-qr-reader';
import styles from './qr.module.css';
import {useNavigate} from "react-router-dom";


function SCANQR({authService}) {


    const navigate = useNavigate();

    const [scanResultWebCam, setScanResultWebCam] = useState('');

    const handleErrorWebCam = (error) => {
        console.log(error);
    }

    const handleScanWebCam = (result) => {
        console.log('scan');
        if (result) {
            setScanResultWebCam(result);
            console.log(result);

        }
        else {
            console.log('error');
        }
        navigate('/scanqr');
    }


    return (
        <div className={styles.scanner}>

            <video id="video" width="640" height="480" autoplay className={styles.video}></video>

            <h3>Qr Code Scan by Web Cam</h3>
            <QrReader
                delay={300}
                style={{width: '100%'}}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
            />
            <h3 className="showdata">Scanned By WebCam Code: {scanResultWebCam}</h3>

        </div>

    );


}

export default SCANQR;
