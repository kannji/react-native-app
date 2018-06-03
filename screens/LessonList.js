import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Button, ListView, StyleSheet, Text, View} from 'react-native';
import { Header, Icon, List, ListItem } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

import * as db from '../db';


class LessonList extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            lessons: null,
        }
    }

    componentWillMount() {
        this.registerLessonsListener();
    }

    registerLessonsListener() {
        db.getAllLessonsForCourse( this.props.courseId )
            .onSnapshot((newSnapshot) => {
                this.setState({
                    isLoading: false,
                    lessons: newSnapshot
                });
            });
    }

    goToLesson( courseId, lessonId ) {
        this.props.navigation.navigate( 'Lesson', {
            courseId: courseId,
            lessonId: lessonId
        });
    }

    goToAddLesson( courseId ) {
        this.props.navigation.navigate( 'AddLesson', {
            courseId: courseId
        });
    }

    renderLessons() {
        let lessonItems = [];

        this.state.lessons.forEach((lesson) => {

            let lessonData = lesson.data();

            lessonItems.push(
                <ListItem
                    key={lesson.id}
                    title={lessonData.name}
                    leftIcon={{name:'add'}}
                    onPress={() => this.goToLesson( this.props.courseId, lesson.id )}/>
            );
        });

        lessonItems.push(
            <ListItem
                key={'new-lesson'}
                title='add Lesson'
                leftIcon={{name:'star'}}
                onPress={() => this.goToAddLesson( this.props.courseId )}/>
        );

        return lessonItems;
    }

    render() {
        if( this.state.isLoading ) {
            return (
                <ActivityIndicator />
            );
        } else {
            return (
                <List>
                    { this.renderLessons() }
                </List>
            );
       }
    }
}

LessonList.propTypes = {
    courseId: PropTypes.string.isRequired
};

export default withNavigation(LessonList);
