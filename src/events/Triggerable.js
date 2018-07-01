import * as db from '../db';
import EventBus from './EventBus';


class Triggerable {
    constructor( payload ) {
        this._createdAt = db.getServerTime();
        this._payload = payload;
    }

    trigger() {
        if( !this._triggeredAt ) {
            this._triggeredAt = db.getServerTime();
            EventBus.feedIn( this );
        } else {
            throw "You can't trigger twice!";
        }
    }

    getData() {
        return {
            createdAt: this._createdAt,
            triggeredAt: this._triggeredAt,
            type: this.constructor.name,
            payload: this.getPayload()
        }
    }

    getPayload() {
        return this._payload;
    }
}

export default Triggerable
