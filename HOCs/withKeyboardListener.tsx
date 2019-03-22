import * as React from 'react';
import { Animated, Keyboard, EmitterSubscription } from 'react-native';
import { isIos } from '../utils';
interface IState {
  keyboardHeight: Animated.Value;
  keyboardIsShown: boolean;
}
interface ICompWithKeyboardListenerProps {
  keyboardHeight: Animated.Value;
  keyboardIsShown: boolean;
}
const main = <P extends object>(Comp: React.ComponentType<P>) =>
  class CompWithListener extends React.PureComponent<
    P & ICompWithKeyboardListenerProps,
    IState
  > {
    keyboardWillShowSub?: EmitterSubscription;
    keyboardWillHideSub?: EmitterSubscription;
    keyboardDidShowSub?: EmitterSubscription;
    keyboardDidHideSub?: EmitterSubscription;
    constructor(props: any) {
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
    keyboardWillShow = (event: any) => {
      this.setState({
        keyboardIsShown: true,
      });
      Animated.timing(this.state.keyboardHeight, {
        duration: 200,
        toValue: event.endCoordinates.height,
      }).start();
    };
    keyboardDidShow = (event: any) => {
      this.setState({
        keyboardIsShown: true,
      });
      Animated.timing(this.state.keyboardHeight, {
        duration: 200,
        toValue: event.endCoordinates.height,
      }).start();
    };
    keyboardWillHide = (event: any) => {
      this.setState({
        keyboardIsShown: false,
      });
      Animated.timing(this.state.keyboardHeight, {
        duration: 200,
        toValue: 0,
      }).start();
    };
    keyboardDidHide = (event: any) => {
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
