import React from 'react';
import { View } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements'

import FireStore from '../db';
import SectionList from './SectionList.js'


export default class Book extends React.PureComponent {

    render() {
        let {navigation} = this.props;

        let id = navigation.getParam( 'bookId' );
        let name = navigation.getParam( 'name' );
        let description = navigation.getParam( 'description' );

        return (
            <View>

                <Header
                    leftComponent={<Icon name='menu' />}
                    centerComponent={<Text>List: {name}</Text>}
                    rightComponent={
                        <Icon
                            name='add'
                            onPress={() => navigation.navigate( 'AddBook' )} />
                    } />

                <Text>{description}</Text>

                <SectionList bookId={id} />

            </View>
        );
    }
}

