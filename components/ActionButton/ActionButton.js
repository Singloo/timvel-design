import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import Touchable from '../Touchable';
import Item from './Item';
import utils from '../../utils';
const { TAB_BAR_HEIGHT, sinR, cosR } = utils;

const getItemPosition = (n, r) => {
  let f = {
    x: -sinR(15, r),
    y: cosR(15, r),
  };
  let l = {
    x: cosR(15, r),
    y: -sinR(15, r),
  };
  const wide = 120;
  switch (n) {
    case 1:
      return [f];
    case 2:
      return [f, l];
    case 3: {
      let s = {
        x: sinR(60 - 15, r),
        y: cosR(60 - 15, r),
      };
      return [f, s, l];
    }
    case 4: {
      let ss = {
        x: sinR(40 - 15, r),
        y: cosR(40 - 15, r),
      };
      let tt = {
        x: sinR(40 * 2 - 15, r),
        y: cosR(40 * 2 - 15, r),
      };
      return [f, ss, tt, l];
    }
    default:
      break;
  }
};
const animationTime = 400;
class ActionButton extends React.Component {
  static Icon = Item;
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
    this.animationState = new Animated.Value(0);
  }

  _onPress = onPress => () => {
    const { expand } = this.state;
    if (expand === false) {
      this.setState({
        expand: !expand,
      });
      Animated.timing(this.animationState, {
        toValue: 1,
        duration: animationTime,
      }).start();
    } else {
      Animated.spring(this.animationState, {
        toValue: 0,
        duration: animationTime,
      }).start();
      setTimeout(() => {
        this.setState({
          expand: !expand,
        });
      }, animationTime);
    }
    onPress && onPress();
  };

  render() {
    const { expand } = this.state;
    const {
      buttonSize,
      buttonSource,
      children,
      iconSize,
      style,
      right,
      bottom,
    } = this.props;
    const icons = Array.isArray(children) ? children : [children];
    const positions = getItemPosition(
      icons.length,
      iconSize / 2 + buttonSize / 2 + 40,
    );
    const renderIcons = icons.map((item, index) => {
      const position = positions[index];
      const delay = 0.15 * index;
      const delayBegin = 1 - 0.15 * icons.length;
      const iconRight = right + (buttonSize - iconSize) / 2;
      const iconBottom = bottom + (buttonSize - iconSize) / 2;
      return (
        <Item
          key={index}
          {...item.props}
          iconSize={iconSize}
          onPress={this._onPress(item.props.onPress)}
          right={this.animationState.interpolate({
            inputRange: [0 + delay, delayBegin + delay, 1],
            outputRange: [
              iconRight,
              iconRight + position.x,
              iconRight + position.x,
            ],
          })}
          bottom={this.animationState.interpolate({
            inputRange: [0 + delay, delayBegin + delay, 1],
            outputRange: [
              iconBottom,
              iconBottom + position.y,
              iconBottom + position.y,
            ],
          })}
          opacity={this.animationState.interpolate({
            inputRange: [0 + delay, 0 + delay + 0.01, 1],
            outputRange: [0, 1, 1],
          })}
        />
      );
    });
    return (
      <Touchable withoutFeedback={true} onPress={this._onPress()}>
        <Animated.View
          style={
            expand
              ? styles.containerExpand
              : {
                  position: 'absolute',
                  right: 0,
                  bottom: TAB_BAR_HEIGHT,
                  height: buttonSize + bottom,
                  width: buttonSize + right,
                }
          }
        >
          {renderIcons}
          <Touchable withoutFeedback={true} onPress={this._onPress()}>
            <Animated.Image
              source={buttonSource}
              resizeMode={'contain'}
              style={[
                {
                  width: buttonSize,
                  height: buttonSize,
                  position: 'absolute',
                  right: right,
                  bottom: bottom,
                  borderRadius: buttonSize / 2,
                },
                {
                  transform: [
                    {
                      rotate: this.animationState.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '135deg'],
                      }),
                    },
                  ],
                },
              ]}
            />
          </Touchable>
        </Animated.View>
      </Touchable>
    );
  }
}

ActionButton.defaultProps = {
  buttonSize: 60,
  iconSize: 40,
  right: 20,
  bottom: 20,
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    bottom: TAB_BAR_HEIGHT,
    backgroundColor: 'red',
    height: 80 + 20,
    width: 80 + 20,
  },
  containerExpand: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: TAB_BAR_HEIGHT,
    right: 0,
  },
});

export default ActionButton;
