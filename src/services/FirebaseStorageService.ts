import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';
import { FirebaseApp } from 'firebase/app';

class FirebaseStorageService {
  private storage;

  constructor() {
    const { $storage } = useNuxtApp()
    this.storage = $storage;
  }

  // Méthode pour télécharger un fichier dans le stockage Firebase
  async uploadFile(path: string, data: string): Promise<string | null> {
    try {
      const storageRef = ref(this.storage, path);
      await uploadString(storageRef, data, 'data_url');
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
