import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Header, Icon, List, ListItem } from 'react-native-elements'

import FireStore from '../firestore';

export default class LearningListOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            learningListsSnapshot: null
        }
    }

    componentDidMount() {
        return this.loadLearningLists();
    }

    async loadLearningLists() {
        let learningListsSnapshot = await FireStore.collection('LearningLists').orderBy('updatedAt', 'desc').get();

        console.log(learningListsSnapshot.size);
        this.setState({
            isLoading: false,
            learningListsSnapshot: learningListsSnapshot
        });
    }

    renderLearningLists() {
        let learningListItems = [];

        this.state.learningListsSnapshot.forEach((learningListDocument) => {
            let learningListData = learningListDocument.data();
            learningListItems.push(
                <ListItem
                    key={learningListDocument.id}
                    title={learningListData.name}
                    leftIcon={{name:'add'}}/>
            );
        });

        return learningListItems;
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <Header
                        leftComponent={<Icon name='menu' />}
                        centerComponent={<Text>Kannji</Text>}
                        rightComponent={
                            <Icon
                                name='add'
                                onPress={() => this.props.navigation.navigate( 'AddLearningList' )} />
                        } />
                        <ActivityIndicator/>
                    </View>
            );
        }

        return (
            <View>
                <Header
                    leftComponent={<Icon name='menu' />}
                    centerComponent={<Text>Kannji</Text>}
                    rightComponent={
                        <Icon
                            name='add'
                            onPress={() => this.props.navigation.navigate( 'AddLearningList' )} />
                    } />
                    <List>
                        { this.renderLearningLists() }
                    </List>
                </View>
        );
    }
}

