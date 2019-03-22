import React, { Component } from 'react';
import { StyleSheet, View, Animated, ViewStyle } from 'react-native';
import { SCREEN_WIDTH, Styles, Assets } from '../utils';
export default class AnimatedLogo extends Component<IProp, IState> {
  animation: Animated.CompositeAnimation;
  animation1: Animated.CompositeAnimation;
  animation2: Animated.CompositeAnimation;
  animation3: Animated.CompositeAnimation;
  loop1: Animated.CompositeAnimation;
  loop2: Animated.CompositeAnimation;
  static defaultProps = {
    size: SCREEN_WIDTH * 0.9,
  };
  constructor(props: any) {
    super(props);
    this.state = {
      animationState: new Animated.Value(0),
      rotateState: new Animated.Value(0),
    };
    this.animation1 = Animated.timing(this.state.animationState, {
      toValue: 1,
      duration: 1500,
    });
    this.animation2 = Animated.timing(this.state.animationState, {
      toValue: 0,
      duration: 1500,
    });
    this.animation3 = Animated.timing(this.state.rotateState, {
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
    const { size, style } = this.props;
    return (
      <View
        style={[
          styles.wrapper,
          Styles.center,
          { width: size, height: size },
          style,
        ]}
      >
        <Animated.Image
          source={Assets.wrapper1.source}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            transform: [
              {
                rotate: this.state.rotateState.interpolate({
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
            width: size,
            height: size,
            transform: [
              {
                rotate: this.state.rotateState.interpolate({
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
            width: size * 0.9,
            height: size * 0.9,
            transform: [
              {
                scale: this.state.animationState.interpolate({
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
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});

interface IProp {
  size: number;
  style?: ViewStyle;
}
interface IState {
  animationState: Animated.Value;
  rotateState: Animated.Value;
}
