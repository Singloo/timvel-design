import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Styles, Assets, randomItem } from '../utils';
const loadingLotties = [
  Assets.LoadingHorizontalDots.source,
  Assets.LoadingPlane.source,
  Assets.JollyWalker.source,
];
class Sample extends Component {
  constructor(props) {
    super(props);
    this.currentLottie = randomItem(loadingLotties);
  }
  componentDidMount() {
    this._lottie && this._lottie.play();
  }
  componentWillUnmount() {
    this._lottie && this._lottie.reset();
  }
  render() {
    return (
      <View style={Styles.absolute}>
        <LottieView
          ref={r => (this._lottie = r)}
          style={{ flex: 1, backgroundColor: 'rgba(250,250,250,0.8)' }}
          source={this.currentLottie}
          loop={true}
        />
      </View>
    );
  }
}
Sample.propTypes = {};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: 'white',
  },
});

export default Sample;
