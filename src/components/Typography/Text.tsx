import * as React from "react";
import {
  Text as NativeText,
  TextStyle,
  StyleProp,
  StyleSheet,
  I18nManager,
  Platform,
} from "react-native";
import { useTheme } from "../../core/theming";
import { colors } from "../../styles/tokens";
import { BodyType, Font, HeadlinesType, Theme } from "../../types";

type Props = React.ComponentProps<typeof NativeText> & {
  /**
   *
   * Variant defines appropriate text styles for type role and its size.
   */
  variant?: keyof typeof HeadlinesType | keyof typeof BodyType;
  children: React.ReactNode;
  theme?: Theme;
  style?: StyleProp<TextStyle>;
};

const Text: React.ForwardRefRenderFunction<{}, Props> = (
  { style, variant = "Body", theme: initialTheme, ...rest }: Props,
  ref
) => {
  const root = React.useRef<NativeText | null>(null);
  // FIXME: destructure it in TS 4.6+
  const theme = useTheme(initialTheme);
  const writingDirection = I18nManager.isRTL ? "rtl" : "ltr";

  React.useImperativeHandle(ref, () => ({
    setNativeProps: (args: Object) => root.current?.setNativeProps(args),
  }));

  if (variant) {
    const stylesByVariant = Object.keys(
      Object.assign({}, HeadlinesType, BodyType)
    ).reduce(
      (acc, key) => {
        const { fontSize, fontWeight, lineHeight, letterSpacing, fontFamily } =
          theme.typescale[key as keyof typeof HeadlinesType | BodyType];

        return {
          ...acc,
          [key]: {
            ...(Platform.OS === "android" && { fontFamily }),
            fontSize,
            fontWeight,
            lineHeight,
            letterSpacing,
            color: colors.black,
          },
        };
      },
      {} as {
        [key in HeadlinesType | BodyType]: {
          fontSize: number;
          fontWeight: Font["fontWeight"];
          lineHeight: number;
          letterSpacing: number;
        };
      }
    );

    const styleForVariant = stylesByVariant[variant];

    return (
      <NativeText
        ref={root}
        style={[styleForVariant, styles.text, { writingDirection }, style]}
        {...rest}
      />
    );
  } else {
    return (
      <NativeText
        {...rest}
        ref={root}
        style={[
          {
            ...theme.fonts?.regular,
            color: theme.colors.fg.default,
          } as StyleProp<TextStyle>,
          styles.text,
          style,
          Platform.OS === "web" && { fontFamily: "Inter" },
        ]}
      />
    );
  }
};

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
  },
});

export default React.forwardRef(Text);
