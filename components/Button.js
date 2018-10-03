import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import { base } from '../../js/utils';
import Image from './Image';
const { realSize, colors, SCREEN_WIDTH } = base;
const standardSize = {
  small: {
    width: realSize(120),
    height: realSize(40),
  },
  regular: {
    width: realSize(150),
    height: realSize(50),
  },
  large: {
    width: (SCREEN_WIDTH - 60) / 2,
    height: realSize(50),
  },
};
class Button extends Component {
  render() {
    const {
      onPress,
      title,
      buttonStyle,
      textStyle,
      size,
      leftIconSource,
      leftIconProps,
    } = this.props;
    return (
      <Touchable style={{ padding: 0 }} onPress={onPress && onPress}>
        <View
          style={StyleSheet.flatten([
            styles.wrapper,
            standardSize[size],
            buttonStyle,
          ])}
        >
          {/* <View style={{ padding: 0 }}> */}
          {leftIconSource && (
            <Image source={leftIconSource} {...leftIconProps} />
          )}
          <Text style={[styles.textStyle, textStyle]}>{title}</Text>
          {/* </View> */}
        </View>
      </Touchable>
    );
  }
}
Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  buttonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.object,
  size: PropTypes.string,
  leftIconSource: PropTypes.any,
  leftIconProps: PropTypes.object,
};
Button.defaultProps = {
  size: 'regular',
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: realSize(20),
    paddingVertical: realSize(10),
    backgroundColor: colors.main,
    borderRadius: realSize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: colors.depGrey,
  },
});

export default Button;
