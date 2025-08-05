import { Icons } from "@Shared/assets/icons";
import { Colors, Units } from "@Shared/lib/theme";
import { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { SlideInUp, SlideOutDown } from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
type CloseBtnProps = {
  onPress: () => void;
};

const CloseBtn = ({ onPress }: CloseBtnProps) => {
  const insets = useSafeAreaInsets();
  const rightSize = Math.max(insets.right, insets.left);

  return (
    <TouchableOpacity
      hitSlop={Units.s10}
      style={[styles.close, { right: Units.s24 + rightSize }]}
      onPress={onPress}
    >
      <SvgXml xml={Icons["CrossIcon"]} width={Units.s22} height={Units.s22} />
    </TouchableOpacity>
  );
};

type FsModalLayoutProps = PropsWithChildren<{
  onPressClose: () => void;
}>;

export const FsModalLayout = ({
  onPressClose,
  children,
}: FsModalLayoutProps) => {
  return (
    <Animated.View
      entering={SlideInUp.springify()}
      exiting={SlideOutDown.duration(300)}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        {children}
        <CloseBtn onPress={onPressClose} />
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.WHITE,
  },
  safe: {
    flex: 1,
  },
  close: {
    position: "absolute",
    top: Units.s24,
    right: Units.s24,
  },
});
