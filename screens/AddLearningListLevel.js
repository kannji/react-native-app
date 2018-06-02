import React from 'react';
import { StyleSheet, TextInput, Text, View} from 'react-native';
import { Header, Icon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import firebase from '@firebase/app';
import '@firebase/firestore';

import FireStore from '../firestore';

export default class AddLearningList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isAdding: false
        }
    }

    createLevel() {
        this.setState({
            isAdding: true
        });

        let timestamp = firebase.firestore.FieldValue.serverTimestamp();

        FireStore
            .collection('LearningLists').doc(this.props.navigation.getParam( 'learningListId' )).collection('Levels').add({
                name: this.state.name,
                createdAt: timestamp,
                updatedAt: timestamp
            }).then(() => {
                this.props.navigation.navigate('Home');
            });
    }

    getButton() {
        if ( this.state.isAdding === false ) {
            return (
                <Button
                    large
                    icon={{name: 'add'}}
                    title='Add'
                    onPress={() => this.createLevel()} />
            );
        } else {
            return (
                <Button
                    large
                    title='Adding...' />
            );
        }
    }

    render() {
        return (
            <View>

                <Header
                    leftComponent={<Icon name='menu' />}
                    centerComponent={<Text>{this.props.navigation.getParam('learningListId')}Create new Level</Text>} />

                <FormLabel>Name</FormLabel>
                <FormInput
                    onChangeText={(name) => this.setState({name: name})} />

                { this.getButton() }

            </View>
        );
    }
}

