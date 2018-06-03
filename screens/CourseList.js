import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

import * as db from '../db';


class CourseList extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            coursesSnapshot: null,
        }
    }

    componentWillMount() {
        this.registerCourseListener();
    }

    registerCourseListener() {
        db.getAllCourses()
            .onSnapshot((newSnapshot) => {
                this.setState({
                    isLoading: false,
                    coursesSnapshot: newSnapshot
                });
            });
    }

    goToCourse( courseId ) {
        this.props.navigation.navigate( 'Course', {
            courseId: courseId,
        });
    }

    goToAddCourse() {
        this.props.navigation.navigate( 'AddCourse' );
    }

    renderCourses() {
        let courseItems = [];

        this.state.coursesSnapshot.forEach((course) => {

            let courseData = course.data();
            
            courseItems.push(
                <ListItem
                    key={course.id}
                    title={courseData.name}
                    leftIcon={{name:'add'}}
                    onPress={() => this.goToCourse( course.id )} />
            );

        });

        courseItems.push(
            <ListItem
                key={'new-course'}
                title='add Course'
                leftIcon={{name:'star'}}
                onPress={() => this.goToAddCourse()} />
        );

        return courseItems;
    }

    render() {
        if( this.state.isLoading ) {
            return (
                <ActivityIndicator />
            );
        } else {
            return (
                <List>
                    { this.renderCourses() }
                </List>
            );
       }
    }
}

export default withNavigation(CourseList);

