import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    getAuth,
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    createUserWithEmailAndPassword, 
    updateProfile
} from 'firebase/auth';
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

    const signUp = async (email, password, name) => {
        try {
            
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = userCredential;
    
            await updateProfile(user, {
                displayName: name,
            });
    
            // Recupera o usuário atualmente logado e atualiza o perfil
            const loggedUser = auth.currentUser;
            await auth.updateCurrentUser(loggedUser);
    
            // Após o registro, cria o documento do usuário no Firestore
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {
                uid: user.uid,
                name: user.displayName || name,
                email: user.email,
                role: 'collaborator',  // Define um role padrão
                status: 'active',
                created: getCurrentDateTime(),
                modified: getCurrentDateTime(),
            }, { merge: true });
    
            return user;
        } catch (error) {
            console.error("Erro ao registrar o usuário:", error.message);
            throw new Error(error.message);
        }
    };
    

    return (
        <AuthContext.Provider value={{ 
            currentUser, 
            userRole, 
            userStatus, 
            userName, 
            isAdmin, 
            logout, 
            signIn,
            signUp  
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
