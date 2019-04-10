import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Text from './Text';
import Touchable from './Touchable';
import {} from '../utils';
class Sample extends Component<IProps> {
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
interface IProps {}
export default Sample;
