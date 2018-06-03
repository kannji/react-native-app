import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

import * as db from '../db';


class VocableList extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            vocabulary: null,
        }
    }

    componentWillMount() {
        this.registerVocabularyListener();
    }

    registerVocabularyListener() {
        let bookId = this.props.bookId;
        let sectionId = this.props.sectionId;

        db.getVocabularyForSection( bookId, sectionId )
            .onSnapshot((newSnapshot) => {
                this.setState({
                    isLoading: false,
                    vocabulary: newSnapshot
                });
            });
    }

    goToAddVocable( bookId, sectionId ) {
        this.props.navigation.navigate( 'AddVocable', {
            bookId: bookId,
            sectionId: sectionId
        });
    }

    renderVocabulary() {
        let vocabularyItems = [];

        this.state.vocabulary.forEach((vocable) => {

            let vocableData = vocable.data();

            vocabularyItems.push(
                <ListItem
                    key={vocable.id}
                    title={vocableData.kakikata}
                    subtitle={vocableData.translation}
                    leftIcon={{name:'edit'}} />
            );
        });

        vocabularyItems.push( 
            <ListItem
                key={'new-vocable'}
                title='New Vocable'
                leftIcon={{name:'star'}}
                onPress={() => this.goToAddVocable( this.props.bookId, this.props.sectionId )}/>
        );

        return vocabularyItems;
    }

    render() {
        if( this.state.isLoading ) {
            return (
                <ActivityIndicator />
            );
        } else {
            return (
                <List>
                    { this.renderVocabulary() }
                </List>
            );
        }
    }
}

VocableList.propTypes = {
    bookId: PropTypes.string.isRequired,
    sectionId: PropTypes.string.isRequired
};

export default withNavigation(VocableList);

