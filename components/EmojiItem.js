import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import Image from './Image';
import { colors } from '../utils';
class EmojiItem extends Component {
  constructor(props) {
    super(props);
    this.animationState = new Animated.Value(1);
  }

  _onPress = () => {
    const { onPress } = this.props;
    onPress();
    this.animationState.setValue(1);
    this.animation = Animated.sequence([
      Animated.timing(this.animationState, {
        duration: 90,
        toValue: 1.2,
        useNativeDriver: true,
      }),
      Animated.timing(this.animationState, {
        duration: 70,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
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
                  scale: this.animationState,
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
EmojiItem.propTypes = {};
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
