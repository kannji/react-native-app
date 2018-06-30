import firebase from 'react-native-firebase';

const FIRESTORE_SETTINGS = {
    timestampsInSnapshots: true
}

const db = firebase.firestore();

db.settings(FIRESTORE_SETTINGS);

export function addEvent({
    newEvent
} = {}) {
    return getAllEvents()
        .add({
            ...newEvent
        });
}

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

export function getAllEvents() {
    return db.collection( 'Events' );
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

