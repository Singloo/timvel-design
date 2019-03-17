import * as React from 'react';
import { View, PanResponder, Animated, Easing } from 'react-native';
import { base } from '../../js/utils';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
const { SCREEN_HEIGHT, SCREEN_WIDTH, TAB_BAR_HEIGHT } = base;

export default function createMoveableComp(Comp) {
  return class extends React.Component {
    static defaultProps = {
      edge: 10,
      itemSize: 70,
    };
    constructor(props) {
      super(props);
      this.state = {
        top: new Animated.Value(400),
        left: new Animated.Value(props.edge),
      };
      this.state$ = new Subject();
      this._locationX = null;
      this._locationY = null;
      this._startTop = null;
      this._startLeft = null;
    }

    componentDidMount() {
      this.state$.pipe(delay(50)).subscribe({
        next: ({ top, left }) => {
          this.state.top.setValue(top);
          this.state.left.setValue(left);
        },
      });
    }

    _topAnimation = toValue => () => {
      const diff = Math.abs(toValue - this.state.top._value);
      if (diff === 0) {
        return;
      }
      let duration = 250;
      if (diff < 50) {
        duration = 100;
      }
      if (diff >= 50 && diff < 150) {
        duration = 150;
      }
      if (diff >= 150 && diff < 250) {
        duration = 200;
      }
      this.topAnimation && this.topAnimation.stop();
      this.topAnimation = Animated.spring(this.state.top, {
        toValue,
        duration,
        easing: Easing.in(Easing.back()),
        useNativeDriver: true,
      });
      this.topAnimation.start();
    };

    _leftAnimation = toValue => () => {
      const diff = Math.abs(toValue - this.state.left._value);
      if (diff === 0) {
        return;
      }
      let duration = 250;
      if (diff < 50) {
        duration = 100;
      }
      if (diff >= 50 && diff < 150) {
        duration = 150;
      }
      if (diff >= 150 && diff < 250) {
        duration = 200;
      }
      this.leftAnimation && this.leftAnimation.stop();
      this.leftAnimation = Animated.spring(this.state.left, {
        toValue,
        duration,
        easing: Easing.in(Easing.back()),
        useNativeDriver: true,
      });
      this.leftAnimation.start();
    };

    _panResponder = PanResponder.create({
      onStartShouldSetPanResponder: evt => {
        return true;
      },
      onStartShouldSetResponderCapture: evt => {
        return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onMoveShouldSetResponder: evt => {
        return true;
      },
      onPanResponderGrant: evt => {
        const { nativeEvent } = evt;
        const { locationX, locationY } = nativeEvent;
        this._locationX = locationX;
        this._locationY = locationY;
        this._startLeft = this.state.left._value;
        this._startTop = this.state.top._value;
      },
      onPanResponderMove: evt => {
        if (this._locationX === null || this._locationY === null) {
          return;
        }
        const { nativeEvent } = evt;
        const { pageX, pageY } = nativeEvent;

        const { edge, itemSize } = this.props;
        let top = pageY - this._locationY;
        let left = pageX - this._locationX;
        const TOP_BOUNDARY = edge;
        const LEFT_BOUNDARY = edge;
        const BOTTOM_BOUNDARY =
          SCREEN_HEIGHT - TAB_BAR_HEIGHT - edge - itemSize;
        const RIGHT_BOUNDARY = SCREEN_WIDTH - edge - itemSize;
        left = Math.min(Math.max(LEFT_BOUNDARY, left), RIGHT_BOUNDARY);
        top = Math.min(Math.max(TOP_BOUNDARY, top), BOTTOM_BOUNDARY);
        this.state$.next({
          top,
          left,
        });
      },
      onPanResponderRelease: evt => {
        this._locationX = null;
        this._locationY = null;
        const { edge, itemSize } = this.props;
        const { left, top } = this.state;
        const FINAL_TOP_TOP = edge;
        const FINAL_TOP_BOTTOM =
          SCREEN_HEIGHT - TAB_BAR_HEIGHT - edge - itemSize;
        const FINAL_LEFT_LEFT = edge;
        const FINAL_LEFT_RIGHT = SCREEN_WIDTH - edge - itemSize;
        const centerX = SCREEN_WIDTH / 2 - itemSize / 2;
        const centerY = SCREEN_HEIGHT / 2 - itemSize / 2;
        const right = SCREEN_WIDTH - left._value - itemSize;
        const bottom = SCREEN_HEIGHT - top._value - itemSize;
        let animation;
        const DIFF_TOP = Math.abs(top._value - this._startTop);
        const DIFF_LEFT = Math.abs(left._value - this._startLeft);
        const DIFF = Math.abs(DIFF_TOP, DIFF_LEFT);
        if (DIFF < SCREEN_WIDTH / 3) {
          const MIN = Math.min(top._value, left._value, bottom, right);
          if (MIN === top._value) {
            animation = this._topAnimation(FINAL_TOP_TOP);
          }
          if (MIN === left._value) {
            animation = this._leftAnimation(FINAL_LEFT_LEFT);
          }
          if (MIN === bottom) {
            animation = this._topAnimation(FINAL_TOP_BOTTOM);
          }
          if (MIN === right) {
            animation = this._leftAnimation(FINAL_LEFT_RIGHT);
          }
          animation();
          return;
        }
        if (DIFF_TOP > DIFF_LEFT) {
          if (top._value < centerY) {
            animation = this._topAnimation(FINAL_TOP_TOP);
          } else {
            animation = this._topAnimation(FINAL_TOP_BOTTOM);
          }
        } else {
          if (left._value < centerX) {
            animation = this._leftAnimation(FINAL_LEFT_LEFT);
          } else {
            animation = this._leftAnimation(FINAL_LEFT_RIGHT);
          }
        }
        animation();
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderTerminate: (evt, gestureState) => {},
    });
    render() {
      const { edge, ...childProps } = this.props;
      const transform = [
        {
          translateX: this.state.left,
        },
        {
          translateY: this.state.top,
        },
      ];
      return (
        <Animated.View
          style={{
            position: 'absolute',
            transform,
          }}
          {...this._panResponder.panHandlers}
        >
          <Comp {...childProps} />
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />
        </Animated.View>
      );
    }
  };
}
