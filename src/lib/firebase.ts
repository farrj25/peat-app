import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
 apiKey: "AIzaSyCDOpRiCBygv1Pj0-KF8q684mFU2BgIcIA",
  authDomain: "peat-c3a2d.firebaseapp.com",
  projectId: "peat-c3a2d",
  storageBucket: "peat-c3a2d.firebasestorage.app",
  messagingSenderId: "829358356489",
  appId: "1:829358356489:web:db650d9697cba8436720d8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);