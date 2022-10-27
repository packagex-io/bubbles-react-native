import * as React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput as NativeTextInput,
  StyleSheet,
  I18nManager,
  Platform,
  TextStyle,
  ColorValue,
  Text,
} from 'react-native';
import color from 'color';
import {Masks, useMaskedInputProps} from 'react-native-mask-input';
import InputLabel from './Label/InputLabel';
import type {RenderProps, ChildTextInputProps} from './types';

import {
  MAXIMIZED_LABEL_FONT_SIZE,
  MINIMIZED_LABEL_FONT_SIZE,
  LABEL_WIGGLE_X_OFFSET,
  ADORNMENT_SIZE,
  ADORNMENT_OFFSET,
} from './constants';

import {
  calculateLabelTopPosition,
  calculateInputHeight,
  calculatePadding,
  adjustPaddingOut,
  Padding,
  interpolatePlaceholder,
  calculateOutlinedIconAndAffixTopPosition,
} from './helpers';

const OUTLINE_MINIMIZED_LABEL_Y_OFFSET = -6;
const LABEL_PADDING_TOP = 8;
const MIN_HEIGHT = 80;
const MIN_DENSE_HEIGHT = 48;
const INPUT_PADDING_HORIZONTAL = 22;

const TextInputCard = ({
  disabled = false,
  editable = true,
  label,
  error = false,
  selectionColor,
  underlineColor: _underlineColor,
  outlineColor: customOutlineColor,
  activeOutlineColor,
  dense,
  style,
  theme,
  parentState,
  innerRef,
  onFocus,
  forceFocus,
  onBlur,
  onChangeText,
  onLayoutAnimatedText,
  onLeftAffixLayoutChange,
  onRightAffixLayoutChange,
  left,
  right,
  placeholderTextColor,
  ...rest
}: ChildTextInputProps) => {
  const {colors, fonts} = theme;
  const font = fonts.semiBold;
  const hasActiveOutline = parentState.focused || error;

  const [cardExpiration, setcardExpiration] = React.useState('');
  const expirationMask = [/\d/, /\d/, '/', /\d/, /\d/];
  const maskedCardExpirationInputProps = useMaskedInputProps({
    value: cardExpiration,
    onChangeText: setcardExpiration,
    mask: expirationMask,
  });

  const [cardNumber, setcardNumber] = React.useState('');
  const maskedCardNumberInputProps = useMaskedInputProps({
    value: cardNumber,
    onChangeText: setcardNumber,
    mask: Masks.CREDIT_CARD,
  });

  const [cardCVC, setCardCVC] = React.useState('');
  const CVCMask = [/\d/, /\d/, /\d/];
  const maskedCardCVCInputProps = useMaskedInputProps({
    value: cardCVC,
    onChangeText: setCardCVC,
    mask: CVCMask,
  });

  const {
    fontSize: fontSizeStyle,
    fontWeight,
    lineHeight,
    height,
    backgroundColor = colors.surface,
    textAlign,
    ...viewStyle
  } = (StyleSheet.flatten(style) || {}) as TextStyle;
  const fontSize = fontSizeStyle || MAXIMIZED_LABEL_FONT_SIZE;

  let inputTextColor, activeColor, outlineColor, placeholderColor, errorColor;

  if (disabled) {
    const isTransparent = color(customOutlineColor).alpha() === 0;
    inputTextColor = activeColor = color(colors.text)
      .alpha(0.54)
      .rgb()
      .string();
    placeholderColor = colors.disabled;
    outlineColor = isTransparent ? customOutlineColor : colors.disabled;
  } else {
    inputTextColor = colors.text;
    activeColor = error ? colors.error : activeOutlineColor || colors.primary;
    placeholderColor = colors.placeholder;
    outlineColor = customOutlineColor || colors.placeholder;
    errorColor = colors.error;
  }
  const minInputHeight =
    (dense ? MIN_DENSE_HEIGHT : MIN_HEIGHT) - LABEL_PADDING_TOP;

  const labelScale = MINIMIZED_LABEL_FONT_SIZE / fontSize;
  const fontScale = MAXIMIZED_LABEL_FONT_SIZE / fontSize;

  const labelHeight = parentState.labelLayout.height;
  const labelHalfHeight = labelHeight / 2;

  const inputHeight = calculateInputHeight(labelHeight, height, minInputHeight);

  const paddingSettings = {
    height: height ? +height : null,
    labelHalfHeight,
    offset: LABEL_PADDING_TOP,
    dense: dense ? dense : null,
    topPosition: 24,
    fontSize,
    lineHeight,
    label,
    scale: fontScale,
    isAndroid: Platform.OS === 'android',
    multiline: null,
    styles: StyleSheet.flatten(
      dense ? styles.inputOutlinedDense : styles.inputOutlined,
    ) as Padding,
  };

  const pad = calculatePadding(paddingSettings);

  const paddingOut = adjustPaddingOut({...paddingSettings, pad});

  const InputProps = {
    ...rest,
    ref: innerRef,
    // onChangeText,
    // placeholder: label ? parentState.placeholder : rest.placeholder,
    placeholderTextColor: placeholderTextColor || placeholderColor,
    editable: !disabled && editable,
    selectionColor:
      typeof selectionColor === 'undefined' ? activeColor : selectionColor,
    onFocus,
    onBlur,
    underlineColorAndroid: 'transparent',

    style: [
      styles.input,

      {height: inputHeight},
      paddingOut,
      {
        ...font,
        fontSize: 14,
        top: 32,
        fontWeight,
        color: inputTextColor,
        textAlignVertical: 'top',
        textAlign: textAlign ? textAlign : I18nManager.isRTL ? 'right' : 'left',
      },
    ],
  } as RenderProps;

  const CardNumber = {
    ...InputProps,
    style: [
      ...InputProps.style,
      {width: '60%'},
      Platform.OS === 'web' && {outline: 'none', fontFamily: 'Inter'},
    ],
    ...maskedCardNumberInputProps,
    placeholder: 'Card Number',
  };
  const CardExpiration = {
    ...InputProps,
    style: [
      ...InputProps.style,
      Platform.OS === 'web' && {outline: 'none', fontFamily: 'Inter'},
      {paddingLeft: 0, paddingRight: 0, borderRadius: 0, width: '50%'},
    ],
    ...maskedCardExpirationInputProps,
    placeholder: 'MM/YY',
  };
  const CardCVC = {
    ...InputProps,
    ...maskedCardCVCInputProps,
    placeholder: 'CVC',
    style: [
      ...InputProps.style,
      Platform.OS === 'web' && {outline: 'none', fontFamily: 'Inter'},
      {
        paddingLeft: 0,
        paddingRight: 0,
        borderRadius: 0,
        width: '50%',
      },
    ],
  };

  return (
    <KeyboardAvoidingView
      style={{...viewStyle}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        testID="text-input-outline"
        pointerEvents="none"
        style={[
          styles.outline,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor,
            borderRadius: theme.roundness,
            borderWidth: parentState.focused ? 2 : 1,
            borderColor: hasActiveOutline ? activeColor : outlineColor,
          },
        ]}
      />
      <Text
        style={[
          styles.label,
          {...font},
          Platform.OS === 'web' && {
            minWidth: 0,
            position: 'absolute',
            top: 28,
          },
        ]}
      >
        {label}
      </Text>
      <View style={[styles.row, Platform.OS === 'web' && {paddingTop: 24}]}>
        <NativeTextInput {...CardNumber} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '35%',
          }}
        >
          <NativeTextInput {...CardExpiration} />
          <NativeTextInput {...CardCVC} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TextInputCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
  },
  outline: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 6,
    bottom: 0,
  },
  labelContainer: {
    paddingBottom: 0,
  },
  input: {
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
    margin: 0,
    zIndex: 1,
    lineHeight: 22,
  },
  inputOutlined: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  inputOutlinedDense: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  label: {
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    fontSize: 10,
    top: 24,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
  },
});
