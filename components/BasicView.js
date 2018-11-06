import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import { base } from '../../js/utils';
import Loading from './Loading';
import ErrorPage from './ErrorPage';
class Sample extends Component {
  render() {
    const { isLoading, isError, onPressError, style, children } = this.props;
    return (
      <View style={[styles.wrapper, style]}>
        {children}
        {isLoading && <Loading />}
        {isError && <ErrorPage onPressError={onPressError} />}
      </View>
    );
  }
}
Sample.propTypes = {};
Sample.defaultProps = {
  isLoading: false,
  isError: false,
  onPressError: () => {},
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default Sample;
