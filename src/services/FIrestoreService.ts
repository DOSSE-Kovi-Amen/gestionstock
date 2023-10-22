import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp, updateDoc, deleteDoc, getDoc, onSnapshot, getDocs, query, limit, orderBy } from 'firebase/firestore';

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
        const finalData = { ...data, ...dateObject }
        await setDoc(doc(colRef), finalData).then(() => {
        status=true;          
        });
        return status;
    }

    // Mettre à jour un document
    async update(collectionName: string, docId: string, data: Record<string, any>): Promise<boolean> {
        let status=false;
        const docRef = doc(this.db, collectionName, docId);
        const finalData={...data,...{updatedAt: serverTimestamp()}}
        await updateDoc(docRef, finalData).then(() => status=true);
        return status;
    }

    // Supprimer un document
    async delete(collectionName: string, docId: string): Promise<void> {
        const docRef = doc(this.db, collectionName, docId);
        await deleteDoc(docRef);
    }

    // Obtenir un document unique
    async get(collectionName: string, docId: string): Promise<any> {
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
        const quer:any = query(colRef,orderBy("updatedAt"), limit(1000));

        const unsub=onSnapshot(quer, (querySnapshot:any) => {
            const data:any = [];
            querySnapshot.forEach((doc:{id:string, data:any}) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            callback(data);
        });
        return unsub;
    }

    async getListFromCollection(collectionName: string) {
        const colRef = collection(this.db, collectionName);
        const querySnapshot = await getDocs(query(colRef,orderBy("updatedAt","desc"), limit(1000)));
    
        const dataList:any = [];
        querySnapshot.forEach((doc) => {
          dataList.push({ id: doc.id, ...doc.data() });
        });
    
        return dataList;
      }
}

export default FirestoreService;
