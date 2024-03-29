import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  findNodeHandle,
  ImageURISource,
  ImageStyle,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Touchable, { ITouchableProps } from './Touchable';
import { BlurView } from '@react-native-community/blur';
import { isAndroid, Styles, flattenStyles } from '../utils';
import FastImage, { FastImageProperties } from 'react-native-fast-image';
const TIMVEL_ALIYUN_ENDPOINT = 'timvel-1.oss-cn-hangzhou.aliyuncs.com';
const getProcessSuffixes = (uri: string, processType: IProcessType) => {
  if (!uri.includes(TIMVEL_ALIYUN_ENDPOINT)) {
    return uri;
  }
  switch (processType) {
    case 'avatar':
      return uri + '?x-oss-process=style/avatar';
    case 'post':
      return uri + '?x-oss-process=style/post';
    default:
      return uri + '';
  }
};
const imageSizeMap = (
  size:
    | 'micro'
    | 'verySmall'
    | 'small'
    | 'regular'
    | 'large'
    | 'veryLarge'
    | number,
) => {
  switch (size) {
    case 'micro':
      return 12;
    case 'verySmall':
      return 16;
    case 'small':
      return 24;
    case 'regular':
      return 32;
    case 'large':
      return 48;
    case 'veryLarge':
      return 56;
    default:
      return size;
  }
};
const whichKeyForWrapper = (key: string): boolean =>
  ['position', 'top', 'left', 'bottom', 'right'].includes(key) ||
  key.includes('padding') ||
  key.includes('margin');
export default class Image2 extends React.Component<IImageProps, IState> {
  toBeBlured = React.createRef<React.Component<FastImageProperties>>();
  static defaultProps = {
    size: 'regular',
    resizeMode: 'cover',
    blurType: 'light',
    blurAmount: 2,
  };
  constructor(props: any) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }
  imageLoaded = () => {
    const { blur } = this.props;
    if (isAndroid && blur) {
      setTimeout(() => {
        this.setState({ viewRef: findNodeHandle(this.toBeBlured.current) });
      }, 100);
    }
  };
  _propMap = (hasWrapper: boolean) => {
    const { source, uri, processType } = this.props;
    let imgSource = source;
    if (typeof uri !== 'undefined' && uri !== null) {
      imgSource = { uri };
      if (processType) {
        imgSource = { uri: getProcessSuffixes(uri, processType) };
      }
    }
    return {
      imgSource,
      ...this._getImgStyle(hasWrapper),
    };
  };
  _getImgStyle = (hasWrapper: boolean) => {
    const { size, style, tintColor, isRound, containerStyle } = this.props;
    let imgStyle = {};
    let wrapperStyle = {};
    const imgSize = {
      width: imageSizeMap(size),
      height: imageSizeMap(size),
    };
    Object.assign(imgStyle, imgSize);
    if (tintColor) {
      Object.assign(imgStyle, { tintColor });
    }
    if (isRound) {
      Object.assign(imgStyle, { borderRadius: imgSize.width / 2 });
    }
    if (style) {
      const _style = Array.isArray(style) ? flattenStyles(style) : style;
      Object.keys(_style).forEach(key => {
        if (whichKeyForWrapper(key) && hasWrapper) {
          Object.assign(wrapperStyle, { [key]: _style[key] });
          return;
        }
        Object.assign(imgStyle, { [key]: _style[key] });
      });
    }
    if (containerStyle) {
      Object.assign(wrapperStyle, flattenStyles(containerStyle));
    }

    return {
      imgStyle,
      wrapperStyle,
    };
  };
  render() {
    const {
      onPress,
      resizeMode,
      tintColor,
      style,
      blur,
      blurType,
      blurAmount,
      onLongPress,
    } = this.props;
    const hasWrapper = !!(onPress || blur);
    const _style = Array.isArray(style) ? flattenStyles(style) : style;
    const { imgSource, imgStyle, wrapperStyle } = this._propMap(hasWrapper);
    const Wrapper: React.ReactType =
      typeof onPress !== 'undefined' ? Touchable : View;
    const TImage =
      blur || tintColor || (_style && _style.tintColor) ? Image : FastImage;
    const imageComp = (
      <TImage
        ref={this.toBeBlured}
        source={imgSource as any}
        onLoadEnd={this.imageLoaded}
        style={imgStyle}
        resizeMode={resizeMode}
      />
    );

    const blurComp = (
      <BlurView
        viewRef={this.state.viewRef}
        blurType={blurType}
        style={Styles.absolute}
        blurAmount={blurAmount}
      />
    );
    const tempCover = (
      <View
        style={[Styles.absolute, { backgroundColor: 'rgba(250,250,250,0.8)' }]}
      />
    );
    if (hasWrapper) {
      return (
        <Wrapper
          style={flattenStyles(styles.wrapper, wrapperStyle)}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          {imageComp}
          {blur && blurComp}
          {blur && isAndroid && !this.state.viewRef && tempCover}
        </Wrapper>
      );
    }
    return imageComp;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
  },
});

interface IState {
  viewRef: number | null;
}
export interface IImageProps {
  onPress?: () => void;
  uri?: string;
  size:
    | 'micro'
    | 'verySmall'
    | 'small'
    | 'regular'
    | 'large'
    | 'veryLarge'
    | number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  tintColor?: string;
  style?: ImageStyle | ImageStyle[] | StyleProp<ImageStyle>[];
  containerStyle?: ViewStyle;
  isRound?: boolean;
  source?: number | ImageURISource | ImageURISource[];
  blur?: boolean;
  blurType: 'regular' | 'xlight' | 'light' | 'dark' | 'extraDark' | 'prominent';
  blurAmount?: number;
  processType?: IProcessType;
  onLongPress?: () => void;
}
type IDict = { [key: string]: any };
type IProcessType = 'avatar' | 'post' | undefined;
