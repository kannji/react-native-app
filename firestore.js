import firebase from '@firebase/app';
import '@firebase/firestore';

const FIRESTORE_CONFIG = {
    apiKey: "AIzaSyAOJnlPctISpWZhEInlOolE7WjKZMaXiKM",
    authDomain: "kannji-app.firebaseapp.com",
    databaseURL: "https://kannji-app.firebaseio.com",
    projectId: "kannji-app",
    storageBucket: "kannji-app.appspot.com",
    messagingSenderId: "246750548148"
};

const firestore = firebase.firestore( firebase.initializeApp( FIRESTORE_CONFIG ) );

export default firestore;
