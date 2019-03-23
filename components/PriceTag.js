import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Text from './Text';
import Image from './Image';
import { colors, Assets } from '../utils';
import { interval } from 'rxjs';
import { take, mapTo, startWith, scan } from 'rxjs/operators';
const diffPrice = (currentProps, nextProps) => currentProps.price !== nextProps;
const calSpeed = diff => {
  if (diff > 500) {
    return 20;
  }
  if (diff > 300) {
    return 40;
  }
  if (diff > 100) {
    return 60;
  }
  return 80;
};
class Sample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
    };
  }
  componentWillMount() {
    const { price } = this.props;
    if (!!price) {
      this.setState({
        price,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps) {
      return;
    }
    if (this.props.price !== prevProps.price) {
      this.setState({
        price: this.props.price,
      });
    }
  }
  shouldComponentUpdate(nextProps) {
    return diffPrice(this.props, nextProps);
  }
  componentWillUnmount() {
    this.sub$ && this.sub$.unsubscribe();
  }

  toValue = (newPrice, callback = null) => {
    // if (speed < 17) {
    //   throw Error('speed cannot small than 17!');
    // }
    this.sub$ && this.sub$.unsubscribe();
    const { price } = this.state;
    const diff = Math.abs(parseInt(price, 10) - parseInt(newPrice, 10));
    const speed = calSpeed(diff);
    this.sub$ = interval(speed)
      .pipe(
        take(diff),
        mapTo(parseInt(price, 10) - parseInt(newPrice, 10) > 0 ? -1 : 1),
        startWith(parseInt(price, 10)),
        scan((acc, value) => acc + value),
      )
      .subscribe({
        next: value => {
          this.setState({
            price: value,
          });
        },
        complete: () => {
          callback && callback();
        },
      });
  };
  render() {
    const { style, imageStyle, textStyle } = this.props;
    const { price } = this.state;
    return (
      <View style={[styles.wrapper, style]}>
        <Image
          source={Assets.coin.source}
          style={[{ width: 20, height: 20 }, imageStyle]}
        />
        <Text style={[styles.text, textStyle]}>{price}</Text>
      </View>
    );
  }
}
Sample.propTypes = {};
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: colors.deepOrange,
    fontWeight: '500',
    marginLeft: 2,
  },
});

export default Sample;
