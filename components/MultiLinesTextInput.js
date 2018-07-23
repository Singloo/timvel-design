import React from 'react';
import { View, TextInput } from 'react-native';

class MultiLinesTextInput extends React.Component {
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

export default MultiLinesTextInput;
