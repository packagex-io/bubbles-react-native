//TODO cleanup and typescript
import React from "react";
import {
  Animated,
  Easing,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  /**
   * Elements to render. leftContent and rightContent are rendered under the children when you swipe in that direction.
   * Similarly leftButtons and rightButtons are rendered under the children when you swipe in that direction.
   */
  children: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  leftButtons?: React.ReactNode[];
  rightButtons?: React.ReactNode[];
  /**
   * Left action lifecycle
   */
  onLeftActionActivate?: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => void;
  onLeftActionDeactivate?: () => void;
  onLeftActionRelease?: () => void;
  onLeftActionComplete?: () => void;
  leftActionActivationDistance?: number;
  leftActionReleaseAnimationFn?: (
    value: Animated.Value | Animated.ValueXY,
    config: Animated.TimingAnimationConfig
  ) => Animated.CompositeAnimation;
  leftActionReleaseAnimationConfig?: Animated.TimingAnimationConfig;

  /**
   *
   * Right action lifecycle
   *
   */
  onRightActionActivate?: () => void;
  onRightActionDeactivate?: () => void;
  onRightActionRelease?: () => void;
  onRightActionComplete?: () => void;
  rightActionActivationDistance?: number;
  rightActionReleaseAnimationFn?: (
    value: Animated.Value | Animated.ValueXY,
    config: Animated.TimingAnimationConfig
  ) => Animated.CompositeAnimation;
  rightActionReleaseAnimationConfig?: Animated.TimingAnimationConfig;

  /**
   *
   * Left buttons lifecycle
   *
   */
  onLeftButtonsActivate?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => void;
  onLeftButtonsDeactivate?: () => void;
  onLeftButtonsOpenRelease?: () => void;
  onLeftButtonsOpenComplete?: () => void;
  onLeftButtonsCloseRelease?: () => void;
  onLeftButtonsCloseComplete?: () => void;
  leftButtonsActivationDistance?: number;
  leftButtonsOpenReleaseAnimationFn?: (
    value: Animated.Value | Animated.ValueXY,
    config: Animated.TimingAnimationConfig
  ) => Animated.CompositeAnimation;
  leftButtonsOpenReleaseAnimationConfig?: Animated.TimingAnimationConfig;
  leftButtonsCloseReleaseAnimationFn?: (
    value: Animated.Value | Animated.ValueXY,
    config: Animated.TimingAnimationConfig
  ) => Animated.CompositeAnimation;
  leftButtonsCloseReleaseAnimationConfig?: Animated.TimingAnimationConfig;
  onLeftButtonsOverSwipe: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    overSwiped: boolean
  ) => void;
  onLeftButtonsOverSwipeRelease: (
    event?: GestureResponderEvent,
    gestureState?: PanResponderGestureState
  ) => void;

  /**
   * Right buttons lifecycle
   */
  onRightButtonsActivate?: () => void;

  onRightButtonsDeactivate?: () => void;
  onRightButtonsOpenRelease?: () => void;
  onRightButtonsOpenComplete?: () => void;
  onRightButtonsCloseRelease?: () => void;
  onRightButtonsCloseComplete?: () => void;
  rightButtonsActivationDistance?: number;
  rightButtonsOpenReleaseAnimationFn?: (
    value: Animated.Value | Animated.ValueXY,
    config: Animated.TimingAnimationConfig
  ) => Animated.CompositeAnimation;
  rightButtonsOpenReleaseAnimationConfig?: Animated.TimingAnimationConfig;
  rightButtonsCloseReleaseAnimationFn?: (
    value: Animated.Value | Animated.ValueXY,
    config: Animated.TimingAnimationConfig
  ) => Animated.CompositeAnimation;
  onRightButtonsOverSwipe: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    overSwiped: boolean
  ) => void;
  onRightButtonsOverSwipeRelease: (
    event?: GestureResponderEvent,
    gestureState?: PanResponderGestureState
  ) => void;

  rightButtonsCloseReleaseAnimationConfig?: Animated.TimingAnimationConfig;

  onSwipeStart?: () => void;
  onSwipeMove?: (x: number, y: number) => void;
  onSwipeRelease?: (x: number, y: number) => void;
  onSwipeComplete?: (x: number, y: number) => void;
  swipeReleaseAnimationFn?: (
    value: Animated.Value | Animated.ValueXY,
    config: Animated.TimingAnimationConfig
  ) => Animated.CompositeAnimation;
  swipeReleaseAnimationConfig?: Animated.TimingAnimationConfig;

  onRef?: (ref: Swipeable) => void;
  onPanAnimatedValueRef?: (ref: Animated.Value | Animated.ValueXY) => void;
  swipeStartMinDistance?: number;

  /**
   * Styles
   */
  style?: ViewStyle;
  leftContainerStyle?: ViewStyle;
  leftButtonContainerStyle?: ViewStyle;
  rightContainerStyle?: ViewStyle;
  rightButtonContainerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
};

function noop() {}

export default class Swipeable extends React.PureComponent<Props> {
  static defaultProps = {
    leftContent: null,
    rightContent: null,
    leftButtons: null,
    rightButtons: null,

    // left action lifecycle
    onLeftActionActivate: noop,
    onLeftActionDeactivate: noop,
    onLeftActionRelease: noop,
    onLeftActionComplete: noop,
    leftActionActivationDistance: 125,
    leftActionReleaseAnimationFn: null,
    leftActionReleaseAnimationConfig: null,

    // right action lifecycle
    onRightActionActivate: noop,
    onRightActionDeactivate: noop,
    onRightActionRelease: noop,
    onRightActionComplete: noop,
    rightActionActivationDistance: 125,
    rightActionReleaseAnimationFn: null,
    rightActionReleaseAnimationConfig: null,

    // left buttons lifecycle
    onLeftButtonsActivate: noop,
    onLeftButtonsDeactivate: noop,
    onLeftButtonsOpenRelease: noop,
    onLeftButtonsOpenComplete: noop,
    onLeftButtonsCloseRelease: noop,
    onLeftButtonsCloseComplete: noop,
    leftButtonWidth: 75,
    leftButtonsActivationDistance: 75,
    leftButtonsOpenReleaseAnimationFn: null,
    leftButtonsOpenReleaseAnimationConfig: null,
    leftButtonsCloseReleaseAnimationFn: null,
    leftButtonsCloseReleaseAnimationConfig: null,
    onLeftButtonsOverSwipe: noop,
    onLeftButtonsOverSwipeRelease: noop,

    // right buttons lifecycle
    onRightButtonsActivate: noop,
    onRightButtonsDeactivate: noop,
    onRightButtonsOpenRelease: noop,
    onRightButtonsOpenComplete: noop,
    onRightButtonsCloseRelease: noop,
    onRightButtonsCloseComplete: noop,
    rightButtonWidth: 75,
    rightButtonsActivationDistance: 75,
    rightButtonsOpenReleaseAnimationFn: null,
    rightButtonsOpenReleaseAnimationConfig: null,
    rightButtonsCloseReleaseAnimationFn: null,
    rightButtonsCloseReleaseAnimationConfig: null,
    onRightButtonsOverSwipe: noop,
    onRightButtonsOverSwipeRelease: noop,

    // base swipe lifecycle
    onSwipeStart: noop,
    onSwipeMove: noop,
    onSwipeRelease: noop,
    onSwipeComplete: noop,
    swipeReleaseAnimationFn: Animated.timing,
    swipeReleaseAnimationConfig: {
      toValue: { x: 0, y: 0 },
      duration: 250,
      easing: Easing.elastic(0.5),
      useNativeDriver: false,
    },

    // misc
    onRef: noop,
    onPanAnimatedValueRef: noop,
    swipeStartMinDistance: 15,
  };

  state = {
    pan: new Animated.ValueXY(),
    width: 0,
    lastOffset: { x: 0, y: 0 },
    leftActionActivated: false,
    leftButtonsActivated: false,
    leftButtonsOpen: false,
    rightActionActivated: false,
    rightButtonsActivated: false,
    rightButtonsOpen: false,
    rightButtonsOverSwipe: false,
    leftButtonsOverSwipe: false,
    rightButtonsOverSwipeThreshold: 175,
    leftButtonsOverSwipeThreshold: 175, //todo move to props
  };

  componentDidMount() {
    const { onPanAnimatedValueRef, onRef } = this.props;

    onRef(this);
    onPanAnimatedValueRef(this.state.pan);
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  recenter = (
    animationFn = this.props.swipeReleaseAnimationFn,
    animationConfig = this.props.swipeReleaseAnimationConfig,
    onDone = noop
  ) => {
    const { pan } = this.state;

    this.setState({
      lastOffset: { x: 0, y: 0 },
      leftActionActivated: false,
      leftButtonsActivated: false,
      leftButtonsOpen: false,
      rightActionActivated: false,
      rightButtonsActivated: false,
      rightButtonsOpen: false,
      rightButtonsOverSwipe: false,
      leftButtonsOverSwipe: false,
    });

    pan.flattenOffset();

    animationFn(pan, animationConfig).start(onDone);
  };

  _unmounted = false;

  _handlePan = Animated.event(
    [
      null,
      {
        dx: this.state.pan.x,
        dy: this.state.pan.y,
      },
    ],
    { useNativeDriver: false }
  );

  _handleMoveShouldSetPanResponder = (event, gestureState) =>
    Math.abs(gestureState.dx) > this.props.swipeStartMinDistance;

  _handlePanResponderStart = (event, gestureState) => {
    const { lastOffset, pan } = this.state;

    pan.setOffset(lastOffset);
    this.props.onSwipeStart(event, gestureState, this);
  };

  _handlePanResponderMove = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    const {
      leftActionActivationDistance,
      leftButtonsActivationDistance,
      onLeftActionActivate,
      onLeftActionDeactivate,
      onLeftButtonsActivate,
      onLeftButtonsDeactivate,
      rightActionActivationDistance,
      rightButtonsActivationDistance,
      onRightActionActivate,
      onRightActionDeactivate,
      onRightButtonsActivate,
      onRightButtonsDeactivate,
      onSwipeMove,
      onRightButtonsOverSwipe,
      onLeftButtonsOverSwipe,
    } = this.props;
    const {
      lastOffset,
      leftActionActivated,
      leftButtonsActivated,
      rightActionActivated,
      rightButtonsActivated,
      rightButtonsOverSwipeThreshold,
      rightButtonsOverSwipe,
      leftButtonsOverSwipeThreshold,
      leftButtonsOverSwipe,
    } = this.state;
    const { dx, vx } = gestureState;
    const x = dx + lastOffset.x;
    const canSwipeRight = this._canSwipeRight();
    const canSwipeLeft = this._canSwipeLeft();
    const hasLeftButtons = this._hasLeftButtons();
    const hasRightButtons = this._hasRightButtons();
    const isSwipingLeft = vx < 0;
    const isSwipingRight = vx > 0;
    let nextLeftActionActivated = leftActionActivated;
    let nextLeftButtonsActivated = leftButtonsActivated;
    let nextRightActionActivated = rightActionActivated;
    let nextRightButtonsActivated = rightButtonsActivated;
    let nextRightButtonsOverSwipe = rightButtonsOverSwipe;
    let nextLeftButtonsOverSwipe = leftButtonsOverSwipe;

    this._handlePan(event, gestureState);
    onSwipeMove(event, gestureState);

    if (
      !leftActionActivated &&
      canSwipeRight &&
      x >= leftActionActivationDistance
    ) {
      nextLeftActionActivated = true;
      onLeftActionActivate(event, gestureState);
    }

    if (
      leftActionActivated &&
      canSwipeRight &&
      x < leftActionActivationDistance
    ) {
      nextLeftActionActivated = false;
      onLeftActionDeactivate(event, gestureState);
    }

    if (
      !rightActionActivated &&
      canSwipeLeft &&
      x <= -rightActionActivationDistance
    ) {
      nextRightActionActivated = true;
      onRightActionActivate(event, gestureState);
    }

    if (
      rightActionActivated &&
      canSwipeLeft &&
      x > -rightActionActivationDistance
    ) {
      nextRightActionActivated = false;
      onRightActionDeactivate(event, gestureState);
    }

    if (
      !leftButtonsActivated &&
      hasLeftButtons &&
      !isSwipingLeft &&
      x >= leftButtonsActivationDistance
    ) {
      nextLeftButtonsActivated = true;
      onLeftButtonsActivate(event, gestureState);
    }

    if (
      leftButtonsActivated &&
      hasLeftButtons &&
      !isSwipingLeft &&
      x >= leftButtonsOverSwipeThreshold &&
      !leftButtonsOverSwipe
    ) {
      nextLeftButtonsOverSwipe = true;
      onLeftButtonsOverSwipe(event, gestureState, true);
    }
    if (x < leftButtonsOverSwipeThreshold && leftButtonsOverSwipe) {
      onLeftButtonsOverSwipe(event, gestureState, false);
      nextLeftButtonsOverSwipe = false;
    }

    if (leftButtonsActivated && hasLeftButtons && isSwipingLeft) {
      nextLeftButtonsActivated = false;
      onLeftButtonsDeactivate(event, gestureState);
    }

    if (
      !rightButtonsActivated &&
      hasRightButtons &&
      !isSwipingRight &&
      x <= -rightButtonsActivationDistance
    ) {
      nextRightButtonsActivated = true;
      onRightButtonsActivate(event, gestureState);
    }

    if (
      rightButtonsActivated &&
      hasRightButtons &&
      !isSwipingRight &&
      x <= -rightButtonsOverSwipeThreshold &&
      !rightButtonsOverSwipe
    ) {
      nextRightButtonsOverSwipe = true;
      onRightButtonsOverSwipe(event, gestureState, true);
    }

    if (x > -rightButtonsOverSwipeThreshold && rightButtonsOverSwipe) {
      onRightButtonsOverSwipe(event, gestureState, false);
      nextRightButtonsOverSwipe = false;
    }

    if (rightButtonsActivated && hasRightButtons && isSwipingRight) {
      nextRightButtonsActivated = false;
      onRightButtonsDeactivate(event, gestureState);
    }

    const needsUpdate =
      nextLeftActionActivated !== leftActionActivated ||
      nextLeftButtonsActivated !== leftButtonsActivated ||
      nextRightActionActivated !== rightActionActivated ||
      nextRightButtonsActivated !== rightButtonsActivated ||
      nextRightButtonsOverSwipe !== rightButtonsOverSwipe ||
      nextLeftButtonsOverSwipe !== leftButtonsOverSwipe;

    if (needsUpdate) {
      this.setState({
        leftActionActivated: nextLeftActionActivated,
        leftButtonsActivated: nextLeftButtonsActivated,
        rightActionActivated: nextRightActionActivated,
        rightButtonsActivated: nextRightButtonsActivated,
        rightButtonsOverSwipe: nextRightButtonsOverSwipe,
        leftButtonsOverSwipe: nextLeftButtonsOverSwipe,
      });
    }
  };

  _handlePanResponderEnd = (event, gestureState) => {
    const {
      onLeftActionRelease,
      onLeftActionDeactivate,
      onLeftButtonsOpenRelease,
      onLeftButtonsCloseRelease,
      onRightActionRelease,
      onRightActionDeactivate,
      onRightButtonsOpenRelease,
      onRightButtonsCloseRelease,
      onSwipeRelease,
      onRightButtonsOverSwipeRelease,
      onLeftButtonsOverSwipeRelease,
    } = this.props;
    const {
      leftActionActivated,
      leftButtonsOpen,
      leftButtonsActivated,
      rightActionActivated,
      rightButtonsOpen,
      rightButtonsActivated,
      pan,
      rightButtonsOverSwipe,
      leftButtonsOverSwipe,
    } = this.state;
    const animationFn = this._getReleaseAnimationFn();
    const animationConfig = this._getReleaseAnimationConfig();

    onSwipeRelease(event, gestureState, this);

    if (leftActionActivated) {
      onLeftActionRelease(event, gestureState, this);
    }

    if (rightActionActivated) {
      onRightActionRelease(event, gestureState, this);
    }

    if (leftButtonsActivated && !leftButtonsOpen) {
      onLeftButtonsOpenRelease(event, gestureState, this);
      if (leftButtonsOverSwipe)
        onLeftButtonsOverSwipeRelease(event, gestureState);
    }

    if (!leftButtonsActivated && leftButtonsOpen) {
      onLeftButtonsCloseRelease(event, gestureState, this);
    }

    if (rightButtonsActivated && !rightButtonsOpen) {
      onRightButtonsOpenRelease(event, gestureState, this);
      if (rightButtonsOverSwipe)
        onRightButtonsOverSwipeRelease(event, gestureState);
    }

    if (!rightButtonsActivated && rightButtonsOpen) {
      onRightButtonsCloseRelease(event, gestureState, this);
    }

    this.setState({
      lastOffset: {
        x: animationConfig.toValue.x,
        y: animationConfig.toValue.y,
      },
      leftActionActivated: false,
      rightActionActivated: false,
      leftButtonsOpen: leftButtonsActivated,
      rightButtonsOpen: rightButtonsActivated,
    });

    pan.flattenOffset();

    animationFn(pan, animationConfig).start(() => {
      if (this._unmounted) {
        return;
      }

      const {
        onLeftActionComplete,
        onLeftButtonsOpenComplete,
        onLeftButtonsCloseComplete,
        onRightActionComplete,
        onRightButtonsOpenComplete,
        onRightButtonsCloseComplete,
        onSwipeComplete,
      } = this.props;

      onSwipeComplete(event, gestureState);

      if (leftActionActivated) {
        onLeftActionComplete(event, gestureState);
        onLeftActionDeactivate(event, gestureState);
      }

      if (rightActionActivated) {
        onRightActionComplete(event, gestureState);
        onRightActionDeactivate(event, gestureState);
      }

      if (leftButtonsActivated && !leftButtonsOpen) {
        onLeftButtonsOpenComplete(event, gestureState);
      }

      if (!leftButtonsActivated && leftButtonsOpen) {
        onLeftButtonsCloseComplete(event, gestureState);
      }

      if (rightButtonsActivated && !rightButtonsOpen) {
        onRightButtonsOpenComplete(event, gestureState);
      }

      if (!rightButtonsActivated && rightButtonsOpen) {
        onRightButtonsCloseComplete(event, gestureState);
      }
    });
  };

  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
    onMoveShouldSetPanResponderCapture: this._handleMoveShouldSetPanResponder,
    onPanResponderGrant: this._handlePanResponderStart,
    onPanResponderMove: this._handlePanResponderMove,
    onPanResponderRelease: this._handlePanResponderEnd,
    onPanResponderTerminate: this._handlePanResponderEnd,
    onPanResponderTerminationRequest: this._handlePanResponderEnd,
  });

  _handleLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }) => this.setState({ width });

  _canSwipeRight() {
    return this.props.leftContent || this._hasLeftButtons();
  }

  _canSwipeLeft() {
    return this.props.rightContent || this._hasRightButtons();
  }

  _hasLeftButtons() {
    const { leftButtons, leftContent } = this.props;

    return !leftContent && leftButtons && leftButtons.length;
  }

  _hasRightButtons() {
    const { rightButtons, rightContent } = this.props;

    return !rightContent && rightButtons && rightButtons.length;
  }

  _getReleaseAnimationFn() {
    const {
      leftActionReleaseAnimationFn,
      leftButtonsOpenReleaseAnimationFn,
      leftButtonsCloseReleaseAnimationFn,
      rightActionReleaseAnimationFn,
      rightButtonsOpenReleaseAnimationFn,
      rightButtonsCloseReleaseAnimationFn,
      swipeReleaseAnimationFn,
    } = this.props;
    const {
      leftActionActivated,
      leftButtonsActivated,
      leftButtonsOpen,
      rightActionActivated,
      rightButtonsActivated,
      rightButtonsOpen,
    } = this.state;

    if (leftActionActivated && leftActionReleaseAnimationFn) {
      return leftActionReleaseAnimationFn;
    }

    if (rightActionActivated && rightActionReleaseAnimationFn) {
      return rightActionReleaseAnimationFn;
    }

    if (leftButtonsActivated && leftButtonsOpenReleaseAnimationFn) {
      return leftButtonsOpenReleaseAnimationFn;
    }

    if (
      !leftButtonsActivated &&
      leftButtonsOpen &&
      leftButtonsCloseReleaseAnimationFn
    ) {
      return leftButtonsCloseReleaseAnimationFn;
    }

    if (rightButtonsActivated && rightButtonsOpenReleaseAnimationFn) {
      return rightButtonsOpenReleaseAnimationFn;
    }

    if (
      !rightButtonsActivated &&
      rightButtonsOpen &&
      rightButtonsCloseReleaseAnimationFn
    ) {
      return rightButtonsCloseReleaseAnimationFn;
    }

    return swipeReleaseAnimationFn;
  }

  _getReleaseAnimationConfig() {
    const {
      leftActionReleaseAnimationConfig,
      leftButtons,
      leftButtonsOpenReleaseAnimationConfig,
      leftButtonsCloseReleaseAnimationConfig,
      leftButtonWidth,
      rightActionReleaseAnimationConfig,
      rightButtons,
      rightButtonsOpenReleaseAnimationConfig,
      rightButtonsCloseReleaseAnimationConfig,
      rightButtonWidth,
      swipeReleaseAnimationConfig,
    } = this.props;
    const {
      leftActionActivated,
      leftButtonsActivated,
      leftButtonsOpen,
      rightActionActivated,
      rightButtonsActivated,
      rightButtonsOpen,
      rightButtonsOverSwipe,
      leftButtonsOverSwipe,
    } = this.state;

    if (leftActionActivated && leftActionReleaseAnimationConfig) {
      return leftActionReleaseAnimationConfig;
    }

    if (rightActionActivated && rightActionReleaseAnimationConfig) {
      return rightActionReleaseAnimationConfig;
    }

    if (leftButtonsActivated) {
      if (!leftButtonsOverSwipe)
        return {
          ...swipeReleaseAnimationConfig,
          toValue: {
            x: leftButtons.length * leftButtonWidth,
            y: 0,
          },
          ...leftButtonsOpenReleaseAnimationConfig,
        };
    }

    if (rightButtonsActivated) {
      if (!rightButtonsOverSwipe)
        return {
          ...swipeReleaseAnimationConfig,
          toValue: {
            x: rightButtons.length * rightButtonWidth * -1,
            y: 0,
          },
          ...rightButtonsOpenReleaseAnimationConfig,
        };
    }

    if (
      !leftButtonsActivated &&
      leftButtonsOpen &&
      leftButtonsCloseReleaseAnimationConfig
    ) {
      return leftButtonsCloseReleaseAnimationConfig;
    }

    if (
      !rightButtonsActivated &&
      rightButtonsOpen &&
      rightButtonsCloseReleaseAnimationConfig
    ) {
      return rightButtonsCloseReleaseAnimationConfig;
    }

    return swipeReleaseAnimationConfig;
  }

  _renderButtons(buttons: React.ReactNode[], isLeftButtons: boolean) {
    const { leftButtonContainerStyle, rightButtonContainerStyle } = this.props;
    const { pan, width, rightButtonsOverSwipe, leftButtonsOverSwipe } =
      this.state;
    const canSwipeLeft = this._canSwipeLeft();
    const canSwipeRight = this._canSwipeRight();
    const count = buttons.length;
    const leftEnd = canSwipeLeft ? -width : 0;
    const rightEnd = canSwipeRight ? width : 0;
    const inputRange = isLeftButtons ? [0, rightEnd] : [leftEnd, 0];
    const lastButtonIndex = count - 1;

    return buttons.map((buttonContent: React.ReactNode, index: number) => {
      const outputMultiplier =
        (isLeftButtons && leftButtonsOverSwipe) ||
        (!isLeftButtons && rightButtonsOverSwipe && index === lastButtonIndex)
          ? 0
          : -index / count; // On overswipe, the last button should fill the entire swipeable area
      const outputRange = isLeftButtons
        ? [0, rightEnd * outputMultiplier]
        : [leftEnd * outputMultiplier, 0];
      let transform = [
        {
          translateX: pan.x.interpolate({
            inputRange,
            outputRange,
            extrapolate: "clamp",
          }),
        },
      ];

      const buttonStyle = [
        StyleSheet.absoluteFill,
        {
          width,
          transform,
        },
        isLeftButtons ? leftButtonContainerStyle : rightButtonContainerStyle,
      ];

      return (
        <Animated.View key={index} style={buttonStyle}>
          {buttonContent}
        </Animated.View>
      );
    });
  }

  render() {
    const {
      children,
      contentContainerStyle,
      leftButtons,
      leftContainerStyle,
      leftContent,
      rightButtons,
      rightContainerStyle,
      rightContent,
      style,
      ...props
    } = this.props;
    const { pan, width } = this.state;
    const canSwipeLeft = this._canSwipeLeft();
    const canSwipeRight = this._canSwipeRight();
    const transform = [
      {
        translateX: pan.x.interpolate({
          inputRange: [canSwipeLeft ? -width : 0, canSwipeRight ? width : 0],
          outputRange: [
            canSwipeLeft ? -width + StyleSheet.hairlineWidth : 0,
            canSwipeRight ? width - StyleSheet.hairlineWidth : 0,
          ],
          extrapolate: "clamp",
        }),
      },
    ];

    return (
      <View
        onLayout={this._handleLayout}
        style={[styles.container, style]}
        {...this._panResponder.panHandlers}
        {...props}
      >
        {canSwipeRight && (
          <Animated.View
            style={[
              { transform, marginLeft: -width, width },
              leftContainerStyle,
            ]}
          >
            {leftContent || this._renderButtons(leftButtons, true)}
          </Animated.View>
        )}
        <Animated.View
          style={[{ transform }, styles.content, contentContainerStyle]}
        >
          {children}
        </Animated.View>
        {canSwipeLeft && (
          <Animated.View
            style={[
              { transform, marginRight: -width, width },
              rightContainerStyle,
            ]}
          >
            {rightContent || this._renderButtons(rightButtons, false)}
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  content: {
    flex: 1,
  },
});
