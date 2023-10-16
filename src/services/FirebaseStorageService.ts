import { ref, uploadString,uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

class FirebaseStorageService {
  private storage;

  constructor() {
    const { $storage } = useNuxtApp()
    this.storage = $storage;
  }

  // Méthode pour télécharger un fichier dans le stockage Firebase
  async uploadFile(data: File): Promise<string | null> {
    try {
      const timestamp = new Date().getTime();
      const uniqueFileName = `${timestamp}-${data.name}`;

      const storageRef = ref(this.storage, `images/${uniqueFileName}`);
      const uploadTask = await uploadBytes(storageRef, data);
      console.log('=================uploas===================');
      console.log(uploadTask);
      console.log('====================================');
      console.log('=================storageRef===================');
      console.log(storageRef);
      console.log('====================================');
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier :', error);
      return null;
    }
  }

  // Méthode pour supprimer un fichier du stockage Firebase
  async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(this.storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Erreur lors de la suppression du fichier :', error);
    }
  }
}

export default FirebaseStorageService;
