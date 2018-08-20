import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { base } from '../../js/utils';
const { colors } = base;
class ReText extends Component {
  render() {
    const { children, style, onPress } = this.props;
    return (
      <Text
        {...this.props}
        onPress={onPress && onPress}
        style={StyleSheet.flatten([styles.default, style])}
      >
        {children}
      </Text>
    );
  }
}
ReText.propTypes = {};
const styles = StyleSheet.create({
  default: {
    fontSize: 17,
    color: colors.depGrey,
    fontWeight: '200',
  },
});

export default ReText;
