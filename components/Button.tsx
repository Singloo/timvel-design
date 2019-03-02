import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageProps,
  ImageURISource,
} from 'react-native';
import Text from './Text';
import Touchable from './Touchable';
import Image from './Image';
import utils from '../utils';
import { IImageProps } from './Image';
const { SCREEN_WIDTH, colors, flattenStyles } = utils;
const SIZE = {
  small: {
    width: 120,
    height: 40,
  },
  regular: {
    width: 150,
    height: 50,
  },
  large: {
    width: (SCREEN_WIDTH - 60) / 2,
    height: 50,
  },
};
const TYPES = {
  main: {
    backgroundColor: colors.main,
  },
  mainBlank: {
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

const switchSize = (
  size: ISize,
  {
    regular,
    small,
    large,
    defaultValue,
  }: {
    regular: any;
    small: any;
    large: any;
    defaultValue?: any;
  },
) => {
  switch (size) {
    case 'regular':
      return regular;
    case 'small':
      return small;
    case 'large':
      return large;
    default:
      return defaultValue || regular;
  }
};
// const switchType = (type)
const getSize = (size: ISize) => {
  switch (size) {
    case 'regular':
      return SIZE.regular;
    case 'small':
      return SIZE.small;
    case 'large':
      return SIZE.large;
    default:
      return SIZE.regular;
  }
};
const getTypeStyle = (type: IType, disable?: boolean) => {
  const style = {};
  switch (type) {
    case 'main':
      Object.assign(style, TYPES.main);
      break;
    case 'mainBlank':
      Object.assign(style, TYPES.mainBlank);
      break;
    case 'danger':
      Object.assign(style, TYPES.danger);
      break;
    case 'dangerBlank':
      Object.assign(style, TYPES.dangerBlank);
      break;
    default:
      Object.assign(style, TYPES.main);
      break;
  }
  if (disable) {
    Object.assign(style, styles.disableStyle);
  }
  return style;
};
const getTextStye = (type: IType, size: ISize, disable?: boolean) => {
  const textStyle = {};
};
class Button extends React.Component<IProps> {
  static defaultProps = {
    size: 'regular',
    type: 'main',
  };

  _getContainerProps = () => {
    const containerProps = {};
    const { disable, onPress, size, type, buttonStyle } = this.props;
    Object.assign(containerProps, {
      style: flattenStyles(
        styles.wrapper,
        getSize(size),
        getTypeStyle(type, disable),
        buttonStyle,
      ),
    });
    if (onPress) {
      Object.assign(containerProps, {
        onPress,
      });
    }
    if (disable) {
      Object.assign(containerProps, {
        onPress: undefined,
      });
    }
    return containerProps;
  };
  render() {
    const { title, textStyle } = this.props;
    const containerProps = this._getContainerProps();
    return (
      <Touchable {...containerProps}>
        {this._renderLeftIcon()}
        <Text style={[styles.textStyle, textStyle]}>{title}</Text>
      </Touchable>
    );
  }

  _renderLeftIcon = () => {
    const { leftIconSource, leftIconProps } = this.props;
    if (!leftIconSource) {
      return null;
    }
    return <Image source={leftIconSource} {...leftIconProps} />;
  };
}

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
  disableStyle: {
    backgroundColor: colors.midGrey,
  },
});

export default Button;
type ISize = 'small' | 'regular' | 'large';
type IType = 'main' | 'mainBlank' | 'danger' | 'dangerBlank';
interface IProps {
  onPress?: () => void;
  title: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  size: ISize;
  leftIconSource?: number | ImageURISource | ImageURISource[];
  leftIconProps?: IImageProps;
  type: IType;
  disable?: boolean;
}
