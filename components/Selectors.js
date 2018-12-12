import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Modal } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import { base } from '../../js/utils';
import Image from './Image';
import Assets from '../Assets';
import _ from 'lodash';
const { colors, Styles, realSize } = base;
const allWeathers = [
  'sunny',
  'lessCloudy',
  'cloudy',
  'cloudySky',
  'clearNight',
  'lessCloudyNight',
  'snowMid',
  'snowBig',
  'sleet',
  'smallRain',
  'shower',
  'rainstorm',
  'thunderstorm',
  'thunderShower',
  'sand',
  'fog',
  'dust',
  'sandstorm',
];
class SelectorModal extends React.Component {
  componentDidMount() {}
  scrollToCurrentValue() {
    const { value } = this.props;
    let index = allWeathers.indexOf(value);
    if (index === -1) {
      return;
    }
    this._scrollView &&
      this._scrollView.scrollTo({
        x: 0,
        y: (index + 1) * realSize(48),
        animated: true,
      });
  }
  render() {
    const { show, value, onChangeValue, modalPosition, dismiss } = this.props;
    let index = allWeathers.indexOf(value);
    let offSetY = index * realSize(48);
    const renderChoices = allWeathers.map((item, index) => {
      let selected = item === value;
      return (
        <View key={index} style={[styles.itemContainer]}>
          <Image
            source={Assets[item].source}
            resizeMode={'contain'}
            size={'large'}
            style={{
              backgroundColor: selected ? colors.redLight : colors.transparent,
            }}
            onPress={() => {
              onChangeValue(item);
            }}
          />
        </View>
      );
    });
    return (
      <Modal
        animationType={'fade'}
        visible={show}
        transparent={true}
        onRequestClose={() => {}}
      >
        <Touchable onPress={dismiss} withoutFeedback={true}>
          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <View
              style={{
                width: 80,
                height: 200,
                position: 'absolute',
                left: modalPosition.x,
                top: modalPosition.y,
              }}
            >
              <ScrollView
                ref={r => (this._scrollView = r)}
                style={{ height: 200, width: 67 }}
                contentContainerStyle={{}}
                contentOffset={{ x: 0, y: offSetY }}
                showsVerticalScrollIndicator={false}
              >
                {renderChoices}
              </ScrollView>
            </View>
          </View>
        </Touchable>
      </Modal>
    );
  }
}
class Selectors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFull: false,
    };
    this.modalPosition = {
      x: 0,
      y: 0,
    };
  }

  _onPressShowFull = () => {
    const { showFull } = this.state;
    this._container.measure((x, y, width, height, pageX, pageY) => {
      // console.warn(x, y, width, height, pageX, pageY);
      this.modalPosition = {
        x: pageX,
        y: pageY + height,
      };
      this.setState({
        showFull: true,
      });
    });
  };

  _dismiss = () => {
    this.setState({
      showFull: false,
    });
  };
  render() {
    const { initialValue, onChangeValue, value } = this.props;
    const { showFull } = this.state;
    // const renderChoices = allWeathers.map((item, index) => {
    //   let selected = item === value;
    //   return (
    //     <View key={index} style={[styles.itemContainer]}>
    //       <Image
    //         source={Assets[item].source}
    //         resizeMode={'contain'}
    //         size={'large'}
    //         style={{
    //           backgroundColor: selected ? colors.redLight : colors.transparent,
    //         }}
    //         onPress={() => {
    //           this._onPressShowFull();
    //           onChangeValue(item);
    //         }}
    //       />
    //     </View>
    //   );
    // });
    return (
      <View style={{ marginLeft: 10 }}>
        <View
          ref={r => (this._container = r)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onLayout={this._onLayout}
        >
          <Image
            source={Assets[value || 'sunny'].source}
            onPress={() => {
              this._onPressShowFull();
              // this._modal.scrollToCurrentValue();
            }}
            resizeMode={'contain'}
          />
          <View
            style={[
              {
                backgroundColor: colors.main,
                height: 15,
                width: 30,
                borderRadius: 4,
                marginLeft: 5,
              },
              Styles.center,
            ]}
          >
            <Image
              source={
                showFull ? Assets.arrow_up.source : Assets.arrow_down.source
              }
              tintColor={colors.white}
              size={'small'}
              onPress={this._onPressShowFull}
            />
          </View>
        </View>
        <SelectorModal
          ref={r => (this._modal = r)}
          show={showFull}
          value={value}
          modalPosition={this.modalPosition}
          onChangeValue={item => {
            this._dismiss();
            onChangeValue(item);
          }}
          dismiss={this._dismiss}
        />

        {/* // <Animated.View style={{ position: 'absolute', top: 40 }}>
          //   <ScrollView
          //     style={{ height: 200, width: 80 }}
          //     contentContainerStyle={{}}
          //     showsVerticalScrollIndicator={false}
          //   >
          //     {renderChoices}
          //   </ScrollView>
          // </Animated.View> */}
      </View>
    );
  }
}
Selectors.propTypes = {};
const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 2,
  },
});

export default Selectors;
