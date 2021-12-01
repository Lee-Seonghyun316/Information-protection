import { getDatabase, ref, set, remove, onValue, off } from 'firebase/database';

class InfoRepository {
    constructor(app) {
        this.db = getDatabase(app);
    }
    syncInfos(userId, onUpdate) {
        const query = ref(this.db, `${userId}/QRs`);
        onValue(query, (snapshot) => {
            const value = snapshot.val();
            value && onUpdate(value);
        });
        return () => off(query);
    }
    saveInfo(userId, QR) {
        set(ref(this.db, `${userId}/QRs/${QR.id}`), QR);
    }
    removeInfo(userId, QR) {
        remove(ref(this.db, `${userId}/QRs/${QR.id}`));
    }
}

export default InfoRepository;