import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  GestureResponderEvent,
} from 'react-native';
import { colors, flattenStyles } from '../utils';
class RText extends React.Component<IProps> {
  static track: any;
  static defaultProps = {
    color: 'black',
  };
  _onPress = (e: GestureResponderEvent) => {
    const { onPress, children, eventName, eventProps } = this.props;
    if (typeof onPress === 'function') {
      onPress(e);
      if (
        typeof (this.constructor as typeof RText).track === 'function' &&
        typeof eventName === 'string'
      )
        (this.constructor as typeof RText).track(
          eventName || children,
          eventProps,
        );
    }
  };
  render() {
    const {
      style,
      children,
      color,
      bold,
      fontSize,
      fontWeight,
      fontFamily,
      ...restProps
    } = this.props;
    const _style = { color };
    if (bold) Object.assign(_style, { fontWeight: 'bold' });
    if (fontSize) Object.assign(_style, { fontSize });
    if (fontWeight) Object.assign(_style, { fontWeight });
    if (fontFamily) Object.assign(_style, { fontFamily });
    return (
      <Text
        allowFontScaling={false}
        style={flattenStyles(styles.defaultStyles, _style, style)}
        {...restProps}>
        {children}
      </Text>
    );
  }
}
const styles = StyleSheet.create({
  defaultStyles: {
    fontSize: 17,
    color: colors.depGrey,
    fontWeight: '400',
  },
});
export default RText;
interface IProps extends TextProps {
  color?: 'black' | 'white' | string;
  bold?: boolean;
  fontSize?: number;
  fontWeight?: string;
  eventName?: string;
  eventProps?: object;
  fontFamily?: 'PT Mono';
}
