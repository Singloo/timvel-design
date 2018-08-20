import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import Image from './Image';
import { base } from '../../js/utils';
import Assets from '../Assets';
const { colors, randomItem, colorSets } = base;
class WeatherInfo extends Component {
  constructor(props) {
    super(props);
    this.backgroundColor = randomItem(colorSets);
  }
  componentWillMount() {}
  render() {
    const { weather, temperature, style } = this.props;
    return (
      <View
        style={[styles.container, { borderColor: this.backgroundColor }, style]}
      >
        <Text style={styles.text}>{temperature + '℃'}</Text>
        <Image source={Assets[weather].source} resizeMode={'contain'} />
      </View>
    );
  }
}
WeatherInfo.propTypes = {};
const styles = StyleSheet.create({
  container: {
    // backgroundColor: backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRightWidth: 4,
  },
  text: {
    color: colors.white,
    marginRight: 5,
  },
});

export default WeatherInfo;
