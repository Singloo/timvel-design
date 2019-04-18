/*
 * File: /Users/origami/Desktop/timvel/re-kits/photoBrowser/PhotoBrowser.tsx
 * Project: /Users/origami/Desktop/timvel/re-kits
 * Created Date: Tuesday April 16th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Wednesday April 17th 2019 10:18:48 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React from 'react';
import { View, Animated, ImageURISource } from 'react-native';
import {
  PinchGestureHandler,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

class ImageItem extends React.PureComponent<IProps> {
  state = {
    panEnable: true,
  };
  interceptEvent = false;
  _onPanEvent = (event: PanGestureHandlerGestureEvent) => {
    const {
      x,
      y,
      velocityX,
      velocityY,
      absoluteX,
      absoluteY,
      translationX,
      translationY,
    } = event.nativeEvent;
    console.warn(event.nativeEvent);
    if (this.interceptEvent) {
      return;
    }
    if (Math.abs(translationY) < 10) {
      this.interceptEvent = true;
      this.setState(
        {
          panEnable: false,
        },
        () => {
          this.interceptEvent = false;
        },
      );
    }
  };
  render() {
    return this._renderImage();
  }
  _renderImage = () => {
    const { source } = this.props;
    console.warn(this.state.panEnable);
    return (
      <PanGestureHandler
        onGestureEvent={this._onPanEvent}
        enabled={this.state.panEnable}
      >
        {/* <Animated.View> */}
        <PinchGestureHandler>
          {/* <Animated.View> */}
          <Animated.Image source={source} style={{ alignSelf: 'center' }} />
          {/* </Animated.View> */}
        </PinchGestureHandler>
        {/* </Animated.View> */}
      </PanGestureHandler>
    );
  };
}
interface IProps {
  source: string | ImageURISource;
}
export default ImageItem;
