import React from 'react';
import {ActivityIndicator, Button, ListView, StyleSheet, Text, View} from 'react-native';
import { Header, Icon, List, ListItem } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

import * as db from '../firestore';


class LearningListLevelOverview extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            learningListLevelsSnapshot: null,
        }
    }

    componentWillMount() {
        this.registerSectionListener();
    }

    registerSectionListener() {
        let bookId = this.props.learningListId;

        db.getAllSectionsForBook( bookId )
            .onSnapshot((levelSnapshot) => {
                this.setState({
                    isLoading: false,
                    learningListLevelsSnapshot: levelSnapshot
                });
            });
    }

    renderLearningListLevels() {
        let learningListLevelItems = [];
        let {navigation, learningListId} = this.props;

        this.state.learningListLevelsSnapshot.forEach((learningListLevelDocument) => {
            let learningListLevelData = learningListLevelDocument.data();
            learningListLevelItems.push(
                <ListItem
                    key={learningListLevelDocument.id}
                    title={learningListLevelData.name}
                    leftIcon={{name:'add'}}
                    onPress={() => navigation.navigate( 'LearningLevelDetail', { learningListId: this.props.learningListId, learningLevelId: learningListLevelDocument.id })}/>
            );
        });

        learningListLevelItems.push(
            <ListItem
                key={'new-level'}
                title='New Level'
                leftIcon={{name:'star'}}
                onPress={() => navigation.navigate( 'AddLearningListLevel', {
                    learningListId: learningListId
                })}/>
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

export default withNavigation(LearningListLevelOverview);
