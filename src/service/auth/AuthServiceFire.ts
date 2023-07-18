import LoginData from "../../model/LoginData";
import UserData from "../../model/UserData";
import AuthService from "./AuthService";

import {getFirestore, collection, getDoc, doc} from 'firebase/firestore'
import {AuthProvider, GoogleAuthProvider, TwitterAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import appFireBase from "../../config/firebase-config";

const mapProviders: Map<string, AuthProvider> = new Map([
    ['GOOGLE', new GoogleAuthProvider()],
    ['TWITTER', new TwitterAuthProvider()]

])
export default class AuthServiceFire implements AuthService {
    getAvailableProvider(): { providerName: string; providerIconUrl: string; }[] {
        return [
        {providerName: 'GOOGLE', providerIconUrl: "https://img.icons8.com/color/2x/google-logo.png"},
        {providerName: 'TWITTER', providerIconUrl: "https://www.transparentpng.com/thumb/twitter/twitter-bird-logo-pictures-0.png"}
    ]
    }
    private auth = getAuth(appFireBase);
    private administrators = collection(getFirestore(appFireBase), 'administrators');
    private async isAdmin(uid: any): Promise<boolean> {
        const docRef = doc(this.administrators, uid)
        return (await getDoc(docRef)).exists();
    }
    async login(loginData: LoginData): Promise<UserData> {
        let userData: UserData = null;
        try {
            const userAuth = !loginData.password? 
             await signInWithPopup(this.auth, mapProviders.get(loginData.email)!) :
            await signInWithEmailAndPassword(this.auth, loginData.email,
                 loginData.password);
            userData = {email: userAuth.user.email as string,
                 role: await this.isAdmin(userAuth.user.uid) ? 'admin' : 'user'}     
                
        } catch (error: any) {
            console.log(error.code, error)
        }
        console.log(userData);
        
        return userData;
    }
    logout(): Promise<void> {
        return signOut(this.auth);
    }
    
}