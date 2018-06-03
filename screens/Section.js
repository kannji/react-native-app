import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import { ActivityIndicator, View } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';

import * as db from '../db';
import VocableList from './VocableList.js';


class Section extends React.PureComponent {

    render() {
        let { bookId, navigation } = this.props;
        let { id, name } = this.props.section;

        return (
            <View>

                <Header
                    leftComponent={<Icon name='menu' />}
                    centerComponent={<Text>List: {name}</Text>}
                    rightComponent={
                        <Icon
                            name='add'
                            onPress={() => navigation.navigate( 'AddSection', { bookId: bookId } )} />
                    } />

                <VocableList bookId={bookId} sectionId={id}/>

            </View>
        );
    }
}

Section.propTypes = {
    section: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
    bookId: PropTypes.string.isRequired,
};

class SectionLoader extends React.PureComponent {
    constructor( props ) {
        super( props );

        this.state = {
            isLoading: true,
            section: null
        }
    }
    
    componentWillMount() {
        this.registerSectionListener();
    }

    registerSectionListener() {
        let { bookId, sectionId } = this.props.navigation.state.params;

        db.getSection( bookId, sectionId ).onSnapshot((newSnapshot) => {
            this.setState({
                isLoading: false,
                section: this.createSectionObjectFromSnapshot( newSnapshot )
            })
        });
    }

    createSectionObjectFromSnapshot( snapshot ) {
        let data = snapshot.data();

        return {
            id: snapshot.id,
            name: data.name
        };
    }

    render() {
        if ( this.state.isLoading ) {
            return <ActivityIndicator />
        } else {
            return <Section section={this.state.section} bookId={this.props.navigation.state.params.bookId} />
        }
    }
}

SectionLoader.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                bookId: PropTypes.string.isRequired,
                sectionId: PropTypes.string.isRequired
            })
        })
    })
}

export default withNavigation( SectionLoader );

