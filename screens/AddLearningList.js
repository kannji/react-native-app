import React from 'react';
import { StyleSheet, TextInput, Text, View} from 'react-native';
import { Header, Icon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import FireStore from '../firestore';

export default class AddLearningList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            adding: false
        }
    }

    async createList() {
        this.setState({
            adding: true
        });

        await FireStore.collection('LearningLists').add({
            name: this.state.name,
            description: this.state.description
        });

        this.props.navigation.navigate('Home');
    }

    getButton() {
        if ( this.state.adding === false ) {
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

