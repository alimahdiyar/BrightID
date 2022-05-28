import React from 'react';
import { setConnectionsSearch, setConnectionsSearchOpen } from 'src/actions';
import { useNavigation } from '@react-navigation/native';
import AnimatedTopSearchBar from './AnimatedTopSearchBar';

/**
 * Search Bar in the Connections Screen
 * TODO: Add functionality for the Ionicons
 * TODO: add search filter in redux actions
 */
const SearchConnections = () => {
  const navigation = useNavigation();

  const handleSort = () => {
    navigation.navigate('SortConnections');
  };

  return (
    <AnimatedTopSearchBar
      sortable={true}
      handleSort={handleSort}
      setSearchValue={setConnectionsSearch}
      setSearchOpen={setConnectionsSearchOpen}
      searchOpenSelector={(state: State) => state.connections.searchOpen}
    />
  );
};

export default SearchConnections;
