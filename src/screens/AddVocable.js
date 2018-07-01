import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, Text, View} from 'react-native';
import { Header, Icon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import EventBus from '../events/EventBus';
import VocableCreated from '../events/VocableCreated';
import VocablePersisted from '../events/VocablePersisted';


class CreateVocable extends React.PureComponent {

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

        let { navigation } = this.props;

        let createdVocableEvent = new VocableCreated({
            kakikata: this.state.kakikata,
            yomikata: this.state.yomikata,
            translation: this.state.translation,
            remark: this.state.remark,
            example: this.state.example
        }, navigation.getParam( 'courseId' ), navigation.getParam('lessonId'));

        createdVocableEvent.onReaction( VocablePersisted, ( persistedVocableEvent ) => {
            this.props.navigation.navigate('Home');
        });

        createdVocableEvent.trigger( );
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
                    centerComponent={<Text>Add new Vocable</Text>} />

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

CreateVocable.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                courseId: PropTypes.string.isRequired,
                lessonId: PropTypes.string.isRequired
            })
        })
    })
};

export default CreateVocable;
