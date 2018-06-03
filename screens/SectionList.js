import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Button, ListView, StyleSheet, Text, View} from 'react-native';
import { Header, Icon, List, ListItem } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

import * as db from '../db';


class SectionList extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            sections: null,
        }
    }

    componentWillMount() {
        this.registerSectionsListener();
    }

    registerSectionsListener() {
        db.getAllSectionsForBook( this.props.bookId )
            .onSnapshot((newSnapshot) => {
                this.setState({
                    isLoading: false,
                    sections: newSnapshot
                });
            });
    }

    goToSection( bookId, sectionId ) {
        this.props.navigation.navigate( 'Section', {
            bookId: bookId,
            sectionId: sectionId
        });
    }

    goToAddSection( bookId ) {
        this.props.navigation.navigate( 'AddSection', {
            bookId: bookId
        });
    }

    renderSections() {
        let sectionItems = [];

        this.state.sections.forEach((section) => {

            let sectionData = section.data();

            sectionItems.push(
                <ListItem
                    key={section.id}
                    title={sectionData.name}
                    leftIcon={{name:'add'}}
                    onPress={() => this.goToSection( this.props.bookId, section.id )}/>
            );
        });

        sectionItems.push(
            <ListItem
                key={'new-section'}
                title='New Level'
                leftIcon={{name:'star'}}
                onPress={() => this.goToAddSection( this.props.bookId )}/>
        );

        return sectionItems;
    }

    render() {
        if( this.state.isLoading ) {
            return (
                <ActivityIndicator />
            );
        } else {
            return (
                <List>
                    { this.renderSections() }
                </List>
            );
       }
    }
}

SectionList.propTypes = {
    bookId: PropTypes.string.isRequired
};

export default withNavigation(SectionList);
