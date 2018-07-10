import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import InitAuth from './screens/auth/InitAuth';
import Signin from './screens/auth/Signin';

import Home from './screens/Home';
import AddCourse from './screens/AddCourse';
import Course from './screens/Course';
import AddLesson from './screens/AddLesson';
import Lesson from './screens/Lesson';
import AddVocable from './screens/AddVocable';

const AppStack = createStackNavigator({
    Home: {screen: Home},
    AddCourse: {screen: AddCourse},
    Course: {screen: Course},
    AddLesson: {screen: AddLesson},
    Lesson: {screen: Lesson},
    AddVocable: {screen: AddVocable},
},{
    initialRoutName: 'Home',
    headerMode: 'none'
});

const AuthStack = createStackNavigator({
    Signin: {screen: Signin},
},{
    initialRoutName: 'Signin',
    headerMode: 'none'
});

export default createSwitchNavigator({
    InitAuth: InitAuth,
    App: AppStack,
    Auth: AuthStack
}, {
    initialRouteName: 'InitAuth'
});

