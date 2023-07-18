import { StorageReference, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import StorageService from "./StorageServiceImg";
import { FirestoreError } from "firebase/firestore";
import {getErrorMessage} from "./ProductServiceFire"


export default class StorageServiceFire implements StorageService {
    private storage = getStorage();
    

    async uploadImg (image: File, name:string): Promise<StorageReference> { 
        const fileName = `images/${name}.jpg`
        const newImgRef = ref(this.storage, fileName);
        const metadata = { 
            contentType: 'image/jpeg',
          };
        try {
          await uploadBytes(newImgRef, image, metadata)
        } catch (error: any) {
            const firestorError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestorError);
            throw errorMessage;
        }
        return newImgRef;
        }
        

    async getImg(storageRef: StorageReference): Promise<string> {
        return await getDownloadURL(storageRef)

    }
    
}