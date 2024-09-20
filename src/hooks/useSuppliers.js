import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase.js';

const useSuppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'suppliers'), (snapshot) => {
            const suppliersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSuppliers(suppliersList);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const addSupplier = async (supplier) => {
        try {
            await addDoc(collection(db, 'suppliers'), supplier);
        } catch (error) {
            console.error('Erro ao cadastrar fornecedor: ', error);
        }
    };

    const deleteSupplier = async (id) => {
        try {
            await deleteDoc(doc(db, 'suppliers', id));
        } catch (error) {
            console.error('Erro ao excluir fornecedor: ', error);
        }
    };


    return {
        suppliers,
        loading,
        addSupplier,
        deleteSupplier,
    };
};

export default useSuppliers;
