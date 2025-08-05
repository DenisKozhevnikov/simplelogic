import { Colors } from "@Shared/lib/theme";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { FontSize } from "../../lib/theme/utils/typography";
import { getTypographyStyles } from "./utils";

export type LogicTextProps = TextProps & {
  color?: TextStyle["color"];
  typography?: FontSize;
  weight?: TextStyle["fontWeight"];
};

export const LogicText = ({
  style,
  color = Colors.DARK,
  typography = "text12",
  weight,
  ...rest
}: LogicTextProps) => {
  const typographyStyles = getTypographyStyles(typography, style);

  return (
    <Text
      style={[
        styles.text,
        {
          color,
          fontWeight: weight,
          ...typographyStyles,
        },
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Nunito-Black",
  },
});
