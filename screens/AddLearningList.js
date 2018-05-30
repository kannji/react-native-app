import React from 'react';
import { StyleSheet, TextInput, Text, View} from 'react-native';
import { Header, Icon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'

export default class AddLearningList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        }
    }

    createList() {}

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

                <Button
                    large
                    icon={{name: 'add'}}
                    title='Add'
                    onPress={() => this.createList()} />

            </View>
        );
    }
}

