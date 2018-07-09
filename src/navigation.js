import { createStackNavigator } from 'react-navigation';

import Signin from './screens/signin/Signin';
import Home from './screens/Home';
import AddCourse from './screens/AddCourse';
import Course from './screens/Course';
import AddLesson from './screens/AddLesson';
import Lesson from './screens/Lesson';
import AddVocable from './screens/AddVocable';

export default NavRoot = createStackNavigator(
    {
        Signin: {screen: Signin},
        Home: {screen: Home},
        AddCourse: {screen: AddCourse},
        Course: {screen: Course},
        AddLesson: {screen: AddLesson},
        Lesson: {screen: Lesson},
        AddVocable: {screen: AddVocable},
    },
    {
        initialRoutName: 'Signin',
        headerMode: 'none'
    }
);
