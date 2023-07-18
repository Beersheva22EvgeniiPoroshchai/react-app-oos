import { StorageReference } from "firebase/storage";

export default interface StorageService {

uploadImg (image: File, name:string): Promise<StorageReference>;
getImg (storageRef?: StorageReference): Promise<string>;

}