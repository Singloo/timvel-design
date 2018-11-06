import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import Image from './Image';
import { base } from '../../js/utils';
const { colors } = base;
class EmojiItem extends Component {
  constructor(props) {
    super(props);
    this.animationState = new Animated.Value(1);
    // this.animation = Animated.sequence([
    //   Animated.timing(this.animationState, {
    //     duration: 100,
    //     toValue: 1.2,
    //   }),
    //   Animated.timing(this.animationState, {
    //     duration: 80,
    //     toValue: 1,
    //   }),
    // ]);
  }

  _onPress = () => {
    const { onPress } = this.props;
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
    onPress();
  };
  render() {
    const { source, onPress, num, style } = this.props;
    return (
      <Touchable onPress={this._onPress}>
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
          <Text style={styles.text}>{num}</Text>
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
