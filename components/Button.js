import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import { base } from '../../js/utils';
const { Styles } = base;
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
    const Wrapper = onPress ? Touchable : View;
    return (
      <Wrapper
        style={StyleSheet.flatten([
          Styles.shadow,
          styles.wrapper,
          standardSize[size],
          buttonStyle,
        ])}
        onPress={onPress && onPress}
      >
        {leftIconSource && <Image source={leftIconSource} {...leftIconProps} />}
        <Text style={[styles.textStyle, textStyle]}>{title}</Text>
      </Wrapper>
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
  buttonStyle: {},
  textStyle: {},
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    // paddingHorizontal: 15,
    // paddingVertical: 8,
    backgroundColor: colors.main,
    // borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: colors.depGrey,
  },
});

export default Button;
