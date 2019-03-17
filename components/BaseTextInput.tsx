import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import utils from '../utils';
const { flattenStyles } = utils;
export default class BaseTextInput extends React.Component<IProp> {
  render() {
    const { style, ...restProps } = this.props;
    return (
      <TextInput
        style={flattenStyles(styles.defaultStyle, style)}
        autoCorrect={false}
        autoCapitalize={'none'}
        underlineColorAndroid={'transparent'}
        multiline={false}
        {...restProps}
      />
    );
  }
}
const styles = StyleSheet.create({
  defaultStyle: {
    padding: 0,
  },
});

interface IProp extends TextInputProps {}
