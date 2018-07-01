import Event from './Event';


class VocableCreated extends Event {
    constructor( payload, courseId, lessonId, streamId ) {
        super( payload, streamId );
        this._courseId = courseId;
        this._lessonId = lessonId;
    }

    getPayload() {
        let payload = super.getPayload();
        payload.courseId = this._courseId;
        payload.lessonId = this._lessonId;
        return payload;
    }

    getCourseId() {
        return this._courseId;
    }

    getLessonId() {
        return this._lessonId;
    }
};

export default VocableCreated;


