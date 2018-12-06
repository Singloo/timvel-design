import * as React from 'react';
import Swiper from 'react-native-swiper';
import { StyleSheet } from 'react-native';
import { base } from '../../js/utils';
import Image from './Image';
import * as Assets from '../Assets';
const { SCREEN_WIDTH } = base;
class ImageSwiper extends React.PureComponent {
  render() {
    const { imageUrls, style = {} } = this.props;
    return (
      <Swiper
        style={StyleSheet.flatten([styles.container, style])}
        loop={true}
        width={SCREEN_WIDTH || style.width}
        height={200 || style.height}
        showsButtons={false}
        showsPagination={false}
      >
        {imageUrls.map(this._renderImage)}
      </Swiper>
    );
  }
  _renderImage = (item, index) => {
    const { imageStyle } = this.props;
    return (
      <Image
        key={index}
        // uri={item}
        source={Assets.default.bk1.source}
        style={[styles.container, imageStyle]}
        processType={'post'}
      />
    );
  };
}
const styles = {
  container: {
    width: SCREEN_WIDTH,
    height: 200,
  },
};

export default ImageSwiper;
