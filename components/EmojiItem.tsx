import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Text from './Text';
import Touchable from './Touchable';
import Image from './Image';
import { colors } from '../utils';
import { TImageSource } from '../models';
class EmojiItem extends Component<IProps, IState> {
  animation?: Animated.CompositeAnimation;
  state = {
    animationState: new Animated.Value(1),
  };

  _onPress = () => {
    const { onPress } = this.props;
    onPress();
    if (this.animation) {
      this.animation.stop();
    }
    this.state.animationState.setValue(1);
    this.animation = Animated.sequence([
      Animated.timing(this.state.animationState, {
        duration: 90,
        toValue: 1.2,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.animationState, {
        duration: 70,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]);
    this.animation.start();
  };
  render() {
    const { source, num, style, textStyle } = this.props;
    return (
      <Touchable onPress={this._onPress} style={{ padding: 5 }}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  scale: this.state.animationState,
                },
              ],
            },
            style,
          ]}
        >
          <Image source={source} style={{ width: 28, height: 28 }} />
          <Text style={StyleSheet.flatten([styles.text, textStyle])}>
            {num}
          </Text>
        </Animated.View>
      </Touchable>
    );
  }
}
interface IProps {
  source: TImageSource;
  num: number;
  style: ViewStyle;
  textStyle: TextStyle;
  onPress: () => void;
}
interface IState {
  animationState: Animated.Value;
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  text: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 2,
  },
});

export default EmojiItem;
