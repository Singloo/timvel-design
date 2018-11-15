import * as React from 'react';
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
const types = {
  main: {
    backgroundColor: colors.main,
  },
  blank: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.main,
  },
  danger: {
    backgroundColor: colors.red,
  },
  dangerBlank: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.red,
  },
};
class Button extends React.Component {
  static types = {
    main: 'main',
    blank: 'blank',
    danger: 'danger',
    dangerBlank: 'dangerBlank',
  };
  _onPress = () => {
    const { enable, onPress } = this.props;
    if (!enable) {
      return;
    }
    onPress();
  };
  render() {
    const {
      onPress,
      title,
      buttonStyle,
      textStyle,
      size,
      leftIconSource,
      leftIconProps,
      type,
      enable,
    } = this.props;
    const Wrapper = onPress ? Touchable : View;
    return (
      <Wrapper
        style={StyleSheet.flatten([
          styles.wrapper,
          standardSize[size],
          types[type],
          buttonStyle,
          !enable && { backgroundColor: colors.mainLight },
        ])}
        onPress={this._onPress}
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
  type: PropTypes.string,
  enable: PropTypes.bool,
};
Button.defaultProps = {
  size: 'regular',
  buttonStyle: {},
  textStyle: {},
  type: 'main',
  enable: true,
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: colors.depGrey,
  },
});

export default Button;
