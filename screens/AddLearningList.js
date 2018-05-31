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
            description: '',
            isAdding: false
        }
    }

    async createList() {
        this.setState({
            isAdding: true
        });

        let timestamp = firebase.firestore.FieldValue.serverTimestamp();

        await FireStore.collection('LearningLists').add({
            name: this.state.name,
            description: this.state.description,
            createdAt: timestamp,
            updatedAt: timestamp
        });

        this.props.navigation.navigate('Home');
    }

    getButton() {
        if ( this.state.isAdding === false ) {
            return (
                <Button
                    large
                    icon={{name: 'add'}}
                    title='Add'
                    onPress={() => this.createList()} />
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
                    centerComponent={<Text>Create new List</Text>} />

                <FormLabel>Name</FormLabel>
                <FormInput
                    onChangeText={(name) => this.setState({name: name})} />

                <FormLabel>Description</FormLabel>
                <FormInput 
                    onChangeText={(description) => this.setState({description: description})} />

                { this.getButton() }

            </View>
        );
    }
}

