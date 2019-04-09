import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Animated } from 'react-native';
import Text from './Text';
class Sample extends Component {
  render() {
    const { text, textStyle, children, style, containerStyle } = this.props;
    return (
      <Animated.ScrollView
        style={[styles.wrapper, style]}
        contentContainerStyle={[styles.container, containerStyle]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            padding: 0,
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
          <Text style={[styles.text, textStyle]}>{text}</Text>
        </View>
      </Animated.ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    // paddingVertical: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
    paddingRight: 40,
    paddingVertical: 0,
  },
  text: {
    padding: 0,
    alignSelf: 'center',
  },
});

export default Sample;
