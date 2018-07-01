import * as db from '../db';
import EventBus from '../events/EventBus';
import VocableCreated from '../events/VocableCreated';
import VocablePersisted from '../events/VocablePersisted';

EventBus.on( VocableCreated, ( createdVocableEvent ) => {
    db.addVocableToLesson({
        newVocable: createdVocableEvent.getPayload(),
        courseId: createdVocableEvent.getCourseId(),
        lessonId: createdVocableEvent.getLessonId()
    }).then(( persistedVocable ) => {
        let persistedVocableEvent = new VocablePersisted({
            vocableId: 'test'
        }, createdVocableEvent.streamId );

        createdVocableEvent.reactWith( persistedVocableEvent );
    });
});

