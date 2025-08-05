import type { CourseEntity } from "@Entities/courses";
import { Colors, Units } from "@Shared/lib/theme";
import { LogicText } from "@Shared/ui";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface CourseCardProps {
  course: CourseEntity;
  index: number;
}

const STEP = 100;
const MAX_STEPS = 6;
const COURSE_CARD_WIDTH = Units.s100 * 2 + Units.s10;
const COURSE_CARD_HEIGHT = Units.s100 * 2 + Units.s4;

export const CourseCard = ({ course, index }: CourseCardProps) => {
  const scale = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.95);
  };
  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        entering={FadeInDown.delay(Math.min((index % MAX_STEPS) * STEP))
          .springify()
          .damping(15)}
      >
        <Animated.View style={[styles.container, style]}>
          <View
            style={[styles.imageWrapper, { backgroundColor: course.bgColor }]}
          >
            <Image
              style={styles.image}
              contentFit="contain"
              source={course.image}
              cachePolicy="disk"
              transition={400}
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.titleWrapper}>
              <LogicText color={Colors.PURPLE_GREY} typography="text14">
                {course.name}
              </LogicText>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: COURSE_CARD_WIDTH,
    height: COURSE_CARD_HEIGHT,
    borderRadius: Units.s24,
    backgroundColor: Colors.LIGHT_BLUE_BG,
    overflow: "hidden",
  },
  imageWrapper: {
    flex: 1,
    padding: Units.s9,
  },
  image: {
    flex: 1,
  },
  footer: {
    paddingBottom: Units.s6,
  },
  titleWrapper: {
    height: Units.s36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    borderBottomLeftRadius: Units.s24,
    borderBottomRightRadius: Units.s24,
  },
});
