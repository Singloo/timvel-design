// @ts-nocheck
import * as React from 'react';
import { StyleSheet, View, Animated, ViewStyle } from 'react-native';
import { Styles } from '../utils';
import { HOC } from './hocTypes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(33,33,33,0.5)',
  },
});
interface IModalProps {
  modalController: (bool: boolean) => void;
  style: ViewStyle;
  show: boolean;
  dismiss: () => void;
}
interface IState {
  show: boolean;
  animationState: Animated.Value;
}
const createAnimatedModal: HOC<IModalProps> = Comp =>
  class AnimatedModal extends React.PureComponent<any, IState> {
    animationStart: Animated.CompositeAnimation;
    animationStop: Animated.CompositeAnimation;
    constructor(props: any) {
      super(props);
      this.state = {
        show: false,
        animationState: new Animated.Value(0),
      };
      this.animationStart = Animated.timing(this.state.animationState, {
        toValue: 1,
        useNativeDriver: true,
        duration: 250,
      });
      this.animationStop = Animated.timing(this.state.animationState, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      });
    }
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
      const { show } = this.props;
      if (prevProps && prevProps.show === false && show === true) {
        this.modalController(true);
      }
      if (prevProps && prevProps.show === true && show === false) {
        this.modalController(false);
      }
    }
    modalController = (bool: boolean) => {
      if (bool) {
        this.animationStop.stop();
        this.state.animationState.setValue(0);
        this.setState({
          show: true,
        });
        this.animationStart.start();
        return;
      }
      this.animationStart.stop();
      this.state.animationState.setValue(1);
      this.animationStop.start(() => {
        this.setState({
          show: false,
        });
      });
    };
    dismiss = () => {
      const { modalController } = this.props;
      modalController(false);
    };

    render() {
      const { style, modalController, children, ...childProps } = this.props;
      const { show, animationState: scale } = this.state;
      if (!show) {
        return null;
      }
      const opacity = scale.interpolate({
        inputRange: [0, 0.2],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });
      return (
        <View style={[styles.container, Styles.center, Styles.absolute]}>
          <Animated.View style={[{ opacity, transform: [{ scale }] }, style]}>
            <Comp {...childProps} dismiss={this.dismiss} />
          </Animated.View>
        </View>
      );
    }
  };

export default createAnimatedModal;
