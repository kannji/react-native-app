import firebase from '@firebase/app';
import '@firebase/firestore';

const APP_CONFIG = {
    apiKey: 'AIzaSyAOJnlPctISpWZhEInlOolE7WjKZMaXiKM',
    authDomain: 'kannji-app.firebaseapp.com',
    databaseURL: 'https://kannji-app.firebaseio.com',
    projectId: 'kannji-app',
    storageBucket: 'kannji-app.appspot.com',
    messagingSenderId: '246750548148'
};

const FIRESTORE_SETTINGS = {
    timestampsInSnapshots: true
}

const firestore = firebase.firestore( firebase.initializeApp( APP_CONFIG ) );

firestore.settings(FIRESTORE_SETTINGS);

export default firestore;

