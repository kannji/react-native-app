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

const db = firebase.firestore( firebase.initializeApp( APP_CONFIG ) );

db.settings(FIRESTORE_SETTINGS);

export default db;

export function addBook({
    newBook
} = {}) {
    return getAllBooks()
        .add({
            ...newBook,
            ...getNewTimestampObject()
        });
}

export function addSectionToBook({
    newSection,
    bookId
} = {}) {
    return getAllSectionsForBook( bookId )
        .add({
            ...newSection,
            ...getNewTimestampObject()
        });
}

export function addVocableToSection({
    newVocable,
    bookId,
    sectionId
} = {}) {
    return getVocabularyForSection( bookId, sectionId )
        .add({
            ...newVocable,
            ...getNewTimestampObject()
        });
}

function getAllBooks() {
    return db.collection( 'LearningLists' );
}

function getAllSectionsForBook( bookId ) {
    return getAllBooks().doc( bookId ).collection( 'Levels' );
}

function getVocabularyForSection( bookId, sectionId ) {
    return getAllSectionsForBook( bookId ).doc( sectionId ).collection( 'Entries' );
}

function getServerTime() {
    return firebase.firestore.FieldValue.serverTimestamp();
}

function getNewTimestampObject() {
    let serverTime = getServerTime();

    return {
        createdAt: serverTime,
        updatedAt: serverTime
    }
}
