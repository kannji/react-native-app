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

    componentWillMount() {
        this.addLearningListsSnapshotListener();
    }

    addLearningListsSnapshotListener() {
        FireStore
            .collection('LearningLists').orderBy('updatedAt', 'desc')
            .onSnapshot((snapshot) => {
                this.setState({
                    isLoading: false,
                    learningListsSnapshot: snapshot
                });
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
                    leftIcon={{name:'add'}}
                    onPress={() => this.props.navigation.navigate('LearningListDetail', {learningListId: learningListDocument.id})}/>
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

