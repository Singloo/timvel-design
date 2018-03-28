import React, { Component } from 'react';
import { StyleSheet, View, Animated, TextInput, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { base } from '../../js/utils';
import Text from './Text';

const { colors, SCREEN_HEIGHT, SCREEN_WIDTH, realSize } = base;

const bottomBegin = 10;
const bottomFinal = 30;
const scaleBegin = 1;
const scaleFinal = 0.6;
class ReTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationState: new Animated.Value(0),
      text: '',
    };
    this.placeholderScale = new Animated.Value(scaleBegin);
    this.placeholderBottom = new Animated.Value(bottomBegin);
  }
  _handleFocus = () => {
    Animated.spring(this.state.animationState, {
      toValue: 1,
      duration: 500,
      // easing:Easing.
    }).start();
  };
  _handleBlur = () => {
    Animated.timing(this.state.animationState, {
      toValue: 0,
      duration: 500,
      // easing:Easing.
    }).start();
  };
  render() {
    const { placeholder } = this.props;
    const { animationState } = this.state;
    return (
      <View style={[styles.wrapper]}>
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
          ]}
        >
          {placeholder}
        </Animated.Text>
        <TextInput
          ref={r => {
            this.textInput = r;
          }}
          onFocus={this._handleFocus}
          onChange={value => {
            this.setState({ text: value });
          }}
          onBlur={this._handleBlur}
          style={styles.textInput}
        />
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
    left: 2,
  },
  textInput: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    height: realSize(30),
    borderColor: colors.midGrey,
  },
});

export default ReTextInput;
