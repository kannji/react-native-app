import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements'

export default class App extends React.Component {
    render() {
        return (
            <View>
                <Header>
                    <Icon name='menu' />
                    <Text>Kannji</Text>
                    <Icon name='add' />
                </Header>
        </View>
        );
    }
}

