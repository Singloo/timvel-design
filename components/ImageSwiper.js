import * as React from 'react';
import Swiper from 'react-native-swiper';
import {} from 'react-native';
import Image from './Image';
import utils from '../utils';
const { SCREEN_WIDTH } = utils;
class ImageSwiper extends React.PureComponent {
  render() {
    const {
      imageUrls,
      style = {},
      width,
      height,
      imageStyle = {},
    } = this.props;
    return (
      <Swiper
        // style={style}
        loop={true}
        width={width || imageStyle.width || SCREEN_WIDTH}
        height={height || imageStyle.height || 200}
        // autoplay={true}
        // width={SCREEN_WIDTH || style.width}
        // height={200 || style.height}
        // showsButtons={false}
        showsPagination={true}
        scrollEnabled={true}
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
        uri={item}
        style={[styles.container, imageStyle]}
        processType={'post'}
        resizeMode={'cover'}
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
