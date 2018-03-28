import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import { base } from '../../js/utils';
const{realSize,colors}=base
class Button extends Component {
  render() {
    const { onPress, title, buttonStyle, textStyle } = this.props;
    return (
      <Touchable style={{}} onPress={onPress && onPress}>
        <View style={[styles.wrapper, buttonStyle]}>
          <View style={{ padding: 0 }}>
            <Text style={[styles.textStyle, textStyle]}>{title}</Text>
          </View>
        </View>
      </Touchable>
    );
  }
}
Button.propTypes = {};
const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    flexDirection: 'row',
    paddingHorizontal: realSize(20),
    // width:base.realSize(100),
    paddingVertical: realSize(10),
    // backgroundColor: base.colors.main,
    borderRadius: realSize(8),
    alignItems: 'center',
    justifyContent: 'center',
    margin: realSize(5),
  },
  textStyle: {
    color: colors.depGrey,
  },
});

export default Button;
