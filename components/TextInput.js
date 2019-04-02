import React, { Component } from 'react';
import { StyleSheet, View, Animated, TextInput } from 'react-native';
import Image from './Image';
import { colors, Assets, flattenStyles } from '../utils';

class ReTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isActive: false,
    };
    this.animationState = new Animated.Value(0);
  }
  _handleFocus = () => {
    this.setState({ isActive: true });
    Animated.spring(this.animationState, {
      toValue: 1,
      duration: 500,
      // easing:Easing.
    }).start();
  };
  _handleBlur = () => {
    const { value } = this.props;
    if (typeof value !== 'undefined' && value.length !== 0) {
      //
    } else {
      this.setState({ isActive: false });
      Animated.timing(this.animationState, {
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
      iconStyle,
    } = this.props;
    const { isActive } = this.state;
    return (
      <View style={[styles.wrapper, containerStyle]}>
        <Animated.Text
          style={[
            styles.placeholder,
            {
              bottom: this.animationState.interpolate({
                inputRange: [0, 1],
                outputRange: [8, 30],
              }),
            },
            {
              transform: [
                {
                  scale: this.animationState.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.7],
                  }),
                },
              ],
              // fontSize: this.animationState.interpolate({
              //   inputRange: [0, 1],
              //   outputRange: [17, 12],
              // }),
            },
            textStyle,
            isActive && { color: activeColor || colors.main },
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
          autoCorrect={false}
          autoCapitalize={'none'}
          underlineColorAndroid={'transparent'}
          style={[
            styles.textInput,
            style,
            isActive && { borderColor: activeColor || colors.main },
          ]}
        />
        {typeof value != 'undefined' && value.length > 0 && (
          <Image
            source={Assets.close.source}
            size={'verySmall'}
            style={flattenStyles(styles.icon, iconStyle)}
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
    left: 0,
    letterSpacing: 0.5,
    // backgroundColor: 'blue',
  },
  textInput: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    height: 30,
    padding: 0,
    margin: 0,
  },
  icon: {
    position: 'absolute',
    right: 4,
    bottom: 8,
  },
});

export default ReTextInput;
