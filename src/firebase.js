import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA8HBqeZHQLv64dai3eJqMKnSQuI2c2iF0",
  authDomain: "avaliacao-react-516db.firebaseapp.com",
  projectId: "avaliacao-react-516db",
  storageBucket: "avaliacao-react-516db.firebasestorage.app",
  messagingSenderId: "805705412570",
  appId: "1:805705412570:web:bd4a0325fd07613b23dae3",
  measurementId: "G-5X3EPFHHN2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);


const tasksCollection = collection(db, 'tasks')


export { db, auth, tasksCollection };