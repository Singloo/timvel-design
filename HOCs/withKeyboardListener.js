import * as React from 'react';
import { Animated, Keyboard, Platform } from 'react-native';
const isIos = Platform.OS === 'ios';
const main = Comp =>
  class extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        keyboardHeight: new Animated.Value(0),
        keyboardIsShown: false,
      };
    }
    componentDidMount() {
      if (isIos) {
        this.keyboardWillShowSub = Keyboard.addListener(
          'keyboardWillShow',
          this.keyboardWillShow,
        );
        this.keyboardWillHideSub = Keyboard.addListener(
          'keyboardWillHide',
          this.keyboardWillHide,
        );
      } else {
        this.keyboardDidShowSub = Keyboard.addListener(
          'keyboardDidShow',
          this.keyboardDidShow,
        );
        this.keyboardDidHideSub = Keyboard.addListener(
          'keyboardDidHide',
          this.keyboardDidHide,
        );
      }
    }

    componentWillUnmount() {
      if (isIos) {
        this.keyboardWillShowSub && this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub && this.keyboardWillHideSub.remove();
      } else {
        this.keyboardDidShowSub && this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub && this.keyboardDidHideSub.remove();
      }
    }
    keyboardWillShow = event => {
      this.setState({
        keyboardIsShown: true,
      });
      Animated.timing(this.state.keyboardHeight, {
        duration: 200,
        toValue: event.endCoordinates.height,
      }).start();
    };
    keyboardDidShow = event => {
      this.setState({
        keyboardIsShown: true,
      });
      Animated.timing(this.state.keyboardHeight, {
        duration: 200,
        toValue: event.endCoordinates.height,
      }).start();
    };
    keyboardWillHide = event => {
      this.setState({
        keyboardIsShown: false,
      });
      Animated.timing(this.state.keyboardHeight, {
        duration: 200,
        toValue: 0,
      }).start();
    };
    keyboardDidHide = event => {
      this.setState({
        keyboardIsShown: false,
      });
      Animated.timing(this.state.keyboardHeight, {
        duration: 200,
        toValue: 0,
      }).start();
    };

    render() {
      return (
        <Comp
          {...this.props}
          keyboardHeight={this.state.keyboardHeight}
          keyboardIsShown={this.state.keyboardIsShown}
        />
      );
    }
  };

export default main;
