import React from 'react';
import { View, ViewProps } from 'react-native';
import Loading from './Loading';
import ErrorPage from './ErrorPage';
export default class Sample extends React.PureComponent<IProps> {
  static defaultProps = {};
  componentDidMount() {
    const { isError, onPressError } = this.props;
    if (typeof isError !== 'undefined' && typeof onPressError === 'undefined') {
      console.warn('isError is defined, but handler does not');
    }
  }
  render() {
    const { isLoading, isError, onPressError, children, ...props } = this.props;
    return (
      <View {...props}>
        {children}
        {isLoading && <Loading />}
        {isError && <ErrorPage onPressError={onPressError} />}
      </View>
    );
  }
}

interface IProps extends ViewProps {
  isLoading?: boolean;
  isError?: boolean;
  onPressError?: () => void;
}
