import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase.js';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
            const productsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsList);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const addProduct = async (product) => {
        try {
            await addDoc(collection(db, 'products'), product);
        } catch (error) {
            console.error('Erro ao cadastrar produto: ', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await deleteDoc(doc(db, 'products', productId));
        } catch (error) {
            console.error('Erro ao excluir produto: ', error);
        }
    };

    return {
        products,
        loading,
        addProduct,
        deleteProduct
    };
};

export default useProducts;
