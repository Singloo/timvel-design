import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Touchable from './Touchable';
import Text from './Text';
import { base } from '../../js/utils';
const {realSize,colors}=base

class Icon extends Component {
  _iconSize = size => {
    switch (size) {
      case 'micro':
        return realSize(12);
      case 'verySmall':
        return realSize(16);
      case 'small':
        return realSize(24);
      case 'regular':
        return realSize(32);
      case 'large':
        return realSize(48);
      case 'veryLarge':
        return realSize(56);
      default:
        return realSize(size);
    }
  };
  render() {
    const {
      onPress,
      uri,
      size,
      resizeMode,
      tintColor,
      style,
      isRound,
    } = this.props;
    const iconSize = this._iconSize(size);
    return (
      <Touchable onPress={() => onPress && onPress()}>
        <View
          style={[
            styles.wrapper,
            isRound && { borderRadius: iconSize / 2 },
            style,
          ]}
        >
          <Image
            source={{ uri: uri }}
            style={[
              { width: iconSize, height: iconSize },
              isRound && { borderRadius: iconSize / 2 },
              { tintColor: tintColor },
            ]}
            resizeMode={resizeMode}
          />
        </View>
      </Touchable>
    );
  }
}
Icon.propTypes = {};
Icon.defaultProps = {
  size: 'regular',
  resizeMode: 'contain',
  isRound: false,
};
const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    backgroundColor: 'transparent',
    padding: 0,
  },
});

export default Icon;
