import React from 'react';
import { View } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements'

import VocableList from './VocableList.js'


export default class Section extends React.PureComponent {

    render() {
        let { bookId, sectionId } = this.props.navigation.state.params;

        return (
            <View>

                <Header
                    leftComponent={<Icon name='menu' />}
                    centerComponent={<Text>Level: {sectionId}</Text>}
                    rightComponent={
                        <Icon
                            name='add'
                            onPress={() => navigation.navigate( 'AddBook' )} />
                    } />

                <VocableList bookId={bookId} sectionId={sectionId}/>

            </View>
        );
    }
}


