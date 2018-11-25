import * as React from 'react';
import { Animated } from 'react-native';

class AnimatedYWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      animatedState: new Animated.Value(0),
    };
  }

  render() {
    return this._renderChildren();
  }

  _renderChildren = () => {
    const { children } = this.props;
    const translateY = this.state.animatedState.interpolate({
      inputRange: [0, 1],
      outputRange: [],
      extrapolate: 'clamp',
    });
    const transform = [
      {
        translateY,
      },
    ];
    const animatedStyle = {
      transform,
    };
    return <Animated.View style={[animatedStyle]}>{children}</Animated.View>;
  };
}
