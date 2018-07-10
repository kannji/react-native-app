import React from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';

import Authentication from './../../Authentication';


class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: null,
        };
    }

    signIn() {
        Authentication.signIn()
            .then( ( user ) => {
                this.props.navigation.navigate( 'App' );
            })
            .catch( ( error ) => {
                this.setState({ error })
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <GoogleSigninButton
                    style={{ width: 212, height: 48 }}
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Auto}
                    onPress={() => this.signIn()}
                />
                {this.state.error && (
                    <Text>
                        {error.toString()} code: {error.code}
                    </Text>
                )}
            </View>
        );
    }
}

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

