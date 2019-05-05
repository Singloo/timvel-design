import * as React from 'react';
import Swiper, { SwiperProps } from 'react-native-swiper';
import { StyleSheet, ImageStyle, ViewStyle } from 'react-native';
import Image from './Image';
import { SCREEN_WIDTH, flattenStyles } from '../utils';
class ImageSwiper extends React.PureComponent<IProps> {
  static defaultProps = {
    additionalProps: {},
  };
  render() {
    const {
      imageUrls,
      width,
      height,
      imageStyle,
      showsPagination,
      additionalProps,
    } = this.props;
    return (
      <Swiper
        width={width || (imageStyle.width as number) || SCREEN_WIDTH}
        height={height || (imageStyle.height as number) || 200}
        showsPagination={showsPagination}
        scrollEnabled={true}
        {...additionalProps}
      >
        {imageUrls.map(this._renderImage)}
      </Swiper>
    );
  }
  _renderImage = (item: string, index: number) => {
    const { imageStyle, onPressImage, onLongPressImage } = this.props;
    return (
      <Image
        key={index}
        uri={item}
        style={flattenStyles(styles.container, imageStyle)}
        processType={'post'}
        resizeMode={'cover'}
        onPress={onPressImage}
        onLongPress={onLongPressImage}
      />
    );
  };
}
interface IProps {
  imageStyle: ImageStyle;
  imageUrls: string[];
  width?: number;
  height?: number;
  showsPagination?: boolean;
  additionalProps?: SwiperProps;
  onPressImage?: () => void;
  onLongPressImage?: () => void;
}
const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: 200,
  },
});

export default ImageSwiper;
