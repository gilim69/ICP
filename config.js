import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDS5vIYsbQ019g_XcG8vop5t3zlxTXi7IE",
  authDomain: "internation-club-puebla.firebaseapp.com",
  projectId: "internation-club-puebla",
  storageBucket: "internation-club-puebla.appspot.com",
  messagingSenderId: "32364680318",
  appId: "1:32364680318:web:d788976a61316159d6f42f",
  measurementId: "G-7F1WCLPW4Q"
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}