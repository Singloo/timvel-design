import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { base } from '../../js/utils';
class ReText extends Component {
  render() {
    const { children, style } = this.props;
    return (
      <Text {...this.props} style={[styles.default, style]}>
        {children}
      </Text>
    );
  }
}
ReText.propTypes = {};
const styles = StyleSheet.create({
  default: {
    fontSize: 17,
    color: base.colors.depGrey,
  },
});

export default ReText;
