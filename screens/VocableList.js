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
        let courseId = this.props.courseId;
        let lessonId = this.props.lessonId;

        db.getVocabularyForLesson( courseId, lessonId )
            .onSnapshot((newSnapshot) => {
                this.setState({
                    isLoading: false,
                    vocabulary: newSnapshot
                });
            });
    }

    goToAddVocable( courseId, lessonId ) {
        this.props.navigation.navigate( 'AddVocable', {
            courseId: courseId,
            lessonId: lessonId
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
                onPress={() => this.goToAddVocable( this.props.courseId, this.props.lessonId )}/>
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
    courseId: PropTypes.string.isRequired,
    lessonId: PropTypes.string.isRequired
};

export default withNavigation(VocableList);

