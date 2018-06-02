import React from 'react';
import {ActivityIndicator, Button, ListView, StyleSheet, Text, View} from 'react-native';
import { Header, Icon, List, ListItem } from 'react-native-elements'

import FireStore from '../firestore';


export default class ListLevels extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            learningListLevelsSnapshot: null,
        }
    }

    componentWillMount() {
        this.addLearningListLevelsSnapshotListener();
    }

    addLearningListLevelsSnapshotListener() {
        FireStore
            .collection('LearningLists').doc().collection('Levels')
            .onSnapshot((levelSnapshot) => {
                this.setState({
                    isLoading: false,
                    learningListLevelsSnapshot: levelSnapshot
                });
            });
    }

    renderLearningListLevels() {
        let learningListLevelItems = [];

        this.state.learningListLevelsSnapshot.forEach((learningListLevelDocument) => {
            let learningListLevelData = learningListLevelDocument.data();
            learningListLevelItems.push(
                <ListItem
                    key={learningListLevelDocument.id}
                    title={learningListLevelData.name}
                    leftIcon={{name:'add'}} />
            );
        });

        learningListLevelItems.push(
            <ListItem
                key={'new-level'}
                title='New Level'
                leftIcon={{name:'star'}} />
        );

        return learningListLevelItems;
    }

    render() {
        if( this.state.isLoading ) {
            return (
                <ActivityIndicator />
            );
        } else {
            return (
                <List>
                    { this.renderLearningListLevels() }
                </List>
            );
       }
    }
}


