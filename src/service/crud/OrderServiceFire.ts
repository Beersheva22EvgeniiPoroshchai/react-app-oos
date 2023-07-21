import { CollectionReference, DocumentReference, FirestoreError, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import Order from "../../model/Order";
import { getRandomInt } from "../util/random";
import OrderService from "./OrderService";
import appFirebase from "../../config/firebase-config";
import { collectionData } from "rxfire/firestore";
import { Observable, catchError, of } from "rxjs";
import Good from "../../model/Good";

const MIN_ID = 100000;
const MAX_ID = 999999 + 1;

function convertOrder(order: Order, id?: string): any {
    const res: any = {...order, id: id ? id : order.id}
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


export default class OrderServiceFire implements OrderService {
    collectionRef: CollectionReference = collection(getFirestore(appFirebase),
    'orders');

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
        } while (await this.exists(id));
        return id;
    }

    
    async addOrder(order: Order): Promise<Order> {
      const id: string = await this.getId();
      const docRef = this.getDocRef(id);
        try {
            await setDoc(docRef, order)
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            throw errorMessage;
        }
        return order;
    }


    async updateOrder(order: Order): Promise<Order> {
        if (!order.id || !await this.exists(order.id)) {
            throw 'not found';
        }
        const order1 = convertOrder(order);
        const docRef = this.getDocRef(order.id);
        try {
            await setDoc(docRef, order)
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError);
            throw errorMessage;
        }
        return order1;
    }


    // async updateProduct(prod: Good): Promise<Good> {

    //     // const cloneProd = (({image, ...o }) => o)(prod)
 
    //      if (!prod.id || !await this.exists(prod.id)) {
    //          throw 'not found';
    //      }
    //      const product = convertProduct(prod);
    //      const docRef = this.getDocRef(prod.id);
    //      try {
    //          await setDoc(docRef, product)
    //      } catch (error: any) {
    //          const firestoreError: FirestoreError = error;
    //          const errorMessage = getErrorMessage(firestoreError);
    //          throw errorMessage;
    //      }
    //      return product;
    //  }



    async deleteOrder(id: any): Promise<void> {
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


    getAllOrders(): Observable <string | Order[]> {
        return collectionData(this.collectionRef, {idField: 'id'}).pipe(catchError(error => {
            const firestorError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestorError);
            return of(errorMessage)
        })) as Observable<string | Order[]>
    }




}