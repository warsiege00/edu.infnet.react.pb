import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { app, db } from "../lib/firebase.js";
import { getCurrentDateTime } from "../util/util.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userStatus, setUserStatus] = useState('');
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
                        role: 'collaborator', // Definir role padrão
                        modified: getCurrentDateTime()
                    }, { merge: true });
                }

                const userData = await userDocSnapshot.data();
                setCurrentUser(user);
                if(userData){
                    setUserRole(userData.role || 'collaborator');
                    setUserStatus(userData.status || 'active');
                    setUserName(userData.name || 'Desconhecido' );
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

    return (
        <AuthContext.Provider value={{ currentUser, userRole, userStatus, userName, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
