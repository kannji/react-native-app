import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { View, ActivityIndicator } from 'react-native';

import Authentication from './../../Authentication';


class InitAuth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };

        Authentication.init()
            .then( ( user ) => {
                this.props.navigation.navigate( user ? 'App' : 'Signin' );
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        );
    }
}

InitAuth.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    })
}

export default InitAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

