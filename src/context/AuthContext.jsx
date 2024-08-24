import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {app, db} from "../lib/firebase.js";
import {getCurrentDateTime} from "../util/util.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
            if (!userDocSnapshot.exists()) {
                await setDoc(userDocRef, {
                    uid: user.uid,
                    name: user.displayName || 'User Name',
                    email: user.email,
                    modified: getCurrentDateTime()
                }, { merge: true });
                console.log("Atualizou usuario");
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, [auth]);

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ currentUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
