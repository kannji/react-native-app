import * as db from '../db';
import EventBus from '../events/EventBus';
import LessonCreated from '../events/LessonCreated';
import LessonPersisted from '../events/LessonPersisted';

EventBus.on( LessonCreated, ( createdLessonEvent ) => {
    db.addLessonToCourse({
        newLesson: createdLessonEvent.getPayload(),
        courseId: createdLessonEvent.getCourseId()
    }).then(( persistedLesson ) => {
        let persistedLessonReaction = new LessonPersisted({
            lessonId: 'test'
        }, createdLessonEvent._streamId );

        createdLessonEvent.reactWith( persistedLessonReaction );
    });
});

