/*
 * File: /Users/origami/Desktop/timvel/re-kits/animationEasy/AnimatedImage.js
 * Project: /Users/origami/Desktop/timvel/re-kits
 * Created Date: Saturday March 30th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Sunday March 31st 2019 3:44:11 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import * as React from 'react';
import { Animated, ImageStyle, ImageProps } from 'react-native';
import { NAV_BAR_HEIGHT_FULL } from '../utils';
import FastImage from 'react-native-fast-image';
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
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
    const {
      scrollY,
      height,
      style,
      translateY: showTranslateY,
      parallaxRatio = 0.5,
      ...restProps
    } = this.props;
    const SCROLL_DISTANCE = height - NAV_BAR_HEIGHT_FULL;
    const scale = this.props.scrollY.interpolate({
      inputRange: [-25, 0],
      outputRange: [1.1, 1],
      extrapolateRight: 'clamp',
    });
    const transform: any[] = [{ scale }];
    if (showTranslateY) {
      const translateY = this.props.scrollY.interpolate({
        inputRange: [
          -25,
          0,
          SCROLL_DISTANCE / parallaxRatio,
          SCROLL_DISTANCE / parallaxRatio + 1,
        ],
        outputRange: [-13, 0, SCROLL_DISTANCE, SCROLL_DISTANCE + 1],
        // extrapolateRight: 'clamp',
      });
      transform.push({ translateY });
    }
    return <AnimatedFastImage style={[{ transform }, style]} {...restProps} />;
  };
}

interface IProps extends ImageProps {
  scrollY: Animated.Value;
  height: number;
  style: ImageStyle;
  translateY?: boolean;
  parallaxRatio?: number;
}

export default AnimatedImage;
