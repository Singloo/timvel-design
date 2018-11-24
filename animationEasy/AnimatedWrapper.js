import * as React from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';
import RootSiblings from 'react-native-root-siblings';

const WAITING_FOR_TO_MOUNT = 'watingForToMount';
const POSITION = 'position';
const allInstances = {};
const isFrom = props => {
  return props.type === AnimatedWrapper.types.from;
};
const setProps = props => {
  if (!props) {
    return;
  }
  allInstances[props.id][props.type].props = props;
};
const set = (props, key, value, type = null) => {
  if (type) {
    allInstances[props.id][type][key] = value;
    return;
  }
  allInstances[props.id][key] = value;
};
const get = (props, key, type = null) => {
  if (type) {
    return allInstances[props.id][type][key];
  }
  return allInstances[props.id][key];
};
const del = (props, key = null, type = null) => {
  if (!props) {
    return;
  }
  if (type && key) {
    if (allInstances[props.id][type][key]) {
      delete allInstances[props.id][type][key];
    }
    return;
  }
  if (key && !type) {
    if (allInstances[props.id][key]) {
      delete allInstances[props.id][key];
    }
    return;
  }
  if (!key && type) {
    if (allInstances[props.id][type]) {
      delete allInstances[props.id][type];
    }
    return;
  }
  if (!key && !type) {
    if (allInstances[props.id]) {
      delete allInstances[props.id];
    }
    return;
  }
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
  if (!props) {
    return;
  }
  allInstances[props.id][props.type].ref = r;
};
const getInstance = props => {
  return allInstances[props.id];
};
const setClonedElement = (props, cloned) => {
  allInstances[props.id][props.type].clonedElement = cloned;
};

const invoke = method => {
  if (typeof method === 'function') {
    method();
  }
};
const isView = children => {
  if (children.type && children.type.name === 'View') {
    return true;
  }
  return false;
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

  componentWillUnmount() {
    // del(this.props, null, this.props.type);
  }

  componentDidMount() {
    setProps(this.props);
  }
  // componentWillReceiveProps(nextProps) {
  //   setProps(nextProps);
  // }
  componentDidUpdate() {}

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
    setClonedElement(this.props, React.cloneElement(children));
    const { from } = instance;
    this._measure(from.ref, position => {
      set(this.props, POSITION, position, 'from');
    });
    if (typeof onLayout === 'function') {
      onLayout(data);
    }
  };
  _onToLayout = data => {
    const { children } = this.props;
    const { onLayout } = children;
    const instance = getInstance(this.props);
    setClonedElement(this.props, React.cloneElement(children));
    const { from, to } = instance;
    this._measure(from.ref, position => {
      set(this.props, POSITION, position, 'from');
      this._measure(to.ref, position2 => {
        set(this.props, POSITION, position2, 'to');
        if (get(this.props, WAITING_FOR_TO_MOUNT)) {
          del(this.props, WAITING_FOR_TO_MOUNT);
          setTimeout(this.moveTo, 0);
        }
      });
    });
    if (typeof onLayout === 'function') {
      onLayout(data);
    }
  };
  _renderChildren() {
    const from = isFrom(this.props);
    const { children } = this.props;
    let _children = isView(children) ? children : <View>{children}</View>;
    return React.cloneElement(_children, {
      ref: this._setRef,
      onLayout: from ? this._onFromLaylout : this._onToLayout,
    });
  }
  _getAnimation = (instance, isFrom = true) => {
    const { from, to } = instance;
    const { position: fromPosition } = from;
    const { position: toPosition } = to;
    const { animationProps = {} } = this.props;
    let animation = [];
    let fromPageX;
    let fromPageY;
    let toPageX;
    let toPageY;
    if (isFrom) {
      fromPageX = fromPosition.pageX;
      toPageX = toPosition.pageX;
      fromPageY = fromPosition.pageY;
      toPageY = toPosition.pageY;
    } else {
      fromPageX = toPosition.pageX;
      toPageX = fromPosition.pageX;
      fromPageY = toPosition.pageY;
      toPageY = fromPosition.pageY;
    }
    const translateY = new Animated.Value(fromPageY);
    this.setState({
      translateY,
    });
    animation.push(
      Animated.timing(translateY, {
        easing: Easing.out(Easing.back()),
        toValue: toPageY,
        useNativeDrvier: true,
        duration: 500,
        ...animationProps,
      }),
    );
    if (fromPageX !== toPageX) {
      const translateX = new Animated.Value(fromPageX);
      this.setState({
        translateX,
      });
      animation.push(
        Animated.timing(translateX, {
          easing: Easing.out(Easing.back()),
          toValue: toPageX,
          useNativeDrvier: true,
          duration: 500,
          ...animationProps,
        }),
      );
    }

    return animation;
  };

  _move = (instance, isFrom, callback) => {
    const { from, to } = instance;
    const _clonedElement = isFrom ? from.clonedElement : to.clonedElement;
    const { onEnd, onStart } = this.props;
    let sibling = new RootSiblings(<View style={styles.absolute} />);
    setTimeout(() => {
      const animations = this._getAnimation(instance, isFrom);
      invoke(onStart);
      sibling.update(this._renderClonedElement(_clonedElement));
      Animated.parallel(animations).start(() => {
        invoke(callback);
        invoke(onEnd);
        sibling.destroy();
      });
    }, 0);
  };

  //ref start
  moveTo = callback => {
    const instance = getInstance(this.props);
    if (!instance.to.position) {
      set(this.props, WAITING_FOR_TO_MOUNT, true);
      return;
    }
    this._move(instance, true, callback);
  };
  moveBack = callback => {
    const instance = getInstance(this.props);
    this._move(instance, false, callback);
  };
  //ref end

  _renderClonedElement = comp => {
    let transform = [
      {
        translateY: this.state.translateY,
      },
    ];
    if (this.state.translateX) {
      transform.push({
        translateX: this.state.translateX,
      });
    }
    const animationStyle = {
      transform,
    };
    return (
      <Animated.View style={[{ position: 'absolute' }, animationStyle]}>
        {comp}
      </Animated.View>
    );
  };
  _measure = (ref, callback) => {
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
