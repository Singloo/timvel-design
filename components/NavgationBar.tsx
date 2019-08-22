import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  findNodeHandle,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Image from './Image';
import {
  SCREEN_WIDTH,
  PADDING_TOP_FULL,
  isIos,
  colors,
  NAV_BAR_HEIGHT_FULL,
} from '../utils';
import { TImageSource } from '../models';

class NavigationBar extends Component<IProps, IState> {
  // state = {
  //   viewRef: null,
  // };

  // imageLoaded = () => {
  // this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  // };
  render() {
    const {
      style,
      sourceLeft,
      leftTint,
      onPressLeft,
      leftIconStyle,
      leftTitle,
      sourceRight,
      rightTint,
      onPressRight,
      rightIconStyle,
      rightTitle,
      renderLeft,
      renderRight,
      blur,
    } = this.props;
    return (
      <View style={[styles.wrapper, style]}>
        {isIos && blur && (
          <BlurView blurType={'xlight'} style={styles.absolute} />
        )}
        {this._renderSide({
          source: sourceLeft,
          tint: leftTint,
          onPress: onPressLeft,
          iconStyle: leftIconStyle,
          title: leftTitle,
          render: renderLeft,
        })}
        {this._renderTitle()}
        {this._renderSide({
          source: sourceRight,
          tint: rightTint,
          onPress: onPressRight,
          iconStyle: rightIconStyle,
          title: rightTitle,
          render: renderRight,
        })}
      </View>
    );
  }
  _renderSide = ({
    source,
    tint,
    onPress,
    iconStyle,
    title,
    titleStyle,
    render,
  }: {
    source?: TImageSource;
    tint?: string;
    onPress?: () => void;
    iconStyle?: ImageStyle;
    title?: string;
    titleStyle?: TextStyle;
    render?: () => JSX.Element;
  }) => {
    if (render) {
      return render();
    }
    if (title) {
      return (
        <Text style={[styles.subTitle, titleStyle]} onPress={onPress}>
          {title}
        </Text>
      );
    }
    if (source) {
      return (
        <Image
          source={source}
          tintColor={tint}
          onPress={onPress}
          size={'small'}
          style={iconStyle}
          resizeMode={'contain'}
        />
      );
    } else {
      return <View style={styles.blank} />;
    }
  };
  _renderTitle = () => {
    const { title, titleStyle, renderCenter } = this.props;
    if (renderCenter) {
      return renderCenter();
    }
    if (title) {
      return <Text style={[styles.title, titleStyle]}>{title}</Text>;
    } else {
      return <View style={[styles.blank, { flex: 1 }]} />;
    }
  };
}
interface IProps {
  title?: string;
  titleStyle?: TextStyle;
  style?: ViewStyle;
  sourceLeft?: TImageSource;
  leftTint?: string;
  onPressLeft?: () => void;
  leftIconStyle?: ImageStyle;
  leftTitle?: string;
  sourceRight?: TImageSource;
  rightTint?: string;
  onPressRight?: () => void;
  rightIconStyle?: ImageStyle;
  rightTitle?: string;
  renderCenter?: () => JSX.Element;
  renderLeft?: () => JSX.Element;
  renderRight?: () => JSX.Element;
  blur?: boolean;
}
interface IState {
  viewRef: null | any;
}
const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  wrapper: {
    height: NAV_BAR_HEIGHT_FULL,
    paddingTop: PADDING_TOP_FULL,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: isIos ? 'transparent' : 'rgba(250,250,250,0.6)',
  },
  blank: {
    width: 32,
    height: 32,
    backgroundColor: 'transparent',
  },
  title: {
    flex: 1,
    fontSize: 17,
    textAlign: 'center',
    color: colors.depGrey,
    letterSpacing: 1,
    fontWeight: '100',
    backgroundColor: 'transparent',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.main,
  },
});

export default NavigationBar;
