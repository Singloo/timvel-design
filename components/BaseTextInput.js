import React from 'react';
import { TextInput } from 'react-native';

class BaseTextInput extends React.Component {
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

export default BaseTextInput;
