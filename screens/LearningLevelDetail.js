import React from 'react';
import {ActivityIndicator, Button, ListView, StyleSheet, Text, View} from 'react-native';
import { Header, Icon, List, ListItem } from 'react-native-elements'

import FireStore from '../db';
import VocableList from './VocableList.js'


export default class Section extends React.PureComponent {

    render() {
        let {navigation} = this.props;

        let learningListId = navigation.getParam( 'learningListId' );
        let learningLevelId = navigation.getParam( 'learningLevelId' );

        return (
            <View>

                <Header
                    leftComponent={<Icon name='menu' />}
                    centerComponent={<Text>Level: {learningLevelId}</Text>}
                    rightComponent={
                        <Icon
                            name='add'
                            onPress={() => navigation.navigate( 'AddBook' )} />
                    } />

                <VocableList learningListId={learningListId} learningLevelId={learningLevelId}/>
            </View>
        );
    }
}


