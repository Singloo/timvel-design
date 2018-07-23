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
    const { children, withoutFeedback } = this.props;

    return withoutFeedback ? (
      <TouchableWithoutFeedback
        {...this.props}
        // onPress={this._onPress}
        // onLongPress={this._onLongPress}
      >
        {children}
      </TouchableWithoutFeedback>
    ) : (
      <TouchableOpacity
        activeOpacity={0.8}
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
