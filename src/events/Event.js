import uuid4 from 'uuid/v4';

import EventBus from './EventBus';
import Triggerable from './Triggerable';
import Reaction from './Reaction';

class Event extends Triggerable {

    constructor( payload ) {
        super( payload );
        this._streamId = this.generateStreamId();
    }

    onReaction( reaction, callback ) {
        EventBus.in( this._streamId ).on( reaction, callback )
    }

    reactWith( reaction ) {
        if( reaction instanceof Reaction && this._triggeredAt && this._streamId && reaction._streamId == this._streamId) {
            reaction.trigger();
        } else {
            throw 'You can\'t react to an Event that didn\'t yet happen!';
        }
    }

    generateStreamId() {
        return uuid4();
    }
}

export default Event;
