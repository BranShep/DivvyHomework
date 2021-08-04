import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableHighlight,
  PlatformColor,
} from 'react-native';
import {SearchBar, Icon} from 'react-native-elements';
import {useScrollToTop} from '@react-navigation/native';
import _ from 'lodash';
import moment from 'moment';

import businessList from '../data.json';

const setTrending = (data) => {
  let revenue = data;
  revenue = revenue.sort((a, b) => moment(a.date) - moment(b.date));

  if (revenue[revenue.length - 1].value > revenue[revenue.length - 2].value) {
    return true;
  }

  return false;
};

const Item = (props) => {
  return (
    <TouchableHighlight
      underlayColor={PlatformColor('secondarySystemBackground')}
      onPress={() => props.navigation.navigate('Profile', {...props.item})}>
      <View style={styles.item}>
        <View>
          <Text style={styles.title}>{props.item.name}</Text>
          <Text style={{color: PlatformColor('secondaryLabel')}}>
            {props.item.location.city}, {props.item.location.country}
          </Text>
        </View>
        {setTrending(props.item.revenue) ? (
          <Icon name="trending-up" type="material" color="green" />
        ) : (
          <Icon name="trending-down" type="material" color="red" />
        )}
      </View>
    </TouchableHighlight>
  );
};

const Businesses = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  const ref = React.useRef(null);

  useScrollToTop(
    React.useRef({
      scrollToTop: () => ref.current?.scrollToOffset({offset: -1000}),
    }),
  );

  useEffect(() => {
    setFilteredBusinesses(businessList);
  }, []);

  const searchBusinesses = (text) => {
    setSearch(text);

    const businesses = _.filter(businessList, (o) => {
      const name = o.name.toLowerCase().trim();
      const city = o.location.city.toLowerCase().trim();
      const searchText = text.toLowerCase().trim();

      return name.includes(searchText) || city.includes(searchText);
    });

    setFilteredBusinesses(businesses);
  };

  const renderItem = ({item}) => {
    return <Item item={item} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search name or city"
        onChangeText={searchBusinesses}
        value={search}
        platform="ios"
        containerStyle={{
          backgroundColor: PlatformColor('systemBackground'),
          paddingLeft: 8,
          paddingRight: 8,
          borderBottomWidth: 0.4,
          borderColor: PlatformColor('separator'),
        }}
        inputStyle={{height: 40, color: PlatformColor('label')}}
        inputContainerStyle={{
          height: 34,
          backgroundColor: PlatformColor('secondarySystemBackground'),
        }}
      />
      <FlatList
        data={_.sortBy(filteredBusinesses, 'name')}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        keyboardShouldPersistTaps={'handled'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PlatformColor('systemBackground'),
  },
  list: {
    padding: 0,
    backgroundColor: PlatformColor('systemBackground'),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.4,
    borderColor: PlatformColor('separator'),
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: PlatformColor('label'),
  },
});

export default Businesses;
