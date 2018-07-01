import * as db from '../db';
import EventBus from '../events/EventBus';
import Event from '../events/Event';

EventBus.on( Event, ( event ) => {
    db.addEvent( { newEvent: event.getData() } );
});

