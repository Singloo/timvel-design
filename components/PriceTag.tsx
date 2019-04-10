import * as React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import Text from './Text';
import Image from './Image';
import { colors, Assets } from '../utils';
import { interval, Subscription } from 'rxjs';
import { take, mapTo, startWith, scan } from 'rxjs/operators';
const diffPrice = (currentProps: IProps, nextProps: IProps) =>
  currentProps.price !== nextProps.price;
const calSpeed = (diff: number) => {
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
class Sample extends React.Component<IProps, IState> {
  state = {
    price: 0,
  };
  sub$?: Subscription;
  componentWillMount() {
    const { price } = this.props;
    if (!!price) {
      this.setState({
        price,
      });
    }
  }
  componentDidUpdate(prevProps: IProps) {
    if (!prevProps) {
      return;
    }
    if (this.props.price !== prevProps.price) {
      this.setState({
        price: this.props.price,
      });
    }
  }
  shouldComponentUpdate(nextProps: IProps) {
    return diffPrice(this.props, nextProps);
  }
  componentWillUnmount() {
    this.sub$ && this.sub$.unsubscribe();
  }

  toValue = (newPrice: number, callback?: () => void) => {
    // if (speed < 17) {
    //   throw Error('speed cannot small than 17!');
    // }
    this.sub$ && this.sub$.unsubscribe();
    const { price } = this.state;
    const diff = Math.abs(price - newPrice);
    const speed = calSpeed(diff);
    this.sub$ = interval(speed)
      .pipe(
        take(diff),
        mapTo(price - newPrice > 0 ? -1 : 1),
        startWith(price),
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

interface IProps {
  price: number;
  style: ViewStyle;
  imageStyle: ImageStyle;
  textStyle: TextStyle;
}
interface IState {
  price: number;
}
export default Sample;
