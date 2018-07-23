import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Image from '../Image';
import Text from '../Text';
import Touchable from '../Touchable';

class Item extends React.Component {
  render() {
    const {
      title,
      source,
      iconSize,
      right,
      bottom,
      onPress,
      opacity,
      style,
      iconStyle,
    } = this.props;
    return (
      <Animated.View
        style={[
          styles.item,
          style,
          {
            borderRadius: iconSize / 2,
            right: right,
            bottom: bottom,
            opacity: opacity,
          },
        ]}
      >
        {title && <Text style={styles.title}>{title}</Text>}
        <Image
          style={{
            width: iconSize,
            height: iconSize,
            ...iconStyle,
          }}
          isRound={true}
          source={source}
          onPress={onPress && onPress}
        />
      </Animated.View>
    );
  }
}

Item.defaultProps = {};
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  title:{
    backgroundColor:'white',
    fontSize:15
  }
});
export default Item;
