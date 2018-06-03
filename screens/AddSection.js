import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, Text, View} from 'react-native';
import { Header, Icon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import * as db from '../db';

class CreateSection extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isAdding: false
        }
    }

    createSection() {
        this.setState({
            isAdding: true
        });

        db.addSectionToBook({
            newSection: {
                name: this.state.name,
            },
            bookId: this.props.navigation.getParam('bookId')
        }).then(() => {
            this.props.navigation.navigate('Home');
        });
    }

    getButton() {
        if ( this.state.isAdding === false ) {
            return (
                <Button
                    large
                    icon={{name: 'add'}}
                    title='Add'
                    onPress={() => this.createSection()} />
            );
        } else {
            return (
                <Button
                    large
                    title='Adding...' />
            );
        }
    }

    render() {
        return (
            <View>

                <Header
                    leftComponent={<Icon name='menu' />}
                    centerComponent={<Text>{this.props.navigation.getParam('bookId')}Create new Level</Text>} />

                <FormLabel>Name</FormLabel>
                <FormInput
                    onChangeText={(name) => this.setState({name: name})} />

                { this.getButton() }

            </View>
        );
    }
}

CreateSection.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                bookId: PropTypes.string.isRequired
            })
        })
    })
};

export default CreateSection;
