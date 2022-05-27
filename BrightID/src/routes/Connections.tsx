import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import ConnectionsScreen from 'src/components/Connections/ConnectionsScreen';
import ConnectionScreenController from 'src/components/Connections/ConnectionScreenController';
import SearchConnections from 'src/components/Helpers/SearchConnections';
import i18next from 'i18next';
import { headerOptions, AnimatedHeaderTitle, NavHome } from './helpers';

const Stack = createStackNavigator();

const connectionsScreenOptions: StackNavigationOptions = {
  ...headerOptions,
  headerRight: () => <SearchConnections />,
  headerLeft: () => <NavHome />,
  headerTitle: () => (
    <AnimatedHeaderTitle
      text={i18next.t('connections.header.connections', 'Connections')}
    />
  ),
};

const connectionScreenOptions: StackNavigationOptions = {
  ...headerOptions,
  headerTitle: () => (
    <AnimatedHeaderTitle
      text={i18next.t(
        'connectionDetails.header.connectionDetails',
        'Connection details',
      )}
    />
  ),
};

const Connections = () => {
  return (
    <>
      <Stack.Screen
        name="Connections"
        component={ConnectionsScreen}
        options={connectionsScreenOptions}
      />

      <Stack.Screen
        name="Connection"
        component={ConnectionScreenController}
        options={connectionScreenOptions}
      />
    </>
  );
};

export default Connections;
