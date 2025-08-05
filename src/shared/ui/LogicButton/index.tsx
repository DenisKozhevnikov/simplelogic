import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Icons } from "@Shared/assets/icons";
import { Colors, Units } from "@Shared/lib/theme";
import React, { ComponentProps } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { LogicText, LogicTextProps } from "../LogicText";

export type LogicButtonProps = TouchableOpacityProps & {
  label: string;
  textProps?: LogicTextProps;
  showRightIcon?: boolean;
  rightIcon?: ComponentProps<typeof MaterialIcons>;
  rightIconContainer?: ViewProps;
};

export const LogicButton = ({
  label,
  showRightIcon = false,
  textProps,
  rightIcon,
  rightIconContainer,
  ...buttonProps
}: LogicButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      {...buttonProps}
      style={[styles.button, buttonProps.style]}
    >
      <LogicText {...textProps} style={[styles.text, textProps?.style]}>
        {label}
      </LogicText>

      {showRightIcon && (
        <View
          {...rightIconContainer}
          style={[styles.rightIconContainer, rightIconContainer?.style]}
        >
          <SvgXml
            xml={Icons["DownPointerIcon"]}
            width={Units.s10}
            height={Units.s7}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: Units.s10,
    paddingRight: Units.s5,
    paddingVertical: Units.s5,
    minHeight: Units.s28,
    borderRadius: Units.s28 / 2,
    backgroundColor: `${Colors.BLACK}33`,
  },
  text: {
    color: Colors.WHITE,
    fontSize: Units.s12,
    fontWeight: "800",
  },
  rightIconContainer: {
    marginLeft: Units.s3,
    borderRadius: Units.s18 / 2,
    width: Units.s18,
    height: Units.s18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${Colors.BLACK}33`,
  },
});
