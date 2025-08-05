import { FontSize, Typography, TypographyStyle } from "@Shared/lib/theme";
import { StyleProp, StyleSheet, TextStyle } from "react-native";

const DEFAULT_TYPOGRAPHY = "text12";

const getTypographyValue = (
  typography: FontSize,
  key: keyof TypographyStyle
) => {
  return Typography[typography ?? DEFAULT_TYPOGRAPHY][key];
};

export const getTypographyStyles = (
  typography: FontSize,
  style?: StyleProp<TextStyle>
): TextStyle => {
  const flatStyle = StyleSheet.flatten(style) ?? {};

  return {
    fontSize: flatStyle?.fontSize ?? getTypographyValue(typography, "fontSize"),
    lineHeight:
      flatStyle?.lineHeight ?? getTypographyValue(typography, "lineHeight"),
    letterSpacing:
      flatStyle?.letterSpacing ??
      getTypographyValue(typography, "letterSpacing"),
  };
};
