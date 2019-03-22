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
import { SCREEN_WIDTH, colors, flattenStyles } from '../utils';
import { IImageProps } from './Image';
const TEXT_SIZE_STYLE = {
  verySmall: {
    fontSize: 14,
  },
  small: {
    fontSize: 16,
  },
  regular: {
    fontSize: 18,
  },
  large: {
    fontSize: 20,
  },
};
const TEXT_TYPE_STYLE = {
  main: {
    color: colors.white,
  },
  mainBlank: {
    color: colors.main,
  },
  danger: {
    color: colors.white,
  },
  dangerBlank: {
    color: colors.red,
  },
};
const SIZE = {
  verySmall: {
    width: 80,
    height: 27,
  },
  small: {
    width: 100,
    height: 33,
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
    borderColor: colors.mainLight,
  },
  danger: {
    backgroundColor: colors.red,
  },
  dangerBlank: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.redLight,
  },
};

const switchSize = (
  size: ISize,
  {
    regular,
    small,
    vertySmall,
    large,
    defaultValue,
  }: {
    vertySmall: any;
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
    case 'verySmall':
      return vertySmall;
    default:
      return defaultValue || regular;
  }
};

const switchType = (
  type: IType,
  {
    main,
    mainBlank,
    danger,
    dangerBlank,
    defaultValue,
  }: {
    main: any;
    mainBlank: any;
    danger: any;
    dangerBlank: any;
    defaultValue?: any;
  },
) => {
  switch (type) {
    case 'main':
      return main;
    case 'mainBlank':
      return mainBlank;
    case 'danger':
      return danger;
    case 'dangerBlank':
      return dangerBlank;
    default:
      return defaultValue || main;
  }
};
const getSize = (size: ISize) => {
  return switchSize(size, {
    regular: SIZE.regular,
    small: SIZE.small,
    vertySmall: SIZE.verySmall,
    large: SIZE.large,
  });
};
const getTypeStyle = (type: IType, disable?: boolean) => {
  const style = {};
  Object.assign(
    style,
    switchType(type, {
      main: TYPES.main,
      mainBlank: TYPES.mainBlank,
      danger: TYPES.danger,
      dangerBlank: TYPES.dangerBlank,
    }),
  );
  if (disable) {
    Object.assign(style, styles.disableStyle);
  }
  return style;
};
const getTextStyle = (type: IType, size: ISize, disable?: boolean) => {
  const textStyle = {};
  Object.assign(
    textStyle,
    switchSize(size, {
      vertySmall: TEXT_SIZE_STYLE.verySmall,
      small: TEXT_SIZE_STYLE.verySmall,
      regular: TEXT_SIZE_STYLE.regular,
      large: TEXT_SIZE_STYLE.large,
    }),
  );
  Object.assign(
    textStyle,
    switchType(type, {
      main: TEXT_TYPE_STYLE.main,
      mainBlank: TEXT_TYPE_STYLE.mainBlank,
      danger: TEXT_TYPE_STYLE.danger,
      dangerBlank: TEXT_TYPE_STYLE.dangerBlank,
    }),
  );
  if (disable) {
    Object.assign(textStyle, {
      color: colors.white,
    });
  }
  return textStyle;
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
    const { title, textStyle, type, size, disable } = this.props;
    const containerProps = this._getContainerProps();
    return (
      <Touchable {...containerProps}>
        {this._renderLeftIcon()}
        <Text
          style={flattenStyles(
            styles.textStyle,
            getTextStyle(type, size, disable),
            textStyle,
          )}
        >
          {title}
        </Text>
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
type ISize = 'verySmall' | 'small' | 'regular' | 'large';
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
