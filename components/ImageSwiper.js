import * as React from 'react';
import Swiper from 'react-native-swiper';
import { Image, StyleSheet } from 'react-native';
import { base } from '../../js/utils';
const { SCREEN_WIDTH } = base;
class ImageSwiper extends React.PureComponent {
  render() {
    const { imageUrls, style } = this.props;
    return (
      <Swiper
        style={StyleSheet.flatten[(styles.container, style)]}
        loop={true}
        width={SCREEN_WIDTH}
        height={200}
        showsButtons={false}
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
        source={{ uri: item }}
        style={[styles.container, imageStyle]}
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
