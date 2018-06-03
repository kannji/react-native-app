import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

import * as db from '../db';


class BookList extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            booksSnapshot: null,
        }
    }

    componentWillMount() {
        this.registerBookListener();
    }

    registerBookListener() {
        db.getAllBooks()
            .onSnapshot((newSnapshot) => {
                this.setState({
                    isLoading: false,
                    booksSnapshot: newSnapshot
                });
            });
    }

    goToBook( bookId ) {
        console.log(bookId);
        this.props.navigation.navigate( 'Book', {
            bookId: bookId,
        });
    }

    goToAddBook() {
        this.props.navigation.navigate( 'AddBook' );
    }

    renderBooks() {
        let bookItems = [];

        this.state.booksSnapshot.forEach((book) => {

            let bookData = book.data();
            
            bookItems.push(
                <ListItem
                    key={book.id}
                    title={bookData.name}
                    leftIcon={{name:'add'}}
                    onPress={() => this.goToBook( book.id )} />
            );

        });

        bookItems.push(
            <ListItem
                key={'new-book'}
                title='New List'
                leftIcon={{name:'star'}}
                onPress={() => this.goToAddBook()} />
        );

        return bookItems;
    }

    render() {
        if( this.state.isLoading ) {
            return (
                <ActivityIndicator />
            );
        } else {
            return (
                <List>
                    { this.renderBooks() }
                </List>
            );
       }
    }
}

export default withNavigation(BookList);

