import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBET9G6kEBMURRffXFusn-Yxmhex8kR2Zc',
  authDomain: 'insta-clone-62bbc.firebaseapp.com',
  projectId: 'insta-clone-62bbc',
  storageBucket: 'insta-clone-62bbc.appspot.com',
  messagingSenderId: '546941800148',
  appId: '1:546941800148:web:db57ae0a3dd34da955b541',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const provider = new firebase.auth.FacebookAuthProvider();

export default firebase;
