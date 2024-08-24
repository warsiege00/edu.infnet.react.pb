import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBEYH0nwENrXDnamRosXDEo_wVi2ZAochg",
    authDomain: "front-etapa2-pb.firebaseapp.com",
    projectId: "front-etapa2-pb",
    storageBucket: "front-etapa2-pb.appspot.com",
    messagingSenderId: "279289846732",
    appId: "1:279289846732:web:6beda2c0212a519b149b69"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
