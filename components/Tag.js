import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import { base } from '../../js/utils';
const { colors } = base;
class Tag extends Component {
  render() {
    const { title, onPress, style, textStyle, popularity } = this.props;
    let textColor = colors.depGrey;
    let fontSize = 18;
    if (typeof popularity !== 'undefined') {
      if (popularity > 0 && popularity < 10) {
        textColor = colors.lime;
        fontSize = 22;
      } else if (popularity >= 10 && popularity < 40) {
        textColor = colors.purple;
        fontSize = 26;
      } else if (popularity >= 40 && popularity < 80) {
        textColor = colors.teal;
        fontSize = 30;
      } else if (popularity >= 80 && popularity < 200) {
        textColor = colors.yellow;
        fontSize = 34;
      } else if (popularity >= 400) {
        textColor = colors.red;
        fontSize = 40;
      }
    }
    return (
      <Touchable onPress={onPress && onPress}>
        <View style={[styles.container, style, { borderColor: textColor }]}>
          <Text style={[textStyle, { color: textColor, fontSize: fontSize }]}>
            {title}
          </Text>
        </View>
      </Touchable>
    );
  }
}
Tag.propTypes = {};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.midGrey,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  text: {},
});

export default Tag;
