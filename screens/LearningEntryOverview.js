import React from 'react';
import {ActivityIndicator, Button, ListView, StyleSheet, Text, View} from 'react-native';
import { Header, Icon, List, ListItem } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

import FireStore from '../firestore';


class LearningListLevelOverview extends React.PureComponent {

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
            .collection('LearningLists').doc(this.props.learningListId).collection('Levels').doc( this.props.learningLevelId ).collection('Entries')
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
                    title={learningListLevelData.kakikata}
                    subtitle={learningListLevelData.translation}
                    leftIcon={{name:'edit'}} />
            );
        });

        let addLearningListLevel = 
            <ListItem
                key={'new-entry'}
                title='New Entry'
                leftIcon={{name:'star'}}
                onPress={() => this.props.navigation.navigate( 'AddLearningEntry', {
                    learningListId: this.props.learningListId,
                    learningLevelId: this.props.learningLevelId
                })}/>;

        learningListLevelItems.push(addLearningListLevel);

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

export default withNavigation(LearningListLevelOverview);

