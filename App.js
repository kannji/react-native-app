import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LearningListOverview from './screens/LearningListOverview';
import AddLearningList from './screens/AddLearningList';
import LearningListDetail from './screens/LearningListDetail';
import AddLearningListLevel from './screens/AddLearningListLevel';
import LearningLevelDetail from './screens/LearningLevelDetail';
import AddLearningEntry from './screens/AddLearningEntry';

const NavRoot = createStackNavigator(
    {
        Home: {screen: LearningListOverview},
        AddLearningList: {screen: AddLearningList},
        LearningListDetail: {screen: LearningListDetail},
        AddLearningListLevel: {screen: AddLearningListLevel},
        LearningLevelDetail: {screen: LearningLevelDetail},
        AddLearningEntry: {screen: AddLearningEntry},
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
