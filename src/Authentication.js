import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';


const config = {
    scopes: [ 'profile' ],
    webClientId: '246750548148-u2lvcoqu8r6jr7etrnqhj083llciurc1.apps.googleusercontent.com',
    offlineAccess: false,
};

class GoogleAuthenticationWrapper {
    init() {
        return new Promise( async (resolve, reject ) => {
            await GoogleSignin.hasPlayServices({ autoResolve: true });
            await GoogleSignin.configure( config );

            let user = await GoogleSignin.currentUserAsync();

            if ( user ) {
                let userData = await this._authenticateWithBackend( user );
                resolve( userData );
            } else {
                resolve( null );
            }

        });
    }

    getCurrentUser() {
        return this._currentUser;
    }

    getCurrentUserId() {
        return this._currentUserData.user.uid;
    }

    isSignedIn() {
        return !! this._currentUser;
    }

    signIn() {
        return new Promise( async ( resolve, reject ) => {
            let user = await GoogleSignin.signIn();

            let userData = await this._authenticateWithBackend( user );

            resolve( userData );
        });
    }

    signOut() {
        return new Promise( ( resolve, reject ) => {
            GoogleSignin.revokeAccess()
                .then( () => {
                    GoogleSignin.signOut()
                        .then( () => {
                            this._currentUser = null;
                            resolve();
                        })
                        .catch( error => {
                           reject( error );
                        });
                });
        });
    }

    async _authenticateWithBackend( user ) {
        let credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken)

        this._currentUserData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        this._currentUser = user;
    }
}

export default new GoogleAuthenticationWrapper();
