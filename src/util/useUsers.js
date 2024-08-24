// import { useState, useEffect } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import {db} from "../lib/firebase.js";
//
// const useUsers = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const usersCollection = collection(db, 'users');
//                 const usersSnapshot = await getDocs(usersCollection);
//                 const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 setUsers(usersList);
//             } catch (error) {
//                 console.error("Erro ao buscar usuários:", error);
//                 setError("Erro ao carregar usuários.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchUsers();
//     }, []);
//
//     return { users, loading, error };
// };
//
// export default useUsers;
