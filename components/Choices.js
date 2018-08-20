import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import { base } from '../../js/utils';
import LottieView from 'lottie-react-native';
import Assets from '../Assets';
const { Styles, colors, SCREEN_WIDTH } = base;
const item_width = SCREEN_WIDTH / 2 - 40;
const item_height = 50;
class Choices extends Component {
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
    const { style, title, currentValue } = this.props;
    let selected = title == currentValue;
    return (
      <Touchable onPress={this._onPress}>
        <View
          style={[
            styles.container,
            {
              shadowOpacity: 0.2,
              shadowRadius: 4,
              shadowOffset: {
                height: 2,
                width: 1,
              },
            },
            selected && Styles.shadow,
            style,
          ]}
        >
          <Text style={[selected && { color: colors.main }]}>{title}</Text>
          <View style={{ width: 40, height: 40, opacity: selected ? 1 : 0 }}>
            <LottieView
              source={Assets.Tick.source}
              style={{ width: 40, height: 40, transform: [{ scale: 1.5 }] }}
              progress={this.animationState}
            />
          </View>
        </View>
      </Touchable>
    );
  }
}
Choices.propTypes = {};
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
});

export default Choices;
