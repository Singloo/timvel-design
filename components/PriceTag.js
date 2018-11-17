import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Image from './Image';
import { base } from '../../js/utils';
const { colors } = base;
import Assets from '../Assets';
import { interval } from 'rxjs';
import { take, mapTo, startWith, scan } from 'rxjs/operators';
class Sample extends React.PureComponent {
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
  componentWillUnmount() {
    this.sub$ && this.sub$.unsubscribe();
  }

  toValue = (newPrice, speed = 100) => {
    if (speed < 17) {
      throw Error('speed cannot small than 17!');
    }
    this.sub$ && this.sub$.unsubscribe();
    const { price } = this.state;
    const diff = Math.abs(parseInt(price, 10) - parseInt(newPrice, 10));
    this.sub$ = interval(speed)
      .pipe(
        take(diff),
        mapTo(parseInt(price, 10) - parseInt(newPrice, 10) > 0 ? -1 : 1),
        startWith(parseInt(price, 10)),
        scan((acc, value) => acc + value),
      )
      .subscribe(value => {
        this.setState({
          price: value,
        });
      });
  };
  render() {
    const { style, imageStyle, textStyle } = this.props;
    const { price } = this.state;
    return (
      <View style={[styles.wrapper, style]}>
        <Image
          source={Assets.coin.source}
          style={[{ width: 25, height: 25 }, imageStyle]}
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
    marginLeft: 5,
  },
});

export default Sample;
