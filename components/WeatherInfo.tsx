import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle } from 'react-native';
import Text from './Text';
import Image from './Image';
import { colorSets, randomItem, colors, Assets } from '../utils';
import { get } from 'lodash';
class WeatherInfo extends Component<IProps> {
  backgroundColor: string;
  constructor(props: IProps) {
    super(props);
    this.backgroundColor = randomItem(colorSets);
  }
  componentWillMount() {}
  render() {
    const { weather, temperature, style } = this.props;
    return (
      <View
        style={[styles.container, { borderColor: this.backgroundColor }, style]}
      >
        <Text style={styles.text}>{temperature + '℃'}</Text>
        <Image
          source={get(Assets, `${weather}.source`, undefined)}
          resizeMode={'contain'}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRightWidth: 4,
  },
  text: {
    color: colors.white,
    marginRight: 5,
  },
});
interface IProps {
  weather: string;
  temperature: number | string;
  style?: ViewStyle;
}
export default WeatherInfo;
