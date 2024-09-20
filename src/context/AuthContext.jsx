import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { app, db } from "../lib/firebase.js";
import { getCurrentDateTime } from "../hooks/util.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (!userDocSnapshot.exists()) {
                    await setDoc(userDocRef, {
                        uid: user.uid,
                        name: user.displayName || 'User Name',
                        email: user.email,
                        role: 'collaborator',
                        modified: getCurrentDateTime()
                    }, { merge: true });
                }

                const userData = await userDocSnapshot.data();
                setCurrentUser(user);
                if(userData){
                    setUserRole(userData.role || 'collaborator');
                    setUserStatus(userData.status || 'active');
                    setUserName(userData.name || 'Desconhecido' );
                    setIsAdmin(userData.role === 'admin');
                }
            } else {
                setCurrentUser(null);
                setUserRole('');
                setUserStatus('');
            }
        });
        return unsubscribe;
    }, [auth]);

    const logout = async () => {
        await signOut(auth);
    };

    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, userRole, userStatus, userName, isAdmin, logout, signIn  }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
