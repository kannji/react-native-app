import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from './screens/Home';
import AddCourse from './screens/AddBook';
import Course from './screens/Book';
import AddLesson from './screens/AddSection';
import Lesson from './screens/Section';
import AddVocable from './screens/AddVocable';

const NavRoot = createStackNavigator(
    {
        Home: {screen: Home},
        AddCourse: {screen: AddCourse},
        Course: {screen: Course},
        AddLesson: {screen: AddLesson},
        Lesson: {screen: Lesson},
        AddVocable: {screen: AddVocable},
    },
    {
        initialRoutName: 'Home',
        headerMode: 'none'
    }
);

export default class Kannji extends React.Component {
    render () {
        return <NavRoot />;
    }
}
