import * as React from 'react';
import { View, Animated } from 'react-native';
import { Touchable } from '../components/';
import LottieView from 'lottie-react-native';
import { Assets } from '../utils';
export default function createSelectableItem(Comp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.animationState = new Animated.Value(1);
    }
    _onPress = () => {
      const { onPress } = this.props;
      this._showAnimation();
      onPress();
    };
    _showAnimation = () => {
      this.animationState.setValue(0);
      this.anmation = Animated.timing(this.animationState, {
        toValue: 1,
        duration: 500,
      }).start();
    };
    render() {
      const { style, selected, tickStyle, ...childProps } = this.props;
      return (
        <Touchable onPress={this._onPress} style={[{}, style]}>
          <Comp {...childProps} />
          <View
            style={[
              {
                position: 'absolute',
                top: 0,
                right: 0,
                opacity: selected ? 1 : 0,
              },
              tickStyle,
            ]}
          >
            <LottieView
              source={Assets.Tick.source}
              style={{
                width: 20,
                height: 20,
                transform: [{ scale: 2 }],
              }}
              progress={this.animationState}
            />
          </View>
        </Touchable>
      );
    }
  };
}
