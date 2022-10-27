import * as React from 'react';
import {
  Animated,
  BackHandler,
  Easing,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
  View,
  NativeEventSubscription,
} from 'react-native';
import color from 'color';
// import {
//   getStatusBarHeight,
//   getBottomSpace,
// } from 'react-native-iphone-x-helper';
import Surface from '../Surface';
import {useTheme} from '../../core/theming';
import useAnimatedValue from '../../utils/useAnimatedValue';
import {addEventListener} from '../../utils/addEventListener';
import {colors} from '../../styles/tokens';

type Props = {
  /**
   * Determines whether clicking outside the modal dismiss it.
   */
  dismissable?: boolean;
  /**
   * Callback that is called when the user dismisses the modal.
   */
  onDismiss?: () => void;
  /**
   * Accessibility label for the overlay. This is read by the screen reader when the user taps outside the modal.
   */
  overlayAccessibilityLabel?: string;
  /**
   * Determines Whether the modal is visible.
   */
  visible: boolean;
  /**
   * Content of the `Modal`.
   */
  children: React.ReactNode;
  /**
   * Style for the content of the modal
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Style for the wrapper of the modal.
   * Use this prop to change the default wrapper style or to override safe area insets with marginTop and marginBottom.
   */
  style?: StyleProp<ViewStyle>;
};

const DEFAULT_DURATION = 220;
// const TOP_INSET = getStatusBarHeight(true);
// const BOTTOM_INSET = getBottomSpace();

export default function Modal({
  dismissable = true,
  visible = false,
  overlayAccessibilityLabel = 'Close modal',
  onDismiss,
  children,
  contentContainerStyle,
  style,
}: Props) {
  const visibleRef = React.useRef(visible);

  React.useEffect(() => {
    visibleRef.current = visible;
  });

  const theme = useTheme();

  const {scale} = theme.animation;

  const opacity = useAnimatedValue(visible ? 1 : 0);

  const [rendered, setRendered] = React.useState(visible);

  if (visible && !rendered) {
    setRendered(true);
  }

  const handleBack = () => {
    if (dismissable) {
      hideModal();
    }
    return true;
  };

  const subscription =
    React.useRef<NativeEventSubscription | undefined>(undefined);

  const showModal = () => {
    subscription.current?.remove();
    subscription.current = addEventListener(
      BackHandler,
      'hardwareBackPress',
      handleBack,
    );

    Animated.timing(opacity, {
      toValue: 1,
      duration: scale * DEFAULT_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const removeListeners = () => {
    if (subscription.current?.remove) {
      subscription.current?.remove();
    } else {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    }
  };

  const hideModal = () => {
    console.log('hideModal');
    removeListeners();

    Animated.timing(opacity, {
      toValue: 0,
      duration: scale * DEFAULT_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({finished}) => {
      if (!finished) {
        return;
      }

      if (visible && onDismiss) {
        onDismiss();
      }

      if (visibleRef.current) {
        showModal();
      } else {
        setRendered(false);
      }
    });
  };

  const prevVisible = React.useRef<boolean | null>(null);

  React.useEffect(() => {
    if (prevVisible.current !== visible) {
      if (visible) {
        showModal();
      } else {
        hideModal();
      }
    }
    prevVisible.current = visible;
  });

  React.useEffect(() => {
    return removeListeners;
  }, []);

  if (!rendered) return null;

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      accessibilityViewIsModal
      accessibilityLiveRegion="polite"
      style={StyleSheet.absoluteFill}
      onAccessibilityEscape={hideModal}
    >
      <TouchableWithoutFeedback
        accessibilityLabel={overlayAccessibilityLabel}
        accessibilityRole="button"
        disabled={!dismissable}
        onPress={dismissable ? hideModal : undefined}
        importantForAccessibility="no"
      >
        <Animated.View
          style={[
            styles.backdrop,
            {
              backgroundColor: color(colors.black).alpha(0.4).rgb().string(),
              opacity,
            },
          ]}
        />
      </TouchableWithoutFeedback>
      <View
        style={[
          styles.wrapper,
          //   { marginTop: TOP_INSET, marginBottom: BOTTOM_INSET },
          style,
        ]}
        pointerEvents="box-none"
      >
        <Surface
          style={
            [
              {opacity},
              styles.content,
              contentContainerStyle,
            ] as StyleProp<ViewStyle>
          }
        >
          {children}
        </Surface>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});
