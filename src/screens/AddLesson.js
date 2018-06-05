import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, Text, View} from 'react-native';
import { Header, Icon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import * as db from '../db';

class CreateLesson extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isAdding: false
        }
    }

    createLesson() {
        this.setState({
            isAdding: true
        });

        db.addLessonToCourse({
            newLesson: {
                name: this.state.name,
            },
            courseId: this.props.navigation.getParam('courseId')
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
                    onPress={() => this.createLesson()} />
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
                    centerComponent={<Text>Create new Lesson</Text>} />

                <FormLabel>Name</FormLabel>
                <FormInput
                    onChangeText={(name) => this.setState({name: name})} />

                { this.getButton() }

            </View>
        );
    }
}

CreateLesson.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                courseId: PropTypes.string.isRequired
            })
        })
    })
};

export default CreateLesson;
