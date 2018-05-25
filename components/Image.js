import React, { Component } from 'react';
import { StyleSheet, View, Image, findNodeHandle } from 'react-native';
import PropTypes from 'prop-types';
import Touchable from './Touchable';
import Text from './Text';
import { base } from '../../js/utils';
import { BlurView } from 'react-native-blur';
const { realSize, colors, isAndroid, Styles } = base;

class Image2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }
  imageLoaded() {
    const { blur } = this.props;
    if (isAndroid && blur) {
      this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }
  }
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
      isRound,
      source,
      blur,
      blurType,
      blurAmount,
    } = this.props;
    const iconSize = {
      width: this._iconSize(size),
      height: this._iconSize(size),
    };
    let imgStyle = {
      ...iconSize,
    };
    if (typeof style !== 'undefined') {
      imgStyle = style;
      // let width
      // let height
      // let absolute
      // Object.keys(style).forEach(key=>{
      //   if (key === 'width'){
      //     width = style.width
      //   }
      //   if (key === 'height'){
      //     height = style.height
      //   }
      //   if (key === '')
      // })
    }

    let imgSource;
    if (typeof uri !== 'undefined') {
      imgSource = { uri: uri };
    } else {
      imgSource = source;
    }
    const renderImage = (
      <View
        style={[
          styles.wrapper,
          isRound && { borderRadius: imgStyle.width / 2 },
          style,
        ]}
      >
        <Image
          ref={r => (this.toBeBlured = r)}
          source={imgSource}
          onLoadEnd={this.imageLoaded.bind(this)}
          style={[
            imgStyle,
            isRound && { borderRadius: imgStyle.width / 2 },
            { tintColor: tintColor },
            style,
          ]}
          resizeMode={resizeMode}
        />
        {blur && (
          <BlurView
            viewRef={this.state.viewRef}
            blurType={blurType || 'light'}
            style={Styles.absolute}
            blurAmount={typeof blurAmount !== 'undefined' ? blurAmount : 2}
          />
        )}
      </View>
    );
    if (typeof onPress !== 'undefined') {
      return (
        <Touchable onPress={() => onPress && onPress()}>
          {renderImage}
        </Touchable>
      );
    } else {
      return renderImage;
    }
  }
}
Image2.propTypes = {};
Image2.defaultProps = {
  size: 'regular',
  resizeMode: 'contain',
  isRound: false,
};
const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    backgroundColor: 'transparent',
    padding: 0,
  },
});

export default Image2;
