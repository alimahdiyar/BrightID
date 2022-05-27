import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { getGroupName } from 'src/utils/groups';
import { fontSize } from 'src/theme/fonts';
import { GroupsScreen } from 'src/components/Groups/GroupsScreen';
import SearchGroups from 'src/components/Helpers/SearchGroups';
import SearchConnections from 'src/components/Helpers/SearchConnections';
import { NewGroupScreen } from 'src/components/Groups/NewGroups/NewGroupScreen';
import { GroupInfoScreen } from 'src/components/Groups/NewGroups/GroupInfoScreen';
import { MembersScreen } from 'src/components/Groups/Members/MembersScreen';
import ConnectionsScreen from 'src/components/Connections/ConnectionsScreen';
import { headerOptions, NavHome, AnimatedHeaderTitle } from './helpers';

const Stack = createStackNavigator();

const groupsOptions: StackNavigationOptions = {
  ...headerOptions,
  headerRight: () => <SearchGroups />,
  headerLeft: () => <NavHome />,
  headerTitle: () => (
    <AnimatedHeaderTitle text={i18next.t('groups.header.groups', 'Groups')} />
  ),
};

const newGroupOptions: StackNavigationOptions = {
  ...headerOptions,
  headerRight: () => <SearchConnections />,
  headerTitle: () => (
    <AnimatedHeaderTitle
      text={i18next.t('groups.header.newGroup', 'New Group')}
    />
  ),
};

const membersScreenOptions: ({ route }) => StackNavigationOptions = ({
  route,
}) => {
  const group = route.params?.group;
  return {
    ...headerOptions,
    title: getGroupName(group),
    headerTitleStyle: {
      fontSize: fontSize[20],
      paddingLeft: 20,
      paddingRight: 30,
    },
  };
};

const Groups = () => {
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen
        name="Groups"
        component={GroupsScreen}
        options={groupsOptions}
      />
      <Stack.Screen
        name="NewGroup"
        component={NewGroupScreen}
        options={newGroupOptions}
      />
      <Stack.Screen
        name="GroupInfo"
        component={GroupInfoScreen}
        options={{
          ...headerOptions,
          title: t('groups.header.newGroup', 'New Group'),
        }}
      />
      <Stack.Screen
        name="Members"
        component={MembersScreen}
        options={membersScreenOptions}
      />
      <Stack.Screen
        name="InviteList"
        component={ConnectionsScreen}
        options={{
          ...headerOptions,
          headerRight: () => <SearchConnections />,
          headerTitle: () => (
            <AnimatedHeaderTitle text={i18next.t('groups.header.inviteList')} />
          ),
        }}
      />
    </>
  );
};

export default Groups;
