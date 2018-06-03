import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import { ActivityIndicator, View } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';

import * as db from '../db';
import LessonList from './LessonList.js';


class Course extends React.PureComponent {

    render() {
        let { id, name, description } = this.props.course;

        return (
            <View>

                <Header
                    leftComponent={<Icon name='menu' />}
                    centerComponent={<Text>List: {name}</Text>}
                    rightComponent={
                        <Icon
                            name='add'
                            onPress={() => navigation.navigate( 'AddCourse' )} />
                    } />

                <Text>{description}</Text>

                <LessonList courseId={id} />

            </View>
        );
    }
}

Course.propTypes = {
    course: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })
};

class CourseLoader extends React.PureComponent {
    constructor( props ) {
        super( props );

        this.state = {
            isLoading: true,
            course: null
        }
    }
    
    componentWillMount() {
        this.registerCourseListener();
    }

    registerCourseListener() {
        db.getCourse( this.props.navigation.state.params.courseId ).onSnapshot((newSnapshot) => {
            this.setState({
                isLoading: false,
                course: this.createCourseObjectFromSnapshot( newSnapshot )
            })
        });
    }

    createCourseObjectFromSnapshot( snapshot ) {
        let data = snapshot.data();

        return {
            id: snapshot.id,
            name: data.name,
            description: data.description
        };
    }

    render() {
        if ( this.state.isLoading ) {
            return <ActivityIndicator />
        } else {
            return <Course course={this.state.course} />
        }
    }
}

CourseLoader.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                courseId: PropTypes.string.isRequired
            })
        })
    })
}

export default withNavigation( CourseLoader );
