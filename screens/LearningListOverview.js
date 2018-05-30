import React from 'react';
import { Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements'

export default class App extends React.Component {
    render() {
        return (
            <View>
                <Header
                    leftComponent={<Icon name='menu' />}
                    centerComponent={<Text>Kannji</Text>}
                    rightComponent={
                        <Icon
                            name='add'
                            onPress={() => this.props.navigation.navigate( 'AddLearningList' )} />
                    } />
            </View>
        );
    }
}

