import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from './screens/Home';
import AddBook from './screens/AddBook';
import LearningListDetail from './screens/LearningListDetail';
import AddSection from './screens/AddSection';
import LearningLevelDetail from './screens/LearningLevelDetail';
import AddVocable from './screens/AddVocable';

const NavRoot = createStackNavigator(
    {
        Home: {screen: Home},
        AddBook: {screen: AddBook},
        LearningListDetail: {screen: LearningListDetail},
        AddSection: {screen: AddSection},
        LearningLevelDetail: {screen: LearningLevelDetail},
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
