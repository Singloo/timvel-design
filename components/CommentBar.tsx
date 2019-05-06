import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  Animated,
  ViewStyle,
  Keyboard,
} from 'react-native';
import {
  SCREEN_WIDTH,
  colors,
  flattenStyles,
  invoke,
  PADDING_BOTTOM,
  Assets,
} from '../utils';
import Text from './Text';
import Image from './Image';
// @ts-ignore
import withKeyboardListener from '../HOCs/withKeyboardListener';
class CommentBar extends React.PureComponent<IProps, IState> {
  _textInput: React.RefObject<any>;
  constructor(props: any) {
    super(props);
    this.state = {
      value: '',
    };
    this._textInput = React.createRef();
  }
  componentDidMount() {}

  componentWillUnmount() {}

  _onChangeText = (value: string) => {
    this.setState({ value });
  };
  _onPressSend = () => {
    const { value } = this.state;
    const { onPressSend } = this.props;
    onPressSend(
      value.trim(),
      invoke(Keyboard.dismiss, this._textInput.current.clear),
    );
  };
  render() {
    const { style, keyboardHeight: marginBottom, keyboardIsShown } = this.props;
    const { value } = this.state;
    return (
      <Animated.View
        style={[
          styles.container,
          style,
          { marginBottom },
          keyboardIsShown && { paddingBottom: 10 },
        ]}
      >
        <TextInput
          ref={this._textInput}
          value={value}
          style={styles.textInput}
          autoCorrect={false}
          autoCapitalize={'none'}
          underlineColorAndroid={'transparent'}
          onChangeText={this._onChangeText}
          multiline={true}
          placeholder={'say something'}
        />
        <Image
          source={Assets.send.source}
          onPress={this._onPressSend}
          style={{ width: 20, height: 20, marginLeft: 10 }}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10 + PADDING_BOTTOM,
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

export default withKeyboardListener(CommentBar);

interface IProps {
  onPressSend: (value: string, callback: () => void) => void;
  style?: ViewStyle;
  keyboardHeight: Animated.Value;
  keyboardIsShown: boolean;
}
interface IState {
  value: string;
}
