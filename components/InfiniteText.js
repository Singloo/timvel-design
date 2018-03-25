import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { base } from '../../js/utils';
import Text from './Text';
class Sample extends Component {
  render() {
    const { text, textStyle, children, style, containerStyle } = this.props;
    return (
      <ScrollView
        style={[styles.wrapper, style]}
        contentContainerStyle={[styles.container, containerStyle]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {children}
        <Text style={[textStyle]}>{text}</Text>
      </ScrollView>
    );
  }
}
Sample.propTypes = {};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
    paddingRight: 40,
  },
});

export default Sample;
