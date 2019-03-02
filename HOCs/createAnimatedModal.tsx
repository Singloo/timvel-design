import * as React from 'react';
import { StyleSheet, View, Animated, ViewStyle } from 'react-native';
import utils from '../utils';
const { Styles } = utils;
import { HOC } from './hocTypes';

const styles = StyleSheet.create({
  container: {
    ...Styles.absolute,
    backgroundColor: 'rgba(33,33,33,0.5)',
    ...Styles.center,
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
      this.animationStart = Animated.spring(this.state.animationState, {
        toValue: 1,
        useNativeDriver: true,
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
      const { style, modalController, ...childProps } = this.props;
      const { show, animationState: scale } = this.state;
      if (!show) {
        return null;
      }
      return (
        <View style={styles.container}>
          <Animated.View style={[{ transform: [{ scale }] }, style]}>
          // @ts-ignore
            <Comp {...childProps} dismiss={this.dismiss} />
          </Animated.View>
        </View>
      );
    }
  };

export default createAnimatedModal;
