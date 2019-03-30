/*
 * File: /Users/origami/Desktop/timvel/re-kits/animationEasy/AnimatedImage.js
 * Project: /Users/origami/Desktop/timvel/re-kits
 * Created Date: Saturday March 30th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday March 30th 2019 11:35:41 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import * as React from 'react';
import { Animated, ImageStyle, ImageProps } from 'react-native';
import { NAV_BAR_HEIGHT_FULL } from '../utils';
class AnimatedImage extends React.PureComponent<IProps> {
  static defaultProps: {
    translateY: true;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      animatedState: new Animated.Value(0),
    };
  }

  render() {
    return this._renderChildren();
  }

  _renderChildren = () => {
    const { scrollY, height, style, translateY, ...restProps } = this.props;
    const scale = this.props.scrollY.interpolate({
      inputRange: [-25, 0],
      outputRange: [1.1, 1],
      extrapolateRight: 'clamp',
    });
    const transform: any[] = [{ scale }];
    if (translateY) {
      const translateY = this.props.scrollY.interpolate({
        inputRange: [-25, 0, height - NAV_BAR_HEIGHT_FULL],
        outputRange: [-18, 0, -(height - NAV_BAR_HEIGHT_FULL - 40)],
        extrapolateRight: 'clamp',
      });
      transform.push({ translateY });
    }
    return <Animated.Image style={[{ transform }, style]} {...restProps} />;
  };
}

interface IProps extends ImageProps {
  scrollY: Animated.Value;
  height: number;
  style: ImageStyle;
  translateY?: boolean;
}

export default AnimatedImage;
