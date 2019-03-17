import * as React from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { curried } from '../../js/utils';
import { colors } from '../utils/colors';
const debugLog = (...messages) => console.warn(...messages);
const $event = new Subject();
const generateEvent = (props, eventName) => ({
  id: props.id,
  type: props.type,
  eventName,
});
const $subscribe = filterEvt => $event.pipe(filter(filterEvt));
const WAITING_FOR_TO_MOUNT = 'watingForToMount';
const POSITION = 'position';
const allInstances = {};
const extractPosition = (from, to) => ({
  fromPageX: from.pageX,
  fromPageY: from.pageY,
  fromWidth: from.width,
  fromHeight: from.height,
  toHeight: to.height,
  toWidth: to.width,
  toPageX: to.pageX,
  toPageY: to.pageY,
});
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

const invoke = (...funcs) => () => funcs.forEach(func => func && func());
const isView = children => {
  if (children.type && children.type.name === 'View') {
    return true;
  }
  return false;
};
const absDiff = (v1, v2) => Math.abs(v1 - v2);
const calAnimationTime = distance => {
  if (distance > 300) {
    return {
      y: 800,
      x: 600,
    };
  }
  if (distance > 150) {
    return {
      y: 700,
      x: 500,
    };
  }
  if (distance > 100) {
    return {
      y: 600,
      x: 500,
    };
  }
  return {
    y: 500,
    x: 400,
  };
};
export default class AnimatedWrapper extends React.PureComponent {
  static types = {
    from: 'from',
    to: 'to',
  };
  static subscribe = (props, { onMove, onEnd }) =>
    // { onSourceMove, onSourceEnd, onTargetMove, onTargetEnd },
    {
      const $onMove = $subscribe(
        evt => evt.id === props.id && evt.eventName === 'start',
      ).subscribe(onMove);
      const $onEnd = $subscribe(
        evt => evt.id === props.id && evt.eventName === 'end',
      ).subscribe(onEnd);
      return {
        $onMove,
        $onEnd,
      };
      // const $onSourceMove = $subscribe(
      //   evt => evt.id === props.id && evt.eventName === 'start',
      // ).subscribe(onSourceMove);
      // const $onSourceEnd = $subscribe(
      //   evt => evt.id === props.id && evt.eventName === 'end',
      // ).subscribe(onSourceEnd);
      // const $onTargetMove = $subscribe(
      //   evt => evt.id === props.id && evt.eventName === 'start',
      // ).subscribe(onTargetMove);
      // const $onTargetEnd = $subscribe(
      //   evt => evt.id === props.id && evt.eventName === 'end',
      // ).subscribe(onTargetEnd);
      // return {
      //   $onSourceMove,
      //   $onSourceEnd,
      //   $onTargetMove,
      //   $onTargetEnd,
      // };
    };
  constructor(props) {
    super(props);
    this.state = {};
    initInstance(props);
  }

  componentWillUnmount() {
    // del(this.props, null, 'to');
  }

  componentDidMount() {
    setProps(this.props);
  }
  componentWillReceiveProps(nextProps) {
    setProps(nextProps);
  }
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
  _getAnimation = (instance, isFrom = true) => {
    const { from, to } = instance;
    const { position: fromPosition } = from;
    const { position: toPosition } = to;
    const { animationProps = {} } = this.props;
    let animation = [];
    const {
      fromPageX,
      fromPageY,
      fromWidth,
      fromHeight,
      toPageX,
      toPageY,
      toWidth,
      toHeight,
    } = extractPosition(
      ...(isFrom ? [fromPosition, toPosition] : [toPosition, fromPosition]),
    );
    const translateY = new Animated.Value(fromPageY);
    const translateX = new Animated.Value(fromPageX);
    const width = new Animated.Value(fromWidth);
    const height = new Animated.Value(fromHeight);
    this.setState({
      translateY,
      width,
      height,
      translateX,
    });
    const { y, x } = calAnimationTime(
      absDiff(fromPageX, toPageX),
      absDiff(fromPageY, toPageY),
    );
    animation.push(
      Animated.timing(translateY, {
        easing: Easing.out(Easing.back()),
        toValue: toPageY,
        useNativeDrvier: true,
        duration: y,
        ...animationProps,
      }),
    );
    animation.push(
      Animated.timing(translateX, {
        // easing: Easing.out(Easing.back()),
        toValue: toPageX,
        useNativeDrvier: true,
        duration: x,
        ...animationProps,
      }),
    );
    animation.push(
      Animated.timing(width, {
        // easing: Easing.out(Easing.back()),
        toValue: toWidth,
        // useNativeDrvier: true,
        duration: x,
        ...animationProps,
      }),
    );
    animation.push(
      Animated.timing(height, {
        // easing: Easing.out(Easing.back()),
        toValue: toHeight,
        // useNativeDrvier: true,
        duration: x,
        ...animationProps,
      }),
    );
    return animation;
  };

  _move = (instance, isFrom, callback) => {
    const { from, to } = instance;
    const _clonedElement = isFrom ? from.clonedElement : to.clonedElement;
    const { onEnd, onStart } = this.props;
    let sibling = new RootSiblings(<View style={styles.absolute} />);
    setTimeout(() => {
      invoke(onStart)();
      const animations = this._getAnimation(instance, isFrom);
      sibling.update(this._renderClonedElement(_clonedElement));
      Animated.parallel(animations).start(() =>
        setTimeout(invoke(callback, onEnd, sibling.destroy), 100),
      );
    }, 0);
  };

  //ref start
  moveTo = callback => {
    const instance = getInstance(this.props);
    if (!instance.to.position) {
      debugLog('target component havent mount');
      set(this.props, WAITING_FOR_TO_MOUNT, true);
      return;
    }
    this._fireEvent('start');
    this._move(
      instance,
      true,
      invoke(curried(this._fireEvent)('end'), callback),
    );
  };
  moveBack = callback => {
    const instance = getInstance(this.props);
    this._fireEvent('start');
    this._move(
      instance,
      false,
      invoke(curried(this._fireEvent)('end'), callback),
    );
  };
  //ref end

  _fireEvent = eventName => {
    $event.next(generateEvent(this.props, eventName));
  };
  _renderClonedElement = comp => {
    const { style = {}, renderClonedElement } = this.props;
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
      width: this.state.width,
      height: this.state.height,
    };
    const _style = [
      {
        position: 'absolute',
        backgroundColor: colors.lightGrey,
      },
      animationStyle,
    ];
    if (renderClonedElement) {
      return renderClonedElement(_style);
    }
    return <Animated.View style={_style}>{comp}</Animated.View>;
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
  _renderChildren() {
    const from = isFrom(this.props);
    const { children } = this.props;
    let _children = isView(children) ? children : <View>{children}</View>;
    return React.cloneElement(_children, {
      ref: this._setRef,
      onLayout: from ? this._onFromLaylout : this._onToLayout,
    });
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
