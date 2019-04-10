import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Modal } from 'react-native';
import Touchable from './Touchable';
import Image from './Image';
import { colors, Styles, Assets } from '../utils';
import { get } from 'lodash';
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
class SelectorModal extends React.Component<IModalProps> {
  _scrollView?: any;
  scrollToCurrentValue = () => {
    const { value } = this.props;
    let index = allWeathers.indexOf(value);
    if (index === -1) {
      return;
    }
    this._scrollView &&
      this._scrollView.scrollTo({
        x: 0,
        y: (index + 1) * 48,
        animated: true,
      });
  };
  render() {
    const { show, value, onChangeValue, modalPosition, dismiss } = this.props;
    let index = allWeathers.indexOf(value);
    let offSetY = index * 48;
    const renderChoices = allWeathers.map((item, index) => {
      let selected = item === value;
      return (
        <View key={index} style={[styles.itemContainer]}>
          <Image
            source={get(Assets, `${item}.source`, undefined)}
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
class Selectors extends Component<ISelectorProps, ISelectorState> {
  modalPosition: { x: number; y: number };
  _modal?: any;
  _container?: any;
  constructor(props: ISelectorProps) {
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
    this._container.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number,
      ) => {
        // console.warn(x, y, width, height, pageX, pageY);
        this.modalPosition = {
          x: pageX,
          y: pageY + height,
        };
        this.setState({
          showFull: true,
        });
      },
    );
  };

  _dismiss = () => {
    this.setState({
      showFull: false,
    });
  };
  _onLayout = () => {};
  render() {
    const { initialValue, onChangeValue, value } = this.props;
    const { showFull } = this.state;
    return (
      <View style={{ marginLeft: 10 }}>
        <View
          ref={r => (this._container = r)}
          style={{ flexDirection: 'row', alignItems: 'center', opacity: 1 }}
          onLayout={this._onLayout}
        >
          <Image
            source={get(Assets, `${value || 'sunny'}.source`, undefined)}
            onPress={() => {
              this._onPressShowFull();
            }}
            resizeMode={'contain'}
          />
          <View
            style={[
              {
                backgroundColor: colors.main,
                height: 18,
                width: 34,
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
              resizeMode={'contain'}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 2,
  },
});
interface IModalProps {
  show: boolean;
  value: any;
  onChangeValue: (value: any) => void;
  modalPosition: { x: number; y: number };
  dismiss: () => void;
}
interface ISelectorProps {
  initialValue?: any;
  value: any;
  onChangeValue: (value: any) => void;
}
interface ISelectorState {
  showFull: boolean;
}
export default Selectors;
