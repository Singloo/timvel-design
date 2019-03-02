import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

export default class BaseTextInput extends React.Component<IProp> {
  render() {
    return (
      <TextInput
        {...this.props}
        autoCorrect={false}
        autoCapitalize={'none'}
        underlineColorAndroid={'transparent'}
        multiline={false}
      />
    );
  }
}

interface IProp extends TextInputProps {}
