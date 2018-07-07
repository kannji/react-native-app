import Reaction from './Reaction';


class LessonPersisted extends Reaction {
    getCourseId() {
        return this._payload.courseId;
    }
    getLessonId() {
        return this._payload.lessonId;
    }
};

export default LessonPersisted;

