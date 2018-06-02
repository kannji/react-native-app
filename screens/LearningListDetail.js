import React from 'react';
import {ActivityIndicator, Button, ListView, StyleSheet, Text, View} from 'react-native';
import { Header, Icon, List, ListItem } from 'react-native-elements'

import FireStore from '../db';
import SectionList from './SectionList.js'


export default class Book extends React.PureComponent {

    render() {
        let {navigation} = this.props;

        let id = navigation.getParam( 'id' );
        let name = navigation.getParam( 'name' );
        let description = navigation.getParam( 'description' );

        return (
            <View>

                <Header
                    leftComponent={<Icon name='menu' />}
                    centerComponent={<Text>List: {name}</Text>}
                    rightComponent={
                        <Icon
                            name='add'
                            onPress={() => navigation.navigate( 'AddLearningList' )} />
                    } />

                <Text>{description}</Text>

                <SectionList learningListId={id} />
            </View>
        );
    }
}

