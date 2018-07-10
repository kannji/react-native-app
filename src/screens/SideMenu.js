import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import SideMenu from 'react-native-side-menu';
import { withNavigation } from 'react-navigation';

import Authentication from './../Authentication';


class _Menu extends React.Component {
    signOut() {
        Authentication.signOut()
            .then( () => {
                this.props.navigation.navigate( 'Auth' );
            })
            .catch( error => {
                console.log( error );
            });
    }

    render() {
        return (
            <View>
                <Button title="Logout" onPress={() => this.signOut()} />
            </View>
        );
    }
}

const Menu = withNavigation(_Menu);

export default function withSideMenu( WrappedComponent ) {
    return class extends React.Component {
        render() {
            return (
                <SideMenu menu={<Menu />}>
                    <WrappedComponent {...this.props} />
                </SideMenu>
            );
        }
    }
}
