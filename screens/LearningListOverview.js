import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Header, Icon, List, ListItem } from 'react-native-elements'

import * as db from '../db';


export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            learningListsSnapshot: null
        }
    }

    componentWillMount() {
        this.registerBooksListener();
    }

    registerBooksListener() {
        db.getAllBooks().orderBy('updatedAt', 'desc')
            .onSnapshot((snapshot) => {
                this.setState({
                    isLoading: false,
                    learningListsSnapshot: snapshot
                });
            });
    }

    navigateToLearningListDetail(learningListDocument) {
        let learningListData = learningListDocument.data();

        this.props.navigation.navigate('LearningListDetail', {
            id: learningListDocument.id,
            name: learningListData.name,
            description: learningListData.description
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
                    onPress={() => this.navigateToLearningListDetail(learningListDocument)}/>
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

