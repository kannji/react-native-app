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
        let persistedVocableReaction = new VocablePersisted({
            vocableId: 'test'
        }, createdVocableEvent._streamId );

        createdVocableEvent.reactWith( persistedVocableReaction );
    });
});

