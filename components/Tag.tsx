import React, { Component } from 'react';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import Text from './Text';
import Touchable from './Touchable';
import { colors } from '../utils';

const textStyleMap = (popularity?: number) => {
  if (typeof popularity === 'undefined') {
    return {
      textColor: colors.depGrey,
      fontSize: 18,
    };
  }
  if (popularity >= 400) {
    return {
      textColor: colors.red,
      fontSize: 40,
    };
  }
  if (popularity >= 80) {
    return {
      textColor: colors.yellow,
      fontSize: 34,
    };
  }
  if (popularity >= 40) {
    return {
      textColor: colors.teal,
      fontSize: 30,
    };
  }
  if (popularity >= 10) {
    return {
      textColor: colors.lime,
      fontSize: 22,
    };
  }
  return {
    textColor: colors.depGrey,
    fontSize: 18,
  };
};
class Tag extends Component<IProps> {
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
    const { textColor, fontSize } = textStyleMap(popularity);
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
              { color: textColor, fontSize },
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
interface IProps {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  popularity?: number;
  isSelected?: true;
  selectedStyle?: ViewStyle;
  selectedTextStyle?: TextStyle;
}
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
