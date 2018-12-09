// @flow

import * as React from 'react';
import { AsyncStorage, FlatList, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-spinkit';
import HeaderButtons, {
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchConnections from './SearchConnections';
import ConnectionCard from './ConnectionCard';
import { getConnections } from '../../actions/getConnections';
import { createNewConnection } from './createNewConnection';
import emitter from '../../emitter';
import BottomNav from '../BottomNav';

/**
 * Connection screen of BrightID
 * Displays a search input and list of Connection Cards
 */

// header Button
const MaterialHeaderButton = (passMeFurther) => (
  // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
  // and it is important to pass those props to `HeaderButton`
  // then you may add some information like icon size or color (if you use icons)
  <HeaderButton
    {...passMeFurther}
    IconComponent={Material}
    iconSize={32}
    color="#fff"
  />
);

type Props = {
  connections: Array<{
    nameornym: string,
    id: number,
  }>,
  searchParam: string,
  dispatch: (() => Promise<null>) => Promise<null>,
};

type State = {
  loading: boolean,
};

class ConnectionsScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Connections',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
        <Item
          title="options"
          iconName="dots-horizontal"
          onPress={createNewConnection(navigation)}
        />
      </HeaderButtons>
    ),
  });

  state = {
    loading: true,
  };

  componentDidMount() {
    this.getConnections();
    emitter.on('refreshConnections', this.getConnections);
    emitter.on('removeConnection', this.removeConnection);
  }

  componentWillUnmount() {
    emitter.off('refreshConnections', this.getConnections);
    emitter.off('removeConnection', this.removeConnection);
  }

  getConnections = async () => {
    const { dispatch } = this.props;
    await dispatch(getConnections());
    this.setState({
      loading: false,
    });
  };

  removeConnection = async (publicKey) => {
    try {
      // remove connection from async storage
      await AsyncStorage.removeItem(JSON.stringify(publicKey));
      emitter.emit('refreshConnections', {});
    } catch (err) {
      console.log(err);
    }
  };

  filterConnections = () => {
    const { connections, searchParam } = this.props;
    return connections.filter((item) =>
      `${item.nameornym}`
        .toLowerCase()
        .replace(/\s/g, '')
        .includes(searchParam.toLowerCase().replace(/\s/g, '')),
    );
  };

  renderConnection = ({ item }) => <ConnectionCard {...item} />;

  renderListOrSpinner = () => {
    const { connections } = this.props;
    const { loading } = this.state;
    if (loading) {
      return (
        <Spinner
          style={styles.spinner}
          isVisible={true}
          size={47}
          type="WanderingCubes"
          color="#4990e2"
        />
      );
    } else if (connections.length > 0) {
      return (
        <FlatList
          style={styles.connectionsContainer}
          data={this.filterConnections()}
          keyExtractor={({ publicKey }, index) =>
            JSON.stringify(publicKey) + index
          }
          renderItem={this.renderConnection}
        />
      );
    } else {
      return (
        <View>
          <Text style={styles.emptyText}>No connections</Text>
        </View>
      );
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <SearchConnections navigation={this.props.navigation} />
          <View style={styles.mainContainer}>{this.renderListOrSpinner()}</View>
        </View>
        <BottomNav navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 8,
  },
  connectionsContainer: {
    flex: 1,
  },
  moreIcon: {
    marginRight: 16,
  },
  emptyText: {
    fontFamily: 'ApexNew-Book',
    fontSize: 20,
  },
});

export default connect((state) => state.main)(ConnectionsScreen);
