import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LearningListOverview from './screens/LearningListOverview'
import AddLearningList from './screens/AddLearningList'
import LearningListDetail from './screens/LearningListDetail'

const NavRoot = createStackNavigator(
    {
        Home: {screen: LearningListOverview},
        AddLearningList: {screen: AddLearningList},
        LearningListDetail: {screen: LearningListDetail},
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
