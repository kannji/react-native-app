import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from './screens/Home';
import AddBook from './screens/AddBook';
import Book from './screens/Book';
import AddSection from './screens/AddSection';
import Section from './screens/Section';
import AddVocable from './screens/AddVocable';

const NavRoot = createStackNavigator(
    {
        Home: {screen: Home},
        AddBook: {screen: AddBook},
        Book: {screen: Book},
        AddSection: {screen: AddSection},
        Section: {screen: Section},
        AddVocable: {screen: AddVocable},
    },
    {
        initialRoutName: 'Home',
        headerMode: 'none'
    }
);

export default class Kannji extends React.Component {
    render () {
        return <NavRoot />;
    }
}
