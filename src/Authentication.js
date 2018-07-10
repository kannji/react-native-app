import { GoogleSignin } from 'react-native-google-signin';


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

            GoogleSignin.currentUserAsync()
                .then( user => {
                    resolve( user );
                })
                .catch( error => {
                    reject( error );
                } );
        });
    }

    getCurrentUser() {
        return this._currentUser;
    }

    isSignedIn() {
        return !! this._currentUser;
    }

    signIn() {
        return new Promise( ( resolve, reject ) => {
            GoogleSignin.signIn()
                .then( user => {
                    this._currentUser = user;
                    resolve( user );
                })
                .catch( error => {
                   reject( error );
                });
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
}

export default new GoogleAuthenticationWrapper();
