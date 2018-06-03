import React from 'react';
import { StyleSheet, TextInput, Text, View} from 'react-native';
import { Header, Icon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import * as db from '../db';


export default class CreateVocable extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            kakikata: '',
            yomikata: '',
            translation: '',
            remark: '',
            example: '',
            isAdding: false
        }
    }

    createVocable() {
        this.setState({
            isAdding: true
        });

        let {navigation} = this.props;

        db.addVocableToSection({
            newVocable: {
                kakikata: this.state.kakikata,
                yomikata: this.state.yomikata,
                translation: this.state.translation,
                remark: this.state.remark,
                example: this.state.example
            },
            bookId: navigation.getParam( 'bookId' ),
            sectionId: navigation.getParam('sectionId')
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
                    onPress={() => this.createVocable()} />
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
                    centerComponent={<Text>{this.props.navigation.getParam('sectionId')} add vocable</Text>} />

                <FormLabel>Way of writing</FormLabel>
                <FormInput
                    onChangeText={(kakikata) => this.setState({kakikata: kakikata})} />

                <FormLabel>Way of reading</FormLabel>
                <FormInput
                    onChangeText={(yomikata) => this.setState({yomikata: yomikata})} />

                <FormLabel>Translation</FormLabel>
                <FormInput
                    onChangeText={(translation) => this.setState({translation: translation})} />
                
                <FormLabel>Remark</FormLabel>
                <FormInput
                    onChangeText={(remark) => this.setState({remark: remark})} />

                <FormLabel>Example</FormLabel>
                <FormInput
                    onChangeText={(example) => this.setState({example: example})} />
                
                { this.getButton() }

            </View>
        );
    }
}


