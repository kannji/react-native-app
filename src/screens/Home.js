import React from 'react';
import { Text, View } from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';

import withSideMenu from './SideMenu';
import CourseList from './CourseList';

class Home extends React.Component {
    render() {
        return (
            <View>
                <Header
                    leftComponent={<Icon name='menu' />}
                    centerComponent={<Text>Kannji</Text>}
                    rightComponent={
                        <Icon
                            name='add'
                            onPress={() => this.props.navigation.navigate( 'AddCourse' )} />
                    } />

                <Text>Recent Courses:</Text>

                <CourseList />
            </View>
        );
    }
}

export default withSideMenu( Home );

