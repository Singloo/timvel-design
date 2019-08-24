import * as React from 'react';
import { View, Animated, ViewStyle } from 'react-native';
import { Touchable } from '../components/';
import LottieView from 'lottie-react-native';
import { Assets } from '../utils';
interface IProps extends Object {
  onPress: () => void;
  style?: ViewStyle;
  selected?: boolean;
  tickStyle?: ViewStyle;
}
export default function createSelectableItem(Comp: React.ComponentType) {
  return class extends React.Component<IProps> {
    animationState: Animated.Value;
    constructor(props: IProps) {
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
      Animated.timing(this.animationState, {
        toValue: 1,
        duration: 500,
      }).start();
    };
    render() {
      const { style, selected, tickStyle, ...childProps } = this.props;
      return (
        <Touchable onPress={this._onPress} style={style}>
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
            ]}>
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
