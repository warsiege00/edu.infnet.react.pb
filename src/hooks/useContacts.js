import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase.js';

const useContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'contacts'), (snapshot) => {
            const contactsList = snapshot.docs.map(docSnapshot => ({
                id: docSnapshot.id,
                ...docSnapshot.data(),
            }));

            setContacts(contactsList);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addContact = async (contact) => {
        try {
            await addDoc(collection(db, 'contacts'), contact);
        } catch (error) {
            console.error('Erro ao cadastrar contato: ', error);
        }
    };

    const deleteContact = async (contactId) => {
        try {
            await deleteDoc(doc(db, 'contacts', contactId));
        } catch (error) {
            console.error('Erro ao excluir contato: ', error);
        }
    };


    const getSupplierById = async (supplierId) => {
        try {
            const supplierRef = doc(db, 'suppliers', supplierId);
            const supplierSnap = await getDoc(supplierRef);
            if (supplierSnap.exists()) {
                return { id: supplierSnap.id, ...supplierSnap.data() };
            } else {
                console.warn('Fornecedor não encontrado');
                return null;
            }
        } catch (error) {
            console.error('Erro ao buscar fornecedor: ', error);
            return null;
        }
    };

    return {
        contacts,
        loading,
        addContact,
        deleteContact,
        getSupplierById,
    };
};

export default useContacts;
