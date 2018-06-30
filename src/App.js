import React from 'react';
import { createStackNavigator } from 'react-navigation';

import './aggregators/allAggregators';

import Home from './screens/Home';
import AddCourse from './screens/AddCourse';
import Course from './screens/Course';
import AddLesson from './screens/AddLesson';
import Lesson from './screens/Lesson';
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
