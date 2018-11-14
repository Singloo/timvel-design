import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { base } from '../../js/utils';
const { Styles } = base;
class Sample extends Component {
  componentWillMount() {}
  componentDidMount() {}

  render() {
    return <View style={styles.container} />;
  }
}
Sample.propTypes = {};
const styles = StyleSheet.create({});

export default Sample;
