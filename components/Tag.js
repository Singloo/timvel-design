import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Touchable from './Touchable';
import { base } from '../../js/utils';
const { colors } = base;
class Tag extends Component {
  render() {
    const {
      title,
      onPress,
      style,
      textStyle,
      popularity,
      isSelected,
      selectedStyle,
      selectedTextStyle,
    } = this.props;
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
    const _selectedStyle = selectedStyle || styles.selectedStyle;
    const _selectedTextStyle = selectedTextStyle || styles.selectedTextStyle;
    return (
      <Touchable onPress={onPress && onPress}>
        <View
          style={[
            styles.container,
            style,
            { borderColor: textColor },
            isSelected && _selectedStyle,
          ]}
        >
          <Text
            style={[
              textStyle,
              { color: textColor, fontSize: fontSize },
              isSelected && _selectedTextStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      </Touchable>
    );
  }
}
Tag.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  popularity: PropTypes.number,
  isSelected: PropTypes.bool,
  selectedStyle: PropTypes.object,
  selectedTextStyle: PropTypes.object,
};
Tag.defaultProps = {
  selectedStyle: {},
  selectedTextStyle: {},
};
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
  selectedStyle: { backgroundColor: colors.main, borderColor: 'transparent' },
  selectedTextStyle: {
    color: 'white',
  },
});

export default Tag;
