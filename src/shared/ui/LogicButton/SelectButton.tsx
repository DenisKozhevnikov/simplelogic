import { Colors, Units } from "@Shared/lib/theme";
import { GestureResponderEvent, StyleSheet } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { LogicButton, LogicButtonProps } from ".";

type SelectButtonProps = LogicButtonProps & {
  isActive?: boolean;
  onPressClose: () => void;
};

export const SelectButton = ({
  isActive,
  onPress,
  onPressClose,
  ...restProps
}: SelectButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = (event: GestureResponderEvent) => {
    onPress?.(event);
    scale.value = withSpring(
      0.92,
      { damping: 12, stiffness: 200 },
      (finished) => {
        if (finished) {
          scale.value = withSpring(1);
          if (onPress) {
            runOnJS(onPressClose)();
          }
        }
      }
    );
  };

  return (
    <Animated.View style={animatedStyle}>
      <LogicButton
        style={[styles.button, isActive ? styles.active : styles.notActive]}
        textProps={{
          style: [
            styles.text,
            isActive ? styles.textActive : styles.textNotActive,
          ],
        }}
        onPress={handlePress}
        {...restProps}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: Units.s48,
    borderRadius: Units.s12,
  },
  active: {
    paddingVertical: Units.s15,
    paddingHorizontal: Units.s18,
    backgroundColor: Colors.SUCCESS,
  },
  notActive: {
    paddingVertical: Units.s12 + Units.s1,
    paddingHorizontal: Units.s20,
    backgroundColor: Colors.WHITE,
    borderWidth: Units.s2,
    borderColor: Colors.LIGHT_GREY,
  },
  text: {
    lineHeight: Units.s22,
    fontSize: Units.s18,
  },
  textActive: {
    color: Colors.WHITE,
  },
  textNotActive: {
    color: Colors.DARK,
  },
});
