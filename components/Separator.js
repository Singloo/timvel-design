import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import { base } from '../../js/utils';
const { SCREEN_WIDTH } = base;
import LinearGradient from 'react-native-linear-gradient';
class Separator extends Component {
  render() {
    const { style, colors, gradient } = this.props;
    let gradientColors = colors || ['#00bcd4', '#ef9a9a'];
    return (
      <LinearGradient
        style={[{ height: 3 }, style]}
        colors={gradientColors}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      />
    );
  }
}
Separator.propTypes = {};
const styles = StyleSheet.create({});

export default Separator;
