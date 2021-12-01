import { getDatabase, ref, set, remove, onValue, off } from 'firebase/database';

class InfoRepository {
    constructor(app) {
        this.db = getDatabase(app);
    }
    saveInfo(userId, QR) {
        set(ref(this.db, `${userId}/QRs/${QR.id}`), QR);

    }
}

export default InfoRepository;