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
            kakikata: '',
            yomikata: '',
            translation: '',
            example: '',
            isAdding: false
        }
    }

    createEntry() {
        this.setState({
            isAdding: true
        });

        let {navigation} = this.props;

        let timestamp = firebase.firestore.FieldValue.serverTimestamp();

        FireStore
            .collection('LearningLists').doc(this.props.navigation.getParam( 'learningListId' )).collection('Levels').doc(this.props.navigation.getParam('learningLevelId')).collection('Entries').add({
                kakikata: this.state.kakikata,
                yomikata: this.state.yomikata,
                translation: this.state.translation,
                example: this.state.example,
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
                    onPress={() => this.createEntry()} />
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

                <FormLabel>Way of writing</FormLabel>
                <FormInput
                    onChangeText={(kakikata) => this.setState({kakikata: kakikata})} />

                <FormLabel>Way of reading</FormLabel>
                <FormInput
                    onChangeText={(yomikata) => this.setState({yomikata: yomikata})} />

                <FormLabel>Translation</FormLabel>
                <FormInput
                    onChangeText={(translation) => this.setState({translation: translation})} />
                
                <FormLabel>Example</FormLabel>
                <FormInput
                    onChangeText={(example) => this.setState({example: example})} />
                
                { this.getButton() }

            </View>
        );
    }
}


