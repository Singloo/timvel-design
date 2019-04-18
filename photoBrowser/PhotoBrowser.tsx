/*
 * File: /Users/origami/Desktop/timvel/re-kits/photoBrowser/PhotoBrowser.tsx
 * Project: /Users/origami/Desktop/timvel/re-kits
 * Created Date: Tuesday April 16th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Wednesday April 17th 2019 10:05:56 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React from 'react';
import { View, ViewPagerAndroid, ScrollView } from 'react-native';
import Image from './ImageItem';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import { SCREEN_WIDTH, Assets, SCREEN_HEIGHT, isIos } from '../utils';
const imageSource = [Assets.bk1.source, Assets.bk2.source, Assets.bk3.source];
const Swiper: React.ReactType = isIos ? ScrollView : ViewPagerAndroid;
const defaultProps = isIos
  ? {
      pagingEnabled: true,
      horizontal: true,
    }
  : { initialPage: 0 };
class PhotoBrowser extends React.PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Swiper {...defaultProps} style={{ backgroundColor: 'black' }}>
          {imageSource.map((source, index) => (
            <Image source={source} key={'im' + index} />
          ))}
        </Swiper>
      </View>
    );
  }
}
export default PhotoBrowser;
