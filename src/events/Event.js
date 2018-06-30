import uuid4 from 'uuid/v4';

import * as db from '../db';
import EventBus from './EventBus';

class Event {

    constructor( payload, streamId ) {
        this.createdAt = db.getServerTime();
        this.payload = payload;
        this.streamId = streamId;
    }

    trigger() {
        if( !this.triggeredAt ) {
            this.triggeredAt = db.getServerTime();
            EventBus.feedIn( this );
        } else {
            throw "You can't trigger an Event twice!";
        }
    }

    onReaction( reactionEvent, callback ) {
        EventBus.in( this.streamId ).on( reactionEvent, callback )
    }

    reactWith( reactionEvent ) {
        console.log( 'reacting...' )
        if( this.triggeredAt && this.streamId && reactionEvent.streamId == this.streamId) {
            console.log( 'feeding event bus' );
            EventBus.feedIn( reactionEvent );
        } else {
            throw 'You can\'t react to an Event that didn\'t yet happen!';
        }
    }

    getData() {
        return {
            createdAt: this.createdAt,
            triggeredAt: this.triggeredAt,
            streamId: this.streamId,
            type: this.constructor.name,
            payload: this.payload
        }
    }
}

export default Event;
