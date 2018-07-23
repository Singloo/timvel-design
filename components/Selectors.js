import React, { Component } from 'react';
import { StyleSheet, View, Animated, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import { base } from '../../js/utils';
import Image from './Image';
import Assets from '../Assets';
const { colors, Styles } = base;
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
class Selectors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFull: false,
    };
  }

  _onPressShowFull = () => {
    const { showFull } = this.state;
    this.setState({
      showFull: !showFull,
    });
  };
  render() {
    const { initialValue, onChangeValue, value } = this.props;
    const { showFull } = this.state;
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
              this._onPressShowFull();
              onChangeValue(item);
            }}
          />
        </View>
      );
    });
    return (
      <View style={{ marginLeft: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={Assets[value || 'sunny'].source}
            onPress={this._onPressShowFull}
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
        {showFull && (
          <Animated.View style={{ position: 'absolute', top: 40 }}>
            <ScrollView
              style={{ height: 200, width: 80 }}
              contentContainerStyle={{}}
              showsVerticalScrollIndicator={false}
            >
              {renderChoices}
            </ScrollView>
          </Animated.View>
        )}
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
