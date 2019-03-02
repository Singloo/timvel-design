import React from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableOpacityProps,
  TouchableWithoutFeedbackProps,
} from 'react-native';
class ReTouchable extends React.Component<ITouchableProps, any> {
  static defaultProps = {
    withoutFeedback: false,
  };
  render() {
    const { children, withoutFeedback, ...restProps } = this.props;
    const Comp = withoutFeedback ? TouchableWithoutFeedback : TouchableOpacity;
    const props = {
      hitSlop: { top: 8, left: 8, bottom: 8, right: 8 },
      activeOpacity: 0.75,
    };
    return (
      <Comp {...props} {...restProps}>
        {children}
      </Comp>
    );
  }
}
export interface ITouchableProps
  extends TouchableOpacityProps,
    TouchableWithoutFeedbackProps {
  withoutFeedback: boolean;
}

export default ReTouchable;
