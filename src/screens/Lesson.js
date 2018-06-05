import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import { ActivityIndicator, View } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';

import * as db from '../db';
import VocableList from './VocableList.js';


class Lesson extends React.PureComponent {

    render() {
        let { courseId, navigation } = this.props;
        let { id, name } = this.props.lesson;

        return (
            <View>

                <Header
                    leftComponent={<Icon name='menu' />}
                    centerComponent={<Text>Lesson: {name}</Text>}
                    rightComponent={
                        <Icon
                            name='add'
                            onPress={() => navigation.navigate( 'AddLesson', { courseId: courseId } )} />
                    } />

                <Text>Vocabulary:</Text>

                <VocableList courseId={courseId} lessonId={id}/>

            </View>
        );
    }
}

Lesson.propTypes = {
    lesson: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
    courseId: PropTypes.string.isRequired,
};

class LessonLoader extends React.PureComponent {
    constructor( props ) {
        super( props );

        this.state = {
            isLoading: true,
            lesson: null
        }
    }
    
    componentWillMount() {
        this.registerLessonListener();
    }

    registerLessonListener() {
        let { courseId, lessonId } = this.props.navigation.state.params;

        db.getLesson( courseId, lessonId ).onSnapshot((newSnapshot) => {
            this.setState({
                isLoading: false,
                lesson: this.createLessonObjectFromSnapshot( newSnapshot )
            })
        });
    }

    createLessonObjectFromSnapshot( snapshot ) {
        let data = snapshot.data();

        return {
            id: snapshot.id,
            name: data.name
        };
    }

    render() {
        if ( this.state.isLoading ) {
            return <ActivityIndicator />
        } else {
            return <Lesson lesson={this.state.lesson} courseId={this.props.navigation.state.params.courseId} />
        }
    }
}

LessonLoader.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                courseId: PropTypes.string.isRequired,
                lessonId: PropTypes.string.isRequired
            })
        })
    })
}

export default withNavigation( LessonLoader );

