import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import Touchable from '../Touchable';
import Image from '../Image';
import { base } from '../../../js/utils';
import Separator from '../Separator';
import Moment from 'moment';
import Assets from '../../Assets';
const { colors, randomItem, colorSets, Styles } = base;
const item_width = 250;
const item_height = 250 * 0.5;
class Sample extends Component {
  render() {
    const { date, imageUrl, onPressCard } = this.props;
    let formated = Moment(date);
    let year = formated.year();
    let month = formated.format('MMMM');
    let day = formated.format('DD');
    let hasImage = !!imageUrl;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.year}>{year}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.month}>{month}</Text>
            <Text style={[styles.month, { marginLeft: 5 }]}>{day}</Text>
          </View>
        </View>
        <Touchable onPress={onPressCard}>
          <View
            style={{
              justifyContent: 'flex-start',
              width: item_width,
              marginHorizontal: 10,
              height: item_height,
            }}
          >
            {hasImage && (
              <Image
                style={{
                  position: 'absolute',
                  width: item_width,
                  height: item_height,
                }}
                // source={Assets.bk3.source}
                uri={imageUrl}
              />
            )}
            <Text
              style={[
                styles.text,
                hasImage && { color: colors.white },
                hasImage && Styles.textShadow,
              ]}
              numberOfLines={5}
            >
              {
                'do not go gentle into that good night,\n old age should burn and rageasd asdfjkj we rkj asdfkje fklsa dfasdf asdf sdf sddsafsdfae sadfs d qf dfadf'
              }
            </Text>
          </View>
        </Touchable>
        <Separator
          colors={[randomItem(colorSets), randomItem(colorSets)]}
          style={{ width: 80, height: 2, alignSelf: 'center' }}
        />
      </View>
    );
  }
}
Sample.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 10,
    // alignItems: 'center',
  },
  year: {
    fontSize: 25,
    fontWeight: '400',
  },
  month: {
    fontSize: 16,
  },
  text: {
    margin: 10,
  },
});

export default Sample;
