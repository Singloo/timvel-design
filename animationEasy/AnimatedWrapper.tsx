import * as React from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Easing,
  LayoutRectangle,
  ViewStyle,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { curried } from '../../js/utils';
import { colors } from '../utils/colors';
// to do
// null is not an object (evaluating 't.pageX')
const WAITING_FOR_TO_MOUNT = 'watingForToMount';
const POSITION = 'position';
const debugLog = (...messages: string[]) => console.warn(...messages);
const $event = new Subject<IEvent>();
const generateEvent = (props: IProps, eventName: string): IEvent => ({
  id: props.id,
  type: props.type,
  eventName,
});
const $subscribe = (filterEvt: (event: IEvent) => boolean) =>
  $event.pipe(filter(filterEvt));
const allInstances: { [id: string]: IInstance } = {};
const extractPosition = (from: IPosition, to: IPosition) => ({
  fromPageX: from.pageX,
  fromPageY: from.pageY,
  fromWidth: from.width,
  fromHeight: from.height,
  toHeight: to.height,
  toWidth: to.width,
  toPageX: to.pageX,
  toPageY: to.pageY,
});
const isFrom = (props: IProps) => {
  return props.type === 'from';
};
const initInstance = (props: IProps) => {
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
  allInstances[props.id][props.type].props = props;
};
const setProps = (props: IProps) => {
  if (!props) {
    return;
  }
  if (!allInstances[props.id]) {
    initInstance(props);
    return;
  }
  try {
    allInstances[props.id][props.type].props = props;
  } catch (err) {}
};
const set: {
  (props: IProps, key: keyof IInstanceProp, value: any, type: IType): void;
  (props: IProps, key: keyof IInstance, value: any): void;
} = (
  props: IProps,
  key: keyof IInstance | keyof IInstanceProp,
  value: any,
  type?: IType,
) => {
  if (type) {
    allInstances[props.id][type][key as keyof IInstanceProp] = value;
    return;
  }
  allInstances[props.id][key as keyof IInstance] = value;
};
const get: {
  (props: IProps, key: keyof IInstanceProp, type: IType): any;
  (props: IProps, key: keyof IInstance): any;
} = (
  props: IProps,
  key: keyof IInstance | keyof IInstanceProp,
  type?: IType,
) => {
  if (type) {
    return allInstances[props.id][type][key as keyof IInstanceProp];
  }
  return allInstances[props.id][key as keyof IInstance];
};
const del: {
  (props: IProps, key: keyof IInstanceProp, type: IType): void;
  (props: IProps, key: keyof IInstance): void;
} = (
  props: IProps,
  key: keyof IInstance | keyof IInstanceProp,
  type?: IType,
) => {
  if (!props) {
    return;
  }
  if (type && key) {
    if (allInstances[props.id][type][key as keyof IInstanceProp]) {
      delete allInstances[props.id][type][key as keyof IInstanceProp];
    }
    return;
  }
  if (key && !type) {
    if (allInstances[props.id][key as keyof IInstance]) {
      delete allInstances[props.id][key as keyof IInstance];
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
const setRef = (props: IProps, r: React.RefObject<View>) => {
  if (!props) {
    return;
  }
  allInstances[props.id][props.type].ref = r;
};
const getInstance = (props: IProps) => {
  return allInstances[props.id];
};
const setClonedElement = (props: IProps, cloned: React.ReactElement<any>) => {
  allInstances[props.id][props.type].clonedElement = cloned;
};

const invoke = (...funcs: (() => void)[]) => () =>
  funcs.forEach(func => func && func());
const isView = (children: JSX.Element) => {
  if (children!.type && children.type.displayname === 'View') {
    return true;
  }
  return false;
};
const absDiff = (v1: number, v2: number) => Math.abs(v1 - v2);
const calAnimationTime = (distance: number) => {
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
export default class AnimatedWrapper extends React.PureComponent<
  IProps,
  IState
> {
  static types = {
    from: 'from',
    to: 'to',
  };
  static subscribe = (
    props: IProps,
    {
      onMove,
      onEnd,
    }: { onMove: (evt: IEvent) => void; onEnd: (evt: IEvent) => void },
  ) => {
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
  };
  constructor(props: IProps) {
    super(props);
    this.state = {
      width: new Animated.Value(0),
      height: new Animated.Value(0),
      translateY: new Animated.Value(0),
    };
    initInstance(props);
  }

  // componentWillUnmount() {
  // del(this.props, null, 'to');
  // }

  componentDidMount() {
    setProps(this.props);
  }
  componentWillReceiveProps(nextProps: IProps) {
    setProps(nextProps);
  }
  componentDidUpdate() {}

  _setRef = () => {
    const refObj = React.createRef<View>();
    setRef(this.props, refObj);
    return refObj;
    // todo handle children's ref
    // const { children } = this.props;
    // const { ref } = children as React.ElementType<any>;
    // if (typeof ref === 'function') {
    //   ref(r);
    // }
  };

  _onFromLaylout = (data: LayoutRectangle) => {
    const { children } = this.props;
    const { onLayout } = children as any;
    const instance = getInstance(this.props);
    setClonedElement(this.props, React.cloneElement(children as any));
    const { from } = instance;
    this._measure(from.ref!, (position: IPosition | null) => {
      set(this.props, POSITION, position, 'from');
    });
    if (typeof onLayout === 'function') {
      onLayout(data);
    }
  };
  _onToLayout = (data: LayoutRectangle) => {
    const { children } = this.props;
    const { onLayout } = children as any;
    const instance = getInstance(this.props);
    setClonedElement(this.props, React.cloneElement(children as any));
    const { from, to } = instance;
    this._measure(from.ref!, (position: IPosition | null) => {
      set(this.props, POSITION, position, 'from');
      this._measure(to.ref!, (position2: IPosition | null) => {
        set(this.props, POSITION, position2, 'to');
        if (!!get(this.props, WAITING_FOR_TO_MOUNT)) {
          del(this.props, WAITING_FOR_TO_MOUNT);
          setTimeout(this.moveTo, 0);
        }
      });
    });
    if (typeof onLayout === 'function') {
      onLayout(data);
    }
  };
  _getAnimation = (instance: IInstance, isFrom = true) => {
    const { from, to } = instance;
    const { position: fromPosition } = from;
    const { position: toPosition } = to;
    const { animationProps = {} } = this.props;
    const animation: Animated.CompositeAnimation[] = [];
    const args: [IPosition, IPosition] = isFrom
      ? [fromPosition, toPosition]
      : [toPosition, fromPosition];
    const {
      fromPageX,
      fromPageY,
      fromWidth,
      fromHeight,
      toPageX,
      toPageY,
      toWidth,
      toHeight,
    } = extractPosition(...args);
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
      // absDiff(fromPageY, toPageY),
    );
    animation.push(
      Animated.timing(translateY, {
        easing: Easing.out(Easing.back(1)),
        toValue: toPageY,
        useNativeDriver: true,
        duration: y,
        ...animationProps,
      }),
    );
    animation.push(
      Animated.timing(translateX, {
        // easing: Easing.out(Easing.back()),
        toValue: toPageX,
        useNativeDriver: true,
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

  _move = (instance: IInstance, isFrom: boolean, callback: () => void) => {
    const { from, to } = instance;
    const _clonedElement = isFrom ? from.clonedElement : to.clonedElement;
    const { onEnd, onStart } = this.props;
    let sibling = new RootSiblings(<View style={styles.absolute} />);
    setTimeout(() => {
      invoke(onStart)();
      const animations = this._getAnimation(instance, isFrom);
      sibling.update(this._renderClonedElement(_clonedElement as any));
      Animated.parallel(animations).start(() =>
        setTimeout(invoke(callback, onEnd, sibling.destroy), 100),
      );
    }, 0);
  };

  //ref start
  moveTo = (callback: () => void) => {
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
  moveBack = (callback: () => void) => {
    const instance = getInstance(this.props);
    this._fireEvent('start');
    this._move(
      instance,
      false,
      invoke(curried(this._fireEvent)('end'), callback),
    );
  };
  //ref end

  _fireEvent = (eventName: string) => {
    $event.next(generateEvent(this.props, eventName));
  };
  _renderClonedElement = (comp: JSX.Element) => {
    const { renderClonedElement } = this.props;
    const transform: any = [
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
  _measure = (
    ref: React.RefObject<View>,
    callback: (position: IPosition | null) => void,
  ) => {
    if (ref.current) {
      ref.current.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          const position = { x, y, width, height, pageX, pageY };
          callback(position);
        },
      );
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
    // console.warn(children);
    let _children: JSX.Element = isView(children as JSX.Element) ? (
      (children as JSX.Element)
    ) : (
      <View>{children}</View>
    );
    if (React.isValidElement(_children)) {
      return React.cloneElement(_children as any, {
        ref: this._setRef(),
        onLayout: from ? this._onFromLaylout : this._onToLayout,
      });
    }
    return null;
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

interface IProps {
  animationProps?: Animated.AnimationConfig;
  id: string;
  type: IType;
  onStart: () => void;
  onEnd: () => void;
  renderClonedElement?: (style: any) => JSX.Element;
}
interface IState {
  width: Animated.Value;
  height: Animated.Value;
  translateY: Animated.Value;
  translateX?: Animated.Value;
}

type IType = 'from' | 'to';
interface IEvent {
  id: string;
  type: IType;
  eventName: string;
}
interface IInstanceProp {
  props: IProps;
  clonedElement: JSX.Element | null;
  ref: React.RefObject<View> | null;
  position: IPosition;
  style?: ViewStyle;
}
interface IInstance {
  from: IInstanceProp;
  to: IInstanceProp;
  [WAITING_FOR_TO_MOUNT]?: boolean;
}
interface IPosition {
  pageX: number;
  pageY: number;
  width: number;
  height: number;
  x: number;
  y: number;
}
