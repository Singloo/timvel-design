import * as React from 'react';
import Swiper from 'react-native-swiper';
import {} from 'react-native';
import Image from './Image';
import { SCREEN_WIDTH } from '../utils';
class ImageSwiper extends React.PureComponent {
  static defaultProps = {
    additionalProps: {},
  };
  render() {
    const {
      imageUrls,
      style,
      width,
      height,
      imageStyle,
      showsPagination,
      additionalProps,
    } = this.props;
    return (
      <Swiper
        width={width || imageStyle.width || SCREEN_WIDTH}
        height={height || imageStyle.height || 200}
        showsPagination={showsPagination}
        scrollEnabled={true}
        {...additionalProps}
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
