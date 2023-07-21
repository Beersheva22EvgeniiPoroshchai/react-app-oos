import { Observable, catchError, of } from "rxjs";

import EmployeesService from "./ProductService";

import {CollectionReference, DocumentReference, getFirestore,
    collection, getDoc, FirestoreError, setDoc, deleteDoc, doc} from 'firebase/firestore'
import {collectionData} from 'rxfire/firestore'
import { getRandomInt } from "../util/random";
import { getISODateStr } from "../util/date-functions";
import { errorMonitor } from "events";
import {StorageReference, ref, uploadBytes, getDownloadURL} from "firebase/storage"

import Good from "../../model/Good";
import {storage } from "../../config/firebase-config";
import appFirebase from "../../config/firebase-config"

const MIN_ID = 100000;
const MAX_ID = 999999 + 1;

function convertProduct(prod: Good, id?: string): any {
    const res: any = {...prod, id: id ? id : prod.id}
         return res;
}

export function getErrorMessage(firestoreError: FirestoreError): string {
    let errorMessage = '';
    switch(firestoreError.code) {
        case "unauthenticated":
            case "permission-denied": errorMessage = "Authentication"; break;
        default: errorMessage = firestoreError.message;
    }
    return errorMessage;
}

export default class EmployeesServiceFire implements EmployeesService {
    collectionRef: CollectionReference = collection(getFirestore(appFirebase),
     'products');

    async addProduct(prod: Good): Promise<Good> {

        const id: string = await this.getId();
        const product = convertProduct(prod, id);
        const docRef = this.getDocRef(id);
        try {
            await setDoc(docRef, product)
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            throw errorMessage;
        }
        return product;
    }

    private getDocRef(id: string): DocumentReference {
        return doc(this.collectionRef, id);
    }

    private async exists(id: string): Promise<boolean> {
        const docRef: DocumentReference = this.getDocRef(id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();

    }

    private async getId(): Promise<string> {
        let id: string = '';
        do {
            id = getRandomInt(MIN_ID, MAX_ID).toString();
        }while (await this.exists(id));
        return id;
    }

    getProducts(): Observable <string | Good[]> {
        return collectionData(this.collectionRef).pipe(catchError(error => {
            const firestorError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestorError);
            return of(errorMessage)
        })) as Observable<string | Good[]>
    }

    async deleteProduct(id: any): Promise<void> {
        const docRef = this.getDocRef(id);
        if (!await this.exists(id)) {
            throw 'not found';
        }
        try {
            await deleteDoc(docRef);
        } catch (error: any) {
            const firestorError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestorError);
            throw errorMessage;
        }
    }

    async updateProduct(prod: Good): Promise<Good> {

       // const cloneProd = (({image, ...o }) => o)(prod)

        if (!prod.id || !await this.exists(prod.id)) {
            throw 'not found';
        }
        const product = convertProduct(prod);
        const docRef = this.getDocRef(prod.id);
        try {
            await setDoc(docRef, product)
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            throw errorMessage;
        }
        return product;
    }

    
}

