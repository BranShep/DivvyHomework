import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  View,
  PlatformColor,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import moment from 'moment';

import Chart from '../components/Chart.js';

const BusinessDetail = (props) => {
  const {name, location} = props.route.params;
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);
  const [dateRange, setDateRange] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let x = [];
    let y = [];

    let revenue = props.route.params.revenue;

    revenue = revenue.sort((a, b) => moment(a.date) - moment(b.date));

    for (const item of revenue) {
      x.push(moment(item.date).format('MMM'));
      y.push(item.value / 1000000);
    }

    setDateRange(
      `${moment(revenue[0].date).format('MMM yyyy')} - ${moment(
        revenue[revenue.length - 1].date,
      ).format('MMM yyyy')}`,
    );

    setXValues(x);
    setYValues(y);
    setLoading(false);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.companyInfo}>
            <Icon
              name="place"
              type="material"
              color={PlatformColor('label')}
              style={{marginRight: 15}}
            />
            <View>
              <Text style={styles.addressInfo}>{location.address}</Text>
              <Text style={styles.addressInfo}>
                {location.city}, {location.country}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="bar-chart"
              type="material"
              color={PlatformColor('label')}
              style={{marginRight: 10}}
            />
            <Text style={styles.revenueTitle}>Revenue</Text>
            <Text style={styles.dateRange}>({dateRange})</Text>
          </View>

          <Chart
            xValues={xValues}
            yValues={yValues}
            style={{width: '100%', height: 300}}
          />
        </View>
      )}
    </ScrollView>
  );
};

BusinessDetail.propTypes = {
  xValues: PropTypes.string,
  yValues: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: PlatformColor('systemBackground'),
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    width: '100%',
    backgroundColor: PlatformColor('secondarySystemBackground'),
    borderRadius: 10,
    padding: 15,
  },
  revenueTitle: {
    color: PlatformColor('label'),
    marginBottom: 8,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  dateRange: {
    color: PlatformColor('secondaryLabel'),
    marginBottom: 15,
    fontSize: 18,
  },
  addressInfo: {
    color: PlatformColor('label'),
    fontSize: 18,
  },
});

export default BusinessDetail;
