import { getAnalytics } from 'firebase/analytics';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA4pgScKG5_wEc0DsxLxXag3FHCEWfDb-s",
    authDomain: "cognicommons.firebaseapp.com",
    projectId: "cognicommons",
    storageBucket: "cognicommons.firebasestorage.app",
    messagingSenderId: "314449694278",
    appId: "1:314449694278:web:98214e9a2f35b086fd0447",
    measurementId: "G-RFV60F2ERQ"
  };
  
  // Initialize Firebase
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  export { app, auth, db, storage };