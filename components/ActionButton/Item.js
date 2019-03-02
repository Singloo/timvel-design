import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import Image from '../Image';
import Text from '../Text';

class Card extends React.Component {
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
      iconProps,
    } = this.props;
    const { style: imageStyle, ...otherProps } = iconProps;
    return (
      <Animated.View
        style={[
          styles.item,
          style,
          {
            // borderRadius: iconSize / 2,
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
            ...(imageStyle ? imageStyle : {}),
          }}
          isRound={true}
          source={source}
          onPress={onPress}
          {...otherProps}
        />
      </Animated.View>
    );
  }
}

Card.defaultProps = {
  iconProps: {},
};
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    // backgroundColor:'red'
  },
  title: {
    backgroundColor: 'white',
    fontSize: 15,
  },
});
export default Card;
