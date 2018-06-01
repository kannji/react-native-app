import React from 'react';
import {ActivityIndicator, Button, ListView, StyleSheet, Text, View} from 'react-native';
import { Header, Icon, List, ListItem } from 'react-native-elements'

import FireStore from '../firestore';


export default class LearningListDetail extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
            isLoading: true,
            learningListSnapshot: null
		}
    }

	componentWillMount() {
        this.addLearningListSnapshotListener();
    }

    addLearningListSnapshotListener() {
        FireStore
            .collection('LearningLists').doc(this.props.navigation.getParam('learningListId', ''))
            .onSnapshot((snapshot) => {
                this.setState({
                    isLoading: false,
                    learningListSnapshot: snapshot
                });
            });
    }

	deleteLearningList() {
    
    }

	render() {
		if (this.state.isLoading) {
			return (
				<View>
					<ActivityIndicator/>
				</View>
			);
		} else {
            let learningListData = this.state.learningListSnapshot.data();

            return (
                <View>

                    <Header
                        leftComponent={<Icon name='menu' />}
                        centerComponent={<Text>{learningListData.name}</Text>}
                        rightComponent={
                            <Icon
                                name='add'
                                onPress={() => this.props.navigation.navigate( 'AddLearningList' )} />
                        } />

                    <Text>{learningListData.description}</Text>

                </View>
            );

    	}
    }
}

