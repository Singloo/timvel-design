import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Image from './Image';
import { base } from '../../js/utils';
const { colors } = base;
import Assets from '../Assets';
class Sample extends Component {
  render() {
    const { style, imageStyle, textStyle, price } = this.props;
    return (
      <View style={[styles.wrapper, style]}>
        <Image
          source={Assets.coin.source}
          style={[{ width: 25, height: 25 }, imageStyle]}
        />
        <Text style={[styles.text, textStyle]}>{price}</Text>
      </View>
    );
  }
}
Sample.propTypes = {};
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: colors.deepOrange,
    fontWeight: '500',
    marginLeft: 5,
  },
});

export default Sample;
