import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../Text';
import Touchable from '../Touchable';
import Image from '../Image';
import Separator from '../Separator';
import Moment from 'moment';
import utils from '../../utils';
const { Styles, colorSets, colors, randomItem } = utils;
const item_width = 250;
const item_height = 250 * 0.5;
class Sample extends Component {
  render() {
    const { post, onPressCard } = this.props;
    let formated = Moment(post.happenedAt);
    let year = formated.year();
    let month = formated.format('MMMM');
    let day = formated.format('DD');
    let hasImage = !!post.imageUrls[0].imageUrl;
    let imageUrl = post.imageUrls[0].imageUrl;
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
            style={[
              {
                justifyContent: 'flex-start',
                width: item_width,
                marginHorizontal: 10,
                height: item_height,
              },
              !hasImage && {
                borderWidth: 1,
                borderColor: randomItem(colorSets),
              },
            ]}
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
              {post.content}
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
