import * as React from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
const allInstances = {};
const isFrom = props => {
  return props.type === AnimatedWrapper.types.from;
};
const setProps = props => {
  allInstances[props.id][props.type].props = props;
};
const set = (props, key, value, type = null) => {
  allInstances[props.id][type || props.type][key] = value;
};
const initInstance = props => {
  allInstances[props.id] = allInstances[props.id] || {
    from: {
      props: {},
      clonedElement: null,
      ref: null,
      position: null,
    },
    to: {
      props: {},
      clonedElement: null,
      ref: null,
      position: null,
    },
  };
};
const setRef = (props, r) => {
  allInstances[props.id][props.type].ref = r;
};
const getInstance = props => {
  return allInstances[props.id];
};
const setClonedElement = (props, cloned) => {
  allInstances[props.id][props.type].clonedElement = cloned;
};

export default class AnimatedWrapper extends React.PureComponent {
  static types = {
    from: 'from',
    to: 'to',
  };
  constructor(props) {
    super(props);
    this.state = {};
    initInstance(props);
  }

  componentWillUnmount() {}

  componentDidMount() {
    setProps(this.props);
  }
  componentWillReceiveProps(nextProps) {
    setProps(nextProps);
  }

  _setRef = r => {
    setRef(this.props, r);
    const { children } = this.props;
    const { ref } = children;
    if (typeof ref === 'function') {
      ref(r);
    }
  };

  _onFromLaylout = data => {
    const { children } = this.props;
    const { onLayout } = children;
    const instance = getInstance(this.props);
    const { from } = instance;
    this.measure(from.ref, position => {
      set(this.props, 'position', position, 'from');
    });
    if (typeof onLayout === 'function') {
      onLayout(data);
    }
  };
  _onToLayout = data => {
    const { children } = this.props;
    const { onLayout } = children;
    const instance = getInstance(this.props);
    const { from, to } = instance;
    this.measure(from.ref, position => {
      set(this.props, 'position', position, 'from');
      this.measure(to.ref, position2 => {
        set(this.props, 'position', position2, 'to');
        setTimeout(() => {
          this.onStart();
        }, 0);
      });
    });
    if (typeof onLayout === 'function') {
      onLayout(data);
    }
  };
  _renderChildren() {
    const from = isFrom(this.props);
    const { children } = this.props;
    setClonedElement(this.props, React.cloneElement(children));
    return React.cloneElement(children, {
      ref: this._setRef,
      onLayout: from ? this._onFromLaylout : this._onToLayout,
    });
  }
  _getAnimation = instance => {
    const { from, to } = instance;
    const { position: fromPosition } = from;
    const { position: toPosition } = to;
    let animation = [];
    let fromPageX;
    let fromPageY;
    let toPageX;
    let toPageY;
    console.warn(this.props.type);
    // if (isFrom(this.props)) {
    fromPageX = fromPosition.pageX;
    fromPageY = fromPosition.pageY;
    toPageX = toPosition.pageX;
    toPageY = toPosition.pageY;
    // } else {
    //   fromPageX = toPosition.pageX;
    //   fromPageY = toPosition.pageY;
    //   toPageX = toPosition.pageX;
    //   toPageY = toPosition.pageY;
    // }
    const translateY = new Animated.Value(fromPageY);
    this.setState({
      translateY,
    });
    animation.push(
      Animated.timing(this.state.translateY, {
        easing: Easing.in(Easing.back()),
        toValue: toPageY,
        useNativeDrvier: true,
        duration: 1000,
      }),
    );
    return animation;
  };

  onStart = () => {
    // if (isFrom(this.props)) {
    const { onStart } = this.props;
    const instance = getInstance(this.props);
    this.move(instance);
    onStart && onStart();
    // }
  };
  onEnd = () => {
    const { onEnd } = this.props;
    onEnd && onEnd();
  };

  move = instance => {
    const { from, to } = instance;
    const { clonedElement } = from;
    let sibling = new RootSiblings(<View style={styles.absolute} />);
    setTimeout(() => {
      const animations = this._getAnimation(instance);
      sibling.update(this._renderClonedElement(clonedElement));
      Animated.parallel(animations).start(() => {
        sibling.destroy();
        this.onEnd();
      });
    }, 0);
  };

  _renderClonedElement = comp => {
    const animationStyle = {
      transform: [
        {
          translateY: this.state.translateY,
        },
      ],
    };
    return (
      <Animated.View style={[{ position: 'absolute' }, animationStyle]}>
        {comp}
      </Animated.View>
    );
  };
  measure = (ref, callback) => {
    if (ref) {
      ref.measure((x, y, width, height, pageX, pageY) => {
        const position = { x, y, width, height, pageX, pageY };
        callback(position);
      });
      return;
    }
    callback(null);
  };

  render() {
    return this._renderChildren();
  }
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
