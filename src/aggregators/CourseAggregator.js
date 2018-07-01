import * as db from '../db';
import EventBus from '../events/EventBus';
import CourseCreated from '../events/CourseCreated';
import CoursePersisted from '../events/CoursePersisted';

EventBus.on( CourseCreated, ( createdCourseEvent ) => {
    db.addCourse({
        newCourse: createdCourseEvent.getPayload()
    }).then(( persistedCourse ) => {
        
        let persistedCourseEvent = new CoursePersisted({
            courseId: 'test'
        }, createdCourseEvent.streamId );

        createdCourseEvent.reactWith( persistedCourseEvent );
    });
});