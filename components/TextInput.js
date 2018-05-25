import React, { Component } from 'react';
import { StyleSheet, View, Animated, TextInput, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { base } from '../../js/utils';
import Text from './Text';
import Image from './Image';

const { colors, SCREEN_HEIGHT, SCREEN_WIDTH, realSize } = base;

class ReTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationState: new Animated.Value(0),
      text: '',
      isActive: false,
    };
  }
  _handleFocus = () => {
    this.setState({ isActive: true });
    Animated.spring(this.state.animationState, {
      toValue: 1,
      duration: 500,
      // easing:Easing.
    }).start();
  };
  _handleBlur = () => {
    const { value } = this.props;
    if (typeof value != 'undefined' && value.length != 0) {
    } else {
      this.setState({ isActive: false });
      Animated.timing(this.state.animationState, {
        toValue: 0,
        duration: 300,
      }).start();
    }
  };
  _clear = () => {
    const { clearText } = this.props;
    clearText && clearText();
    this.textInput.clear();
  };
  render() {
    const {
      placeholderText,
      style,
      value,
      textStyle,
      activeColor,
      containerStyle,
    } = this.props;
    const { animationState, isActive } = this.state;
    return (
      <View style={[styles.wrapper, containerStyle]}>
        <Animated.Text
          style={[
            styles.placeholder,
            {
              bottom: animationState.interpolate({
                inputRange: [0, 1],
                outputRange: [8, 30],
              }),
            },
            {
              fontSize: animationState.interpolate({
                inputRange: [0, 1],
                outputRange: [17, 12],
              }),
            },
            textStyle,
            { color: isActive ? colors.main : colors.depGrey },
            isActive && activeColor && { color: activeColor },
          ]}
        >
          {placeholderText}
        </Animated.Text>
        <TextInput
          ref={r => {
            this.textInput = r;
          }}
          {...this.props}
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          style={[
            styles.textInput,
            style,
            { borderColor: isActive ? colors.main : colors.midGrey },
            activeColor && isActive && { borderColor: activeColor },
          ]}
        />
        {typeof value != 'undefined' &&
          value.length > 0 && (
            <Image
              uri={'close'}
              size={'verySmall'}
              style={styles.icon}
              onPress={this._clear}
            />
          )}
      </View>
    );
  }
}
ReTextInput.propTypes = {};
const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  placeholder: {
    fontSize: 15,
    fontWeight: 'bold',
    position: 'absolute',
    opacity: 0.6,
    left: 2,
    letterSpacing: 0.5,
  },
  textInput: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    height: realSize(30),
  },
  icon: {
    position: 'absolute',
    right: 4,
    bottom: 8,
  },
});

export default ReTextInput;
