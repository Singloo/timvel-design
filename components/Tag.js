import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import { base } from '../../js/utils';
const { colors } = base;
class Tag extends Component {
  render() {
    const { title, onPress } = this.props;
    return (
      <Touchable onPress={onPress && onPress}>
        <View style={styles.container}>
          <Text>{title}</Text>
        </View>
      </Touchable>
    );
  }
}
Tag.propTypes = {};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.midGrey,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  text: {},
});

export default Tag;
