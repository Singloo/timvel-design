import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

class MultiLinesTextInput extends React.Component<IProps> {
  render() {
    return (
      <TextInput
        {...this.props}
        autoCorrect={false}
        autoCapitalize={'none'}
        underlineColorAndroid={'transparent'}
        multiline={true}
      />
    );
  }
}

interface IProps extends TextInputProps {}
export default MultiLinesTextInput;
