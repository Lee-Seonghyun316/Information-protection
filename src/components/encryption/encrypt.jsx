import CryptoJS from "crypto-js";

export const encrypt = (data, key) => {
    console.log(data, "encrypt1");
    const result = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    console.log(result, "encrypt2");
    return result;
}

export const decrypt = (text, key) => {
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