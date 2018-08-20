import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  findNodeHandle,
} from 'react-native';
import PropTypes from 'prop-types';
import { BlurView } from 'react-native-blur';
import { base } from '../../js/utils';
import Image from './Image';
const { colors, isIOS, SCREEN_WIDTH, PADDING_TOP } = base;
class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }
  _renderLeft = () => {
    const { sourceLeft, leftTint, onPressLeft, leftIconStyle } = this.props;
    if (sourceLeft) {
      return (
        <Image
          source={sourceLeft}
          tintColor={leftTint}
          onPress={() => {
            onPressLeft && onPressLeft();
          }}
          size={'small'}
          style={leftIconStyle}
          resizeMode={'contain'}
        />
      );
    } else {
      return <View style={styles.blank} />;
    }
  };
  _renderRight = () => {
    const { sourceRight, rightTint, onPressRight, rightIconStyle } = this.props;
    if (sourceRight) {
      return (
        <Image
          source={sourceRight}
          tintColor={rightTint}
          onPress={() => {
            onPressRight && onPressRight();
          }}
          size={'small'}
          style={rightIconStyle}
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
  render() {
    const { style } = this.props;
    return (
      <View
        style={[
          styles.wrapper,
          { height: 44 + PADDING_TOP, paddingTop: PADDING_TOP },
          style,
        ]}
      >
        {!isIOS && (
          <View
            ref={r => {
              this.backgroundImage = r;
            }}
            onLayout={this.imageLoaded.bind(this)}
            style={styles.absolute}
          />
        )}
        <BlurView
          viewRef={this.state.viewRef}
          blurType={'xlight'}
          style={styles.absolute}
        />
        {this._renderLeft.call(this)}
        {this._renderTitle.call(this)}
        {this._renderRight.call(this)}
      </View>
    );
  }
}
NavigationBar.propTypes = {};
const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  wrapper: {
    height: 44,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
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
});

export default NavigationBar;
