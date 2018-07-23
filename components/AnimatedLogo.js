import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import { base } from '../../js/utils';
import Assets from '../Assets';
const { SCREEN_WIDTH, Styles } = base;
class AnimatedLogo extends Component {
  constructor(props) {
    super(props);
    this.animationState = new Animated.Value(0);
    this.rotateState = new Animated.Value(0);
    this.animation1 = Animated.timing(this.animationState, {
      toValue: 1,
      duration: 1500,
    });
    this.animation2 = Animated.timing(this.animationState, {
      toValue: 0,
      duration: 1500,
    });
    this.animation3 = Animated.timing(this.rotateState, {
      toValue: 1,
      duration: 15000,
    });
    this.animation = Animated.sequence([this.animation1, this.animation2]);
    this.loop1 = Animated.loop(this.animation);
    this.loop2 = Animated.loop(this.animation3);
  }
  componentDidMount() {
    this.loop1.start();
    this.loop2.start();
  }

  componentWillUnmount() {
    this.loop1.stop();
    this.loop2.stop();
  }
  render() {
    const { size } = this.props;
    let logo_width = size || SCREEN_WIDTH * 0.9;
    return (
      <View
        style={[
          styles.wrapper,
          Styles.center,
          { width: logo_width, height: logo_width },
        ]}
      >
        <Animated.Image
          source={Assets.wrapper1.source}
          style={{
            position: 'absolute',
            width: logo_width,
            height: logo_width,
            transform: [
              {
                rotate: this.rotateState.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}
          resizeMode={'contain'}
        />
        <Animated.Image
          source={Assets.wrapper2.source}
          resizeMode={'contain'}
          style={{
            position: 'absolute',
            width: logo_width,
            height: logo_width,
            transform: [
              {
                rotate: this.rotateState.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '-360deg'],
                }),
              },
            ],
          }}
        />

        <Animated.Image
          source={Assets.center.source}
          resizeMode={'contain'}
          style={{
            position: 'absolute',
            width: logo_width * 0.9,
            height: logo_width * 0.9,
            transform: [
              {
                scale: this.animationState.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                }),
              },
            ],
          }}
        />
      </View>
    );
  }
}
AnimatedLogo.propTypes = {};
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});

export default AnimatedLogo;
