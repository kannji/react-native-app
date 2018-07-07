import Reaction from './Reaction';


class VocablePersisted extends Reaction {
    getCourseId() {
        return this._payload.courseId;
    }
    getLessonId() {
        return this._payload.lessonId;
    }
    getVocableId() {
        return this._payload.vocableId;
    }
};

export default VocablePersisted;

