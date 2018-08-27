import * as React from 'react';
import { View, StyleSheet, TextInput, Keyboard, Animated } from 'react-native';
import { base } from '../../js/utils';
import Text from './Text';
const { SCREEN_WIDTH, colors } = base;
class CommentBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.keyboardHeight = new Animated.Value(0);
  }
  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    this.keyboardWillShowSub.remove();
    this.keyboardDidHideSub.remove();
  }
  keyboardWillShow = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 400,
      toValue: event.endCoordinates.height,
    }).start();
    // Animated.parallel([
    //     Animated.timing(this.keyboardHeight,{
    //         duration: event.duration,
    //         toValue: event.endCoordinates.height,
    //     }),
    //     Animated.timing(this.imageHeight,{
    //         duration: event.duration,
    //         toValue: IMAGE_HEIGHT_SMALL
    //     })
    // ]).start()
  };
  keyboardDidShow = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 400,
      toValue: event.endCoordinates.height,
    }).start();
  };
  keyboardWillHide = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 400,
      toValue: 0,
    }).start();
  };
  keyboardDidHide = event => {
    Animated.timing(this.keyboardHeight, {
      duration: 400,
      toValue: 0,
    }).start();
  };

  _onChangeText = value => {
    this.setState({ value });
  };
  render() {
    const { onPressSend, style } = this.props;
    const { value } = this.state;
    return (
      <Animated.View
        style={[styles.container, { marginBottom: this.keyboardHeight }, style]}
      >
        <TextInput
          ref={r => (this._textInput = r)}
          value={value}
          style={styles.textInput}
          autoCorrect={false}
          autoCapitalize={'none'}
          underlineColorAndroid={'transparent'}
          onChangeText={this._onChangeText}
          multiline={true}
          placeholder={'say something'}
        />
        <Text
          style={[styles.send]}
          onPress={() => {
            onPressSend(value.trim(), () => {
              this._textInput.clear();
            });
          }}
        >
          {'Send'}
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderTopWidth: 1,
    // borderColor: colors.depGrey,
    backgroundColor: colors.lightGrey,
  },
  textInput: {
    fontSize: 16,
    padding: 5,
    flex: 1,
    backgroundColor: colors.white,
  },
  send: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '200',
  },
});

export default CommentBar;
