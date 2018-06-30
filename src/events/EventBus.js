import uuid4 from 'uuid/v4';


class Listener {
    constructor( streamId ) {
        this._eventListener = [];
    }

    on( eventType, callback ) {
        this._eventListener.push({
            eventType: eventType,
            callback: callback
        });
    }

    notifyAbout( event ) {
        this._eventListener.forEach( ( eventListener ) => {
            if( this.shouldListenerGetNotified( event, eventListener ) ) {
                eventListener.callback( event );
            }
        });
    }

    shouldListenerGetNotified( event, eventListener ) {
        return event instanceof eventListener.eventType;
    }
}

class StreamListener extends Listener {
    constructor( streamId ) {
        super();
        this._streamId = streamId;
    }

    shouldListenerGetNotified( event, eventListener ) {
        return event.streamId == this._streamId && super.shouldListenerGetNotified( event, eventListener );
    }
}

class EventBus {

    constructor() {
        this._streamListener = [];

        let globalListener = new Listener();
        this._streamListener[ 'global' ] = globalListener;
    }

    in( streamId ) {
        if( !(streamId in this._streamListener) ) {
            let newStreamListener = new StreamListener( streamId );
            this._streamListener[ streamId ] = newStreamListener;
        }

        return this._streamListener[ streamId ];
    }

    on( eventType, callback ) {
        this._streamListener[ 'global' ].on( eventType, callback );
    }

    feedIn( event ) {
        this._streamListener[ 'global' ].notifyAbout( event );

        if( event.streamId in this._streamListener ) {
            this._streamListener[ event.streamId ].notifyAbout( event );
        }
    }

    generateNewStreamId() {
        return uuid4();
    }
}

export default new EventBus();

