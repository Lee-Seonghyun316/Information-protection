import React, { useState } from 'react';
import styles from './qr.module.css';
import {useNavigate} from "react-router-dom";


function QRMAKE({authService}){

    const navigate = useNavigate();

    const[name,setName] = useState('이름');
    const[address, setAddress] = useState('주소');
    const[phonenum, setPhonenum] = useState('연락처');
    const[qrurl,setQrurl] = useState('');
  
    const qrobj={user_name:'', user_add:'', user_phone:'', user_qr:''};
    let qr_code_url="";

    const Getdata =(event)=>{

      event.preventDefault();
      
      const data3= ` name : ${name} address: ${address} phonenum : ${phonenum}`;
      qr_code_url=`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data3}`;      
      
      setQrurl(qr_code_url);
      

      qrobj.user_name = name;
      qrobj.user_add = address;
      qrobj.user_phone = phonenum;
      


    };

    const MakeQR =(event)=>{
      event.preventDefault();
      qrobj.user_qr = qrurl;
      alert("qr코드를 생성/저장합니다");
      navigate('/makeqr',{state: {qrdata: qrobj}});

    }

    
    return(
        <div className={styles.qr_data}>
            <p>QR Code</p>
            <form onSubmit={Getdata}>
                name : <p></p> 
                <input 
                value={name} 
                onChange={(e)=> setName(e.target.value)}/><br />
                address : <p></p>  
                <input
                value={address}
                onChange={(e)=> setAddress(e.target.value)}/><br />
                phonenum : <p></p> 
                 <input
                 value={phonenum}
                 onChange={(e)=> setPhonenum(e.target.value)}/><br />
                
                <button type="submit" class={styles.button}  >Generate</button>
            </form>

            <img className="image" src={qrurl} alt="qr코드 데이터가 저장" />

            <form onSubmit={MakeQR}>
              <button type="submit" class={styles.button} >MakeQR</button>
            </form>
        </div>

    );
    

}
export default QRMAKE;
