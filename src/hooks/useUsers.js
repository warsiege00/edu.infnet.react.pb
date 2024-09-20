import { useState, useEffect } from 'react';
import {collection, getDocs, addDoc, updateDoc, doc, setDoc} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../lib/firebase.js';

export function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const usersSnapshot = await getDocs(usersCollection);
                const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(usersList);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const createUser = async (name, email, password, role, status) => {
        try {
            console.log("Tentando criar usuário...");
            const loggedUser = auth.currentUser

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = userCredential;
            console.log("Usuário criado com sucesso:", user);

            await updateProfile(user, {
                displayName: name
            });
            await auth.updateCurrentUser(loggedUser);

            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {
                uid: user.uid,
                name: user.displayName || name,
                email: user.email,
                role: role || 'collaborator',
                modified: new Date().toISOString(),
                status: status
            }, { merge: true });

            setUsers(prevUsers => [
                ...prevUsers,
                { id: user.uid, name: user.displayName || name, email: user.email, role, status }
            ]);

        } catch (error) {
            console.error("Erro ao criar usuário:", error.message);
            throw new Error(error.message);
        }
    };

    const updateUserRole = async (userId, newRole) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            await updateDoc(userDocRef, { role: newRole });
            setUsers(prevUsers => prevUsers.map(user => user.id === userId ? { ...user, role: newRole } : user));
        } catch (error) {
            console.error("Erro ao atualizar papel do usuário:", error.message);
            throw new Error(error.message);
        }
    };

    const updateUserStatus = async (userId, status) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            await updateDoc(userDocRef, { status });
            console.log(`Status do usuário ${userId} atualizado para ${status}`);
        
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === userId ? { ...user, status } : user
                )
            );
        } catch (error) {
            console.error("Erro ao atualizar status do usuário:", error.message);
            throw new Error(error.message);
        }
    };

    return { users, setUsers, createUser, updateUserRole, updateUserStatus, loading };
}
