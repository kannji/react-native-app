import Event from './Event';


class LessonCreated extends Event {
    constructor( payload, courseId ) {
        super( payload );
        this._courseId = courseId;
    }

    getPayload() {
        let payload = super.getPayload();
        payload.courseId = this._courseId;
        return payload;
    }

    getCourseId() {
        return this._courseId;
    }
};

export default LessonCreated;

