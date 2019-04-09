import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import {} from '../utils';
class Sample extends Component {
  render() {
    // const {} = this.props;
    return (
      <View>
        <Text style={styles.wrapper}>{'This is a sample component'}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Sample;
