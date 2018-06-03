import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Header, Icon, List, ListItem } from 'react-native-elements'

import BookList from './BookList';

export default class Home extends React.Component {
    render() {
        return (
            <View>
                <Header
                    leftComponent={<Icon name='menu' />}
                    centerComponent={<Text>Kannji</Text>}
                    rightComponent={
                        <Icon
                            name='add'
                            onPress={() => this.props.navigation.navigate( 'AddBook' )} />
                    } />

                <BookList />
            </View>
        );
    }
}

