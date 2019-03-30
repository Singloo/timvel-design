import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import { Styles } from '../utils';
import Button from './Button';
class Sample extends React.PureComponent<IProps> {
  render() {
    const { onPressError } = this.props;
    return (
      <View
        style={[
          Styles.absolute,
          Styles.center,
          { backgroundColor: 'rgba(250,250,250,0.8)' },
        ]}
      >
        <Text>
          {'Connection lost when contacting homeplanet'}
        </Text>
        <Button
          title={'Try again'}
          onPress={onPressError}
          buttonStyle={{ marginTop: 20 }}
        />
      </View>
    );
  }
}
interface IProps {
  onPressError?: () => void;
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Sample;
