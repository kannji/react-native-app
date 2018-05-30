import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LearningListOverview from './screens/LearningListOverview'

const NavRoot = createStackNavigator(
    {
        Home: {screen: LearningListOverview},
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
