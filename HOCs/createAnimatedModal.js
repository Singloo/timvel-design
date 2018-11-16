import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { base } from '../../js/utils';
const { Styles } = base;
const styles = StyleSheet.create({
  container: {
    ...Styles.absolute,
    backgroundColor: 'rgba(33,33,33,0.5)',
    ...Styles.center,
  },
});
const createAnimatedModal = Comp =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
      };
      this.animationState = new Animated.Value(0);
      this.animationStart = Animated.spring(this.animationState, {
        toValue: 1,
        useNativeDriver: true,
      });
      this.animationStop = Animated.timing(this.animationState, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      });
    }
    componentWillMount() {}
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {
      const { show } = this.props;
      if (prevProps && prevProps.show === false && show === true) {
        this.modalController(true)();
      }
      if (prevProps && prevProps.show === true && show === false) {
        this.modalController(false)();
      }
    }
    modalController = bool => () => {
      if (bool) {
        this.animationStop.stop();
        this.animationState.setValue(0);
        this.setState({
          show: true,
        });
        this.animationStart.start();
        return;
      }
      this.animationStart.stop();
      this.animationState.setValue(1);
      this.animationStop.start(() => {
        this.setState({
          show: false,
        });
      });
    };
    dismiss = () => {
      const { modalController } = this.props;
      modalController(false)();
    };

    render() {
      const { style, modalController, ...childProps } = this.props;
      const { show } = this.state;
      if (!show) {
        return null;
      }
      const scale = this.animationState.interpolate({
        inputRange: [0, 0.8, 1],
        outputRange: [0.3, 1.1, 1],
        extrapolate: 'clamp',
      });
      return (
        <View style={styles.container}>
          <Animated.View style={[{ transform: [{ scale: scale }] }, style]}>
            <Comp {...childProps} dismiss={modalController(false)} />
          </Animated.View>
        </View>
      );
    }
  };

export default createAnimatedModal;
