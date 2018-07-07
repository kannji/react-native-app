import Reaction from './Reaction';


class CoursePersisted extends Reaction {
    getCourseId() {
        return this._payload.courseId;
    }
};

export default CoursePersisted;

