import React from 'react';
import { StyleSheet, TextInput, Text, View} from 'react-native';
import { Header, Icon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import EventBus from '../events/EventBus';
import CourseCreated from '../events/CourseCreated';
import CoursePersisted from '../events/CoursePersisted';


export default class CreateCourse extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            isAdding: false
        }
    }

    createCourse() {
        this.setState({
            isAdding: true
        });
        
        let createdCourseEvent = new CourseCreated({
            name: this.state.name,
            description: this.state.description
        }, EventBus.generateNewStreamId());

        createdCourseEvent.onReaction( CoursePersisted, ( persistedCourseEvent ) => {
            this.props.navigation.navigate('Home');
        });

        createdCourseEvent.trigger( );
    }

    getButton() {
        if ( this.state.isAdding === false ) {
            return (
                <Button
                    large
                    icon={{name: 'add'}}
                    title='Add'
                    onPress={() => this.createCourse()} />
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
                    centerComponent={<Text>Create new Course</Text>} />

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

