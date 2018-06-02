import React from 'react';
import {ActivityIndicator, Button, ListView, StyleSheet, Text, View} from 'react-native';
import { Header, Icon, List, ListItem } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

import * as db from '../db';


class VocableList extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            learningListLevelsSnapshot: null,
        }
    }

    componentWillMount() {
        this.registerVocabularyListener();
    }

    registerVocabularyListener() {
        let bookId = this.props.learningListId;
        let sectionId = this.props.learningLevelId;

        db.getVocabularyForSection( bookId, sectionId )
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

export default withNavigation(VocableList);

