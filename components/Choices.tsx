import React from 'react';
import { StyleSheet, View, Animated, ViewStyle } from 'react-native';
import Text from './Text';
import Touchable from './Touchable';
import LottieView from 'lottie-react-native';
import { Styles, colors, SCREEN_WIDTH, flattenStyles, Assets } from '../utils';
const item_width = SCREEN_WIDTH / 2 - 40;
const item_height = 50;
class Choices extends React.Component<IProps, IState> {
  animation?: Animated.CompositeAnimation;
  constructor(props: any) {
    super(props);
    this.state = {
      animationState: new Animated.Value(1),
    };
    this.animation = Animated.timing(this.state.animationState, {
      toValue: 1,
      duration: 500,
    });
  }
  _onPress = () => {
    const { onPress } = this.props;
    this._showAnimation();
    onPress();
  };
  _showAnimation = () => {
    this.state.animationState.setValue(0);
    this.animation!.start();
  };
  render() {
    const { style, title, currentValue } = this.props;
    let selected = title == currentValue;
    return (
      <Touchable
        style={flattenStyles(
          styles.container,
          styles.initialShadow,
          selected && Styles.shadow,
          style,
        )}
        onPress={this._onPress}
      >
        <Text style={[selected && { color: colors.main }]}>{title}</Text>
        <View style={{ width: 40, height: 40, opacity: selected ? 1 : 0 }}>
          <LottieView
            source={Assets.Tick.source}
            style={{ width: 40, height: 40, transform: [{ scale: 1.5 }] }}
            progress={this.state.animationState}
          />
        </View>
      </Touchable>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    backgroundColor: colors.white,
    width: item_width,
    height: item_height,
  },
  initialShadow: {
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
});

export default Choices;

interface IProps {
  style: ViewStyle;
  title: string;
  currentValue?: string;
  onPress: () => void;
}
interface IState {
  animationState: Animated.Value;
}
