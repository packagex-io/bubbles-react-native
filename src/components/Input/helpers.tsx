import type { Animated } from "react-native";
import {
  LABEL_PADDING_HORIZONTAL,
  ADORNMENT_OFFSET,
  ADORNMENT_SIZE,
  FLAT_INPUT_OFFSET,
} from "./constants";
import type { Mask } from "./formatWithMask";
import type { TextInputLabelProp, ValidationType } from "./types";

type PaddingProps = {
  height: number | null;
  labelHalfHeight: number;
  multiline: boolean | null;
  dense: boolean | null;
  topPosition: number;
  fontSize: number;
  lineHeight?: number;
  label?: TextInputLabelProp | null;
  scale: number;
  offset: number;
  isAndroid: boolean;
  styles: { paddingTop: number; paddingBottom: number };
};

type AdjProps = PaddingProps & {
  pad: number;
};

export type Padding = { paddingTop: number; paddingBottom: number };

export const calculateLabelTopPosition = (
  labelHeight: number,
  height: number = 0,
  optionalPadding: number = 0
): number => {
  const customHeight = height > 0 ? height : 0;

  return Math.floor((customHeight - labelHeight) / 2 + optionalPadding);
};

export const calculateInputHeight = (
  labelHeight: number,
  height: any = 0,
  minHeight: number
): number => {
  const finalHeight = height > 0 ? height : labelHeight;

  if (height > 0) return height;
  return finalHeight < minHeight ? minHeight : finalHeight;
};

export const calculatePadding = (props: PaddingProps): number => {
  const { height, multiline = false } = props;

  let result = 0;

  if (multiline) {
    if (height && multiline) {
      result = calculateTextAreaPadding(props);
    } else {
      result = calculateInputPadding(props);
    }
  }

  return Math.max(0, result);
};

const calculateTextAreaPadding = (props: PaddingProps) => {
  const { dense } = props;

  return dense ? 10 : 20;
};

const calculateInputPadding = ({
  topPosition,
  fontSize,
  multiline,
  scale,
  dense,
  offset,
  isAndroid,
}: PaddingProps): number => {
  const refFontSize = scale * fontSize;
  let result = Math.floor(topPosition / 2);

  result =
    result +
    Math.floor((refFontSize - fontSize) / 2) -
    (scale < 1 ? offset / 2 : 0);

  if (multiline && isAndroid)
    result = Math.min(dense ? offset / 2 : offset, result);

  return result;
};

export const adjustPaddingOut = ({
  pad,
  multiline,
  label,
  scale,
  height,
  fontSize,
  lineHeight,
  dense,
  offset,
  isAndroid,
}: AdjProps): Padding => {
  const fontHeight = lineHeight ?? fontSize;
  const refFontHeight = scale * fontSize;
  let result = pad;

  if (height && !multiline) {
    return {
      paddingTop: Math.max(0, (height - fontHeight) / 2),
      paddingBottom: Math.max(0, (height - fontHeight) / 2),
    };
  }
  if (!isAndroid && multiline) {
    if (dense) {
      if (label) {
        result += scale < 1 ? Math.min(offset, (refFontHeight / 2) * scale) : 0;
      } else {
        result += 0;
      }
    }
    if (!dense) {
      if (label) {
        result +=
          scale < 1
            ? Math.min(offset, refFontHeight * scale)
            : Math.min(offset / 2, refFontHeight * scale);
      } else {
        result += scale < 1 ? Math.min(offset / 2, refFontHeight * scale) : 0;
      }
    }
    result = Math.floor(result);
  }
  return {
    paddingTop: !isAndroid && multiline ? 4 : result,
    paddingBottom: isAndroid ? 4 * result : 2 * result,
  };
};

export const adjustPaddingFlat = ({
  pad,
  scale,
  multiline,
  label,
  height,
  offset,
  dense,
  fontSize,
  isAndroid,
  styles,
}: AdjProps): Padding => {
  let result = pad;
  let topResult = result;
  let bottomResult = result;
  const { paddingTop, paddingBottom } = styles;
  const refFontSize = scale * fontSize;

  if (!multiline) {
    // do not modify padding if input is not multiline
    if (label) {
      // return const style for flat input with label
      return { paddingTop, paddingBottom };
    }
    // return pad for flat input without label
    return { paddingTop: result, paddingBottom: result };
  }

  if (label) {
    // add paddings passed from styles
    topResult = paddingTop;
    bottomResult = paddingBottom;

    // adjust top padding for iOS
    if (!isAndroid) {
      if (dense) {
        topResult +=
          scale < 1
            ? Math.min(result, refFontSize * scale) - result / 2
            : Math.min(result, refFontSize * scale) - result / 2;
      }
      if (!dense) {
        topResult +=
          scale < 1
            ? Math.min(offset / 2, refFontSize * scale)
            : Math.min(result, refFontSize * scale) - offset / 2;
      }
    }
    topResult = Math.floor(topResult);
  } else {
    if (height) {
      // center text when height is passed
      return {
        paddingTop: Math.max(0, (height - fontSize) / 2),
        paddingBottom: Math.max(0, (height - fontSize) / 2),
      };
    }
    // adjust paddings for iOS if no label
    if (!isAndroid) {
      if (dense) {
        result +=
          scale < 1
            ? Math.min(offset / 2, (fontSize / 2) * scale)
            : Math.min(offset / 2, scale);
      }
      if (!dense) {
        result +=
          scale < 1
            ? Math.min(offset, fontSize * scale)
            : Math.min(fontSize, (offset / 2) * scale);
      }

      result = Math.floor(result);
      topResult = result;
      bottomResult = result;
    }
  }

  return {
    paddingTop: Math.max(0, topResult),
    paddingBottom: Math.max(0, bottomResult),
  };
};

export const interpolatePlaceholder = (
  labeled: Animated.Value,
  hasActiveOutline: boolean | undefined
) =>
  labeled.interpolate({
    inputRange: [0, 1],
    outputRange: [hasActiveOutline ? 0 : 1, 1],
  });

export function calculateFlatAffixTopPosition({
  height,
  paddingTop,
  paddingBottom,
  affixHeight,
}: {
  height: number;
  paddingTop: number;
  paddingBottom: number;
  affixHeight: number;
}): number {
  const inputHeightWithoutPadding = height - paddingTop - paddingBottom;

  const halfOfTheInputHeightDecreasedByAffixHeight =
    (inputHeightWithoutPadding - affixHeight) / 2;

  return paddingTop + halfOfTheInputHeightDecreasedByAffixHeight;
}

export function calculateOutlinedIconAndAffixTopPosition({
  height,
  affixHeight,
  labelYOffset,
}: {
  height: number;
  affixHeight: number;
  labelYOffset: number;
}): number {
  return (height - affixHeight + labelYOffset) / 2;
}

const _getSize = (value: any[] | number | string | undefined | null) => {
  if (value instanceof Array) {
    return value.length;
  }

  if (typeof value === "number") {
    return value;
  }

  if (!value) {
    return 0;
  }

  return value.length;
};

function isValidDate(dateString: string) {
  // Parse the date string into a Date object

  const regEx = /^\d{1,2}-\d{1,2}-\d{4}$/;

  if (!dateString.match(regEx)) return false;
  let dateParts = dateString.split("-");
  const date = new Date(
    parseInt(dateParts[2]),
    parseInt(dateParts[1]) - 1,
    parseInt(dateParts[0])
  );
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    // Date is not valid
    return false;
  }
  //TODO
  // Date is valid
  return true;
}

export const isInputValid = (value: any, obj?: Partial<ValidationType>) => {
  if (!obj) return true;
  const booleans = Object.keys(obj).map((f) => {
    switch (f.toLowerCase()) {
      case "required":
        if (obj["required"] === false) break;
        if (value === undefined || value === null) {
          return false;
        }

        const str = String(value).replace(/\s/g, "");
        return str.length > 0 ? true : false;

      case "boolean":
        if (obj["boolean"] === false) break;
        return value in [true, false, 0, 1, "0", "1", "true", "false"];

      case "string":
        if (obj["string"] === false) break;
        return obj["string"] === true && typeof value === "string";

      case "numeric":
        if (obj["numeric"] === false) break;
        const num = Number(value);

        if (
          typeof num === "number" &&
          !isNaN(num) &&
          typeof value !== "boolean"
        ) {
          return true;
        } else {
          return false;
        }

      case "min":
        if (typeof obj["min"] !== "number") break;
        return _getSize(value) >= obj["min"];

      case "max":
        if (typeof obj["max"] !== "number") break;
        return _getSize(value) <= obj["max"];

      case "email":
        var re =
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(value)) {
          re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          // /^((?:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]|[^\u0000-\u007F])+@(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?(?:\.(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?)+)*$/;
        }
        return re.test(value);

      case "regex":
        if (!obj["regex"]) break;
        return !!obj["regex"].test(value);

      case "array":
        if (!obj["regex"]) break;
        return value instanceof Array;

      case "url":
        if (!obj["url"]) break;
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/i.test(
          value
        );

      case "integer":
        if (!obj["integer"]) break;
        return String(parseInt(value, 10)) === String(value);

      case "alpha":
        if (!obj["alpha"]) break;
        return /^[a-zA-Z]+$/.test(value);

      case "alpha_dash":
        if (!obj["alpha_dash"]) break;
        return /^[a-zA-Z0-9_\-]+$/.test(value);

      case "alpha_dash":
        if (!obj["alpha_num"]) break;
        return /^[a-zA-Z0-9]+$/.test(value);

      case "accepted":
        if (!obj["accepted"]) break;
        if (value in ["on", "yes", 1, "1", true, "true", "checked"]) {
          return true;
        }
        return false;

      case "date":
        if (!obj["date"]) break;
        return isValidDate(value);

      default:
        return true;
    }
  });

  const filtered = booleans.filter(Boolean);

  if (booleans.length === filtered.length) {
    return true;
  } else {
    return false;
  }
};

export const DATE_MMDDYYYY_MASK: Mask = (text = "") => {
  const cleanText = text.replace(/\D+/g, "");

  let secondDigitMonthMask = /\d/;

  if (cleanText.charAt(0) === "0") {
    secondDigitMonthMask = /[1-9]/;
  }
  if (cleanText.charAt(0) === "1") {
    secondDigitMonthMask = /[012]/;
  }

  let secondDigitDayMask = /\d/;

  if (cleanText.charAt(2) === "0") {
    secondDigitDayMask = /[1-9]/;
  }
  if (cleanText.charAt(2) === "3") {
    secondDigitDayMask = /[01]/;
  }

  return [
    /[0-1]/,
    secondDigitMonthMask,
    "-",
    /[0-3]/,
    secondDigitDayMask,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
};

export const TIME_MASK: Mask = () => {
  return [/[0-1]/, /[0-1]/, ":", /[0-5]/, /[0-9]/, " ", /[AaPp]/, /[Mm]/];
};
