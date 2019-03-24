import React, { Component } from 'react';
import { StyleSheet, Text, View, findNodeHandle } from 'react-native';
import PropTypes from 'prop-types';
import { BlurView } from 'react-native-blur';
import Image from './Image';
import Touchable from './Touchable';
import {
  SCREEN_WIDTH,
  PADDING_TOP_FULL,
  isIos,
  colors,
  NAV_BAR_HEIGHT_FULL,
} from '../utils';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }

  imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  };
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
    } = this.props;
    return (
      <View style={[styles.wrapper, style]}>
        {/* {!isIos && (
          <View
            ref={r => {
              this.backgroundImage = r;
            }}
            onLayout={this.imageLoaded}
            style={[styles.absolute]}
          />
        )} */}
        {this.state.viewRef && (
          <BlurView
            viewRef={this.state.viewRef}
            blurType={'xlight'}
            style={styles.absolute}
          />
        )}
        {this._renderSide({
          source: sourceLeft,
          tint: leftTint,
          onPress: onPressLeft,
          iconStyle: leftIconStyle,
          title: leftTitle,
        })}
        {this._renderTitle()}
        {this._renderSide({
          source: sourceRight,
          tint: rightTint,
          onPress: onPressRight,
          iconStyle: rightIconStyle,
          title: rightTitle,
        })}
      </View>
    );
  }
  _renderSide = ({ source, tint, onPress, iconStyle, title, titleStyle }) => {
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
    const { title, titleStyle } = this.props;
    if (title) {
      return <Text style={[styles.title, titleStyle]}>{title}</Text>;
    } else {
      return <View style={[styles.blank, { flex: 1 }]} />;
    }
  };
}
NavigationBar.propTypes = {
  style: PropTypes.any,
  sourceLeft: PropTypes.any,
  leftTint: PropTypes.string,
  onPressLeft: PropTypes.func,
  leftIconStyle: PropTypes.object,
  sourceRight: PropTypes.any,
  rightTint: PropTypes.string,
  onPressRight: PropTypes.func,
  rightIconStyle: PropTypes.object,
};
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
    backgroundColor: 'transparent',
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
