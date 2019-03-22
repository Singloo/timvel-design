import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { colors, flattenStyles } from '../utils';
class ReText extends React.Component<IProps> {
  render() {
    const { children, style, ...restProps } = this.props;
    return (
      <Text style={flattenStyles(styles.default, style)} {...restProps}>
        {children}
      </Text>
    );
  }
}
const styles = StyleSheet.create({
  default: {
    fontSize: 17,
    color: colors.depGrey,
    fontWeight: '300',
  },
});

export default ReText;
interface IProps extends TextProps {}
