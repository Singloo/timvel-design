import React, { Component } from 'react';
import { StyleSheet, View, Image, findNodeHandle } from 'react-native';
import Touchable from './Touchable';
import { base } from '../../js/utils';
import { BlurView } from 'react-native-blur';
const { realSize, isAndroid, Styles } = base;
import FastImage from 'react-native-fast-image';
const processSuffixes = {
  avatar: '?x-oss-process=style/avatar',
  post: '?x-oss-process=style/post',
};
const styleMap = (wrapperStyle, imageStyle, style) => {
  Object.keys(style).map(key => {
    if (['position', 'top', 'left', 'bottom', 'right'].includes(key)) {
      wrapperStyle[key] = style[key];
      return;
    }
    if (key.includes('padding' | 'margin')) {
      wrapperStyle[key] = style[key];
      return;
    }
    imageStyle[key] = style[key];
  });
};
class Image2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }
  imageLoaded = () => {
    const { blur } = this.props;
    if (isAndroid && blur) {
      setTimeout(() => {
        this.setState({ viewRef: findNodeHandle(this.toBeBlured) });
      }, 50);
    }
  };
  _iconSize = size => {
    switch (size) {
      case 'micro':
        return realSize(12);
      case 'verySmall':
        return realSize(16);
      case 'small':
        return realSize(24);
      case 'regular':
        return realSize(32);
      case 'large':
        return realSize(48);
      case 'veryLarge':
        return realSize(56);
      default:
        return realSize(size);
    }
  };
  render() {
    const {
      onPress,
      uri,
      size,
      resizeMode,
      tintColor,
      style,
      containerStyle,
      isRound,
      source,
      blur,
      blurType,
      blurAmount,
      processType = null,
    } = this.props;
    const iconSize = {
      width: this._iconSize(size),
      height: this._iconSize(size),
    };
    let imgStyle = {
      ...iconSize,
    };
    let wrapperStyle = { ...containerStyle };
    if (typeof style !== 'undefined') {
      let _style = style;
      if (Array.isArray(style)) {
        _style = StyleSheet.flatten(style);
      }
      styleMap(wrapperStyle, imgStyle, _style);
      // imgStyle = StyleSheet.flatten([imgStyle, _style || style]);
      // if (style['position'] === 'absolute') {
      //   wrapperStyle = {
      //     ...Styles.absolute,
      //   };
      //   imgStyle = style;
      // }
    }
    if (tintColor) {
      imgStyle.tintColor = tintColor;
    }

    let imgSource;
    if (typeof uri !== 'undefined') {
      imgSource = { uri: uri };
    } else {
      imgSource = source;
    }
    if (processType && uri) {
      const suffix = processSuffixes[processType];
      if (suffix) {
        imgSource = { uri: uri + suffix };
      }
    }
    const Wrapper = onPress ? Touchable : View;
    const TImage =
      blur || tintColor || (style && style.tintColor) ? Image : FastImage;
    const imageComp = (
      <TImage
        ref={r => (this.toBeBlured = r)}
        source={imgSource}
        onLoadEnd={this.imageLoaded}
        style={[isRound && { borderRadius: imgStyle.width / 2 }, imgStyle]}
        resizeMode={resizeMode}
      />
    );
    const blurComp = (
      <BlurView
        viewRef={this.state.viewRef}
        blurType={blurType || 'light'}
        style={Styles.absolute}
        blurAmount={typeof blurAmount !== 'undefined' ? blurAmount : 2}
      />
    );
    if (onPress || blur) {
      return (
        <Wrapper
          style={[
            styles.wrapper,
            wrapperStyle,
            // isRound && { borderRadius: imgStyle.width / 2 },
          ]}
          hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
          onPress={onPress}
        >
          {imageComp}
          {blur && blurComp}
        </Wrapper>
      );
    }
    return imageComp;
  }
}
Image2.propTypes = {};
Image2.defaultProps = {
  size: 'regular',
  resizeMode: 'cover',
  isRound: false,
  containerStyle: {},
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
  },
});

export default Image2;
