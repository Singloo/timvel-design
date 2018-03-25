import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import { base } from '../../js/utils';
class ReTouchable extends Component {
  render() {
    const { children, withOutFeedback } = this.props;

    return withOutFeedback ? (
      <TouchableWithoutFeedback
        {...this.props}
        // onPress={this._onPress}
        // onLongPress={this._onLongPress}
      >
        {children}
      </TouchableWithoutFeedback>
    ) : (
      <TouchableOpacity
        {...this.props}
        // onPress={this._onPress}
        // onLongPress={this._onLongPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
}
ReTouchable.propTypes = {};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ReTouchable;
