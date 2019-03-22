import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors as colors2 } from '../utils';
import LinearGradient from 'react-native-linear-gradient';
class Separator extends Component {
  render() {
    const { style, colors, gradient } = this.props;
    let gradientColors = colors || ['#00bcd4', '#ef9a9a'];
    if (gradient) {
      return (
        <LinearGradient
          style={[{ height: 3 }, style]}
          colors={gradientColors}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        />
      );
    }
    return <View style={[styles.separator, style]} />;
  }
}
Separator.propTypes = {};
const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: colors2.midGrey,
    opacity: 0.3,
  },
});

export default Separator;
