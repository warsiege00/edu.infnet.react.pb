import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

const usePurchaseRequests = () => {
    const { currentUser, userName, isAdmin } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    const addPurchaseRequest = async (form) => {
        try {
            setLoading(true);
            await addDoc(collection(db, "purchaseRequests"), {
                ...form,
                userId: currentUser.uid,
                createdBy: userName,
                createdAt: new Date(),
                status: 'Aberta'
            });
            loadPurchaseRequests(); 
        } catch (error) {
            console.error("Erro ao adicionar requisição: ", error);
        } finally {
            setLoading(false);
        }
    };

    const loadPurchaseRequests = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "purchaseRequests"), where("userId", "==", currentUser.uid));
            const querySnapshot = await getDocs(q);
            const requestData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRequests(requestData.sort((a, b) => a.createdAt - b.createdAt));
        } catch (error) {
            console.error("Erro ao carregar requisições: ", error);
        } finally {
            setLoading(false);
        }
    };

    const loadAllPurchaseRequests = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "purchaseRequests"));
            const querySnapshot = await getDocs(q);
            const requestData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRequests(requestData.sort((a, b) => a.createdAt - b.createdAt));
        } catch (error) {
            console.error("Erro ao carregar requisições: ", error);
        } finally {
            setLoading(false);
        }
    };

    const deletePurchaseRequest = async (id) => {
        try {
            setLoading(true);
            await deleteDoc(doc(db, "purchaseRequests", id));
            setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
        } catch (error) {
            console.error("Erro ao excluir requisição: ", error);
        } finally {
            setLoading(false);
        }
    };

    const updatePurchaseRequestStatus = async (id, newStatus) => {
        try {
            setLoading(true);
            const requestRef = doc(db, "purchaseRequests", id);
            await updateDoc(requestRef, { status: newStatus });
            setRequests(prevRequests => prevRequests.map(request => 
                request.id === id ? { ...request, status: newStatus } : request
            ));
        } catch (error) {
            console.error("Erro ao atualizar o status da requisição: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser) {
            if(isAdmin) {
                loadAllPurchaseRequests();
            }else {
                loadPurchaseRequests();
            }
        }
    }, [currentUser]);

    return { requests, loading, addPurchaseRequest, loadPurchaseRequests, deletePurchaseRequest, updatePurchaseRequestStatus };
};

export default usePurchaseRequests;