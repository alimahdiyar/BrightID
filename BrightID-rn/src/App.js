// @flow

import * as React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import AppRoutes from './AppRoutes';
import store from './store';

/**
 * Central part of the application
 * react-navigation is used for routing
 * read docs here: https://reactnavigation.org/
 * AppRoutes.js contains all of the Routes
 * Redux / Immutable are used for managing state
 * read docs here: https://facebook.github.io/immutable-js/
 */

type Props = {};

export default class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppRoutes />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 1,
  },
});