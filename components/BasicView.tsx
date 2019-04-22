import React from 'react';
import { View, ViewProps } from 'react-native';
import Loading from './Loading';
import ErrorPage from './ErrorPage';
import Text from './Text';
import { colors, Styles } from '../utils';
export default class Sample extends React.PureComponent<IProps> {
  static defaultProps = {};
  componentDidMount() {
    const { isError, onPressError } = this.props;
    if (typeof isError !== 'undefined' && typeof onPressError === 'undefined') {
      console.warn('isError is defined, but handler does not');
    }
  }
  render() {
    const {
      isLoading,
      isError,
      onPressError,
      isEmpty,
      children,
      ...props
    } = this.props;
    return (
      <View {...props}>
        {children}
        {isEmpty && this._renderEmpty()}
        {isLoading && <Loading />}
        {isError && <ErrorPage onPressError={onPressError} />}
      </View>
    );
  }
  _renderEmpty = () => {
    const { renderEmpty, emptyMessage } = this.props;
    if (renderEmpty) {
      return renderEmpty();
    }
    return (
      <View
        style={[
          Styles.absolute,
          Styles.center,
          {
            backgroundColor: colors.white,
          },
        ]}
      >
        <Text>
          {typeof emptyMessage === 'string' ? emptyMessage : '这里空空如也...'}
        </Text>
      </View>
    );
  };
}

interface IProps extends ViewProps {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  renderEmpty?: () => JSX.Element;
  onPressError?: () => void;
  emptyMessage?: string;
}
