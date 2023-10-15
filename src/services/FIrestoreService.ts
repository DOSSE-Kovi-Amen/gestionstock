import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp, updateDoc, deleteDoc, getDoc, onSnapshot, getDocs } from 'firebase/firestore';

class FirestoreService {
    private db;

    constructor() {
        const { $db } = useNuxtApp()
        // Affecter à la variable db de classe 
        this.db = $db;

    }

    // Créer un document
    async create(collectionName: string, data: Record<string, any>): Promise<boolean> {
        let status=false;
        const colRef = collection(this.db, collectionName);
        const dateObject= { createdAt: serverTimestamp(), updatedAt: serverTimestamp() }
        const finalDate = { ...data, ...dateObject }
        await setDoc(doc(colRef), finalDate).then(() => {
        status=true;          
        });
        return status;
    }

    // Mettre à jour un document
    async update(collectionName: string, docId: string, data: Record<string, any>): Promise<boolean> {
        let status=false;
        const docRef = doc(this.db, collectionName, docId);
        await updateDoc(docRef, data).then(() => status=true);
        return status;
    }

    // Supprimer un document
    async delete(collectionName: string, docId: string): Promise<void> {
        const docRef = doc(this.db, collectionName, docId);
        await deleteDoc(docRef);
    }

    // Obtenir un document unique
    async get(collectionName: string, docId: string): Promise<Record<string, any> | null> {
        const docRef = doc(this.db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    }

    // Obtenir des mises à jour en temps réel pour une collection
     getRealTime(collectionName: string, callback: (data: any) => void) {
        const colRef = collection(this.db, collectionName);
        const data:any = [];
        const unsub=onSnapshot(colRef, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            callback(data);
        });
        return unsub;
    }

    async getListFromCollection(collectionName: string) {
        const colRef = collection(this.db, collectionName);
        const querySnapshot = await getDocs(colRef);
    
        const dataList:any = [];
        querySnapshot.forEach((doc) => {
          dataList.push({ id: doc.id, ...doc.data() });
        });
    
        return dataList;
      }
}

export default FirestoreService;
