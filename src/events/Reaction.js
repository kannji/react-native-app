import Triggerable from './Triggerable';


class Reaction extends Triggerable {
    constructor( payload, streamId ) {
        if( !streamId ) {
            console.log( streamId );
            throw 'You need to provide a streamId!';
        }
        super( payload );
        this._streamId = streamId;
    }
}

export default Reaction;
