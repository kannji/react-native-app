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

export function addCourse({
    newCourse
} = {}) {
    return getAllCourses()
        .add({
            ...newCourse,
            ...getNewTimestampObject()
        });
}

export function addLessonToCourse({
    newLesson,
    courseId
} = {}) {
    return getAllLessonsForCourse( courseId )
        .add({
            ...newLesson,
            ...getNewTimestampObject()
        });
}

export function addVocableToLesson({
    newVocable,
    courseId,
    lessonId
} = {}) {
    return getVocabularyForLesson( courseId, lessonId )
        .add({
            ...newVocable,
            ...getNewTimestampObject()
        });
}

export function getAllCourses() {
    return db.collection( 'Courses' );
}

export function getAllLessonsForCourse( courseId ) {
    return getAllCourses().doc( courseId ).collection( 'Lessons' );
}

export function getVocabularyForLesson( courseId, lessonId ) {
    return getAllLessonsForCourse( courseId ).doc( lessonId ).collection( 'Vocabulary' );
}

export function getCourse( courseId ) {
    return getAllCourses().doc( courseId );
}

export function getLesson( courseId, lessonId ) {
    return getAllLessonsForCourse( courseId ).doc( lessonId );
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
