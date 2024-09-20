import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import useProducts from './useProducts';
import useSuppliers from './useSuppliers';

const useQuotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser, userName } = useAuth();
    const { products } = useProducts();
    const { suppliers } = useSuppliers();


    const loadQuotes = async () => {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "quotes"));
        const quotesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setQuotes(quotesData);
        setLoading(false);
    };

    const addQuote = async (quote) => {
        try {
            
            const product = products.find(p => p.id === quote.productId);
            const supplier = suppliers.find(s => s.id === quote.supplierId);

            const newQuote = {
                ...quote,
                productName: product ? product.name : 'Produto não encontrado', 
                supplierName: supplier ? supplier.name : 'Fornecedor não encontrado', 
                createdBy: userName,
                createdByUId: currentUser.uid,
                createdAt: new Date()
            };

            await addDoc(collection(db, "quotes"), newQuote);
            loadQuotes();
        } catch (error) {
            console.error("Erro ao adicionar cotação: ", error);
        }
    };

    const deleteQuote = async (id) => {
        try {
            await deleteDoc(doc(db, "quotes", id));
            loadQuotes();
        } catch (error) {
            console.error("Erro ao excluir cotação: ", error);
        }
    };

    useEffect(() => {
        loadQuotes();
    }, []);

    return { quotes, loading, addQuote, deleteQuote };
};

export default useQuotes;