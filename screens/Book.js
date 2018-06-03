import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import { ActivityIndicator, View } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';

import * as db from '../db';
import SectionList from './SectionList.js';


class Book extends React.PureComponent {

    render() {
        let { id, name, description } = this.props.book;

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

Book.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })
};

class BookLoader extends React.PureComponent {
    constructor( props ) {
        super( props );

        this.state = {
            isLoading: true,
            book: null
        }
    }
    
    componentWillMount() {
        this.registerBookListener();
    }

    registerBookListener() {
        db.getBook( this.props.navigation.state.params.bookId ).onSnapshot((newSnapshot) => {
            this.setState({
                isLoading: false,
                book: this.createBookObjectFromSnapshot( newSnapshot )
            })
        });
    }

    createBookObjectFromSnapshot( snapshot ) {
        let data = snapshot.data();

        return {
            id: snapshot.id,
            name: data.name,
            description: data.description
        };
    }

    render() {
        if ( this.state.isLoading ) {
            return <ActivityIndicator />
        } else {
            return <Book book={this.state.book} />
        }
    }
}

BookLoader.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                bookId: PropTypes.string.isRequired
            })
        })
    })
}

export default withNavigation( BookLoader );
