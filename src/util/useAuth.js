import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {app} from "../lib/firebase.js";


const useAuth = getAuth(app);

export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(useAuth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};


