import {
  ALL_TAGS,
  CourseCard,
  CourseEntity,
  useCourses,
  useCourseTags,
  useFilteredCourses,
} from "@Entities/courses";
import { SelectTagModal, useTagSelect } from "@Features/tag";
import { Colors, Units } from "@Shared/lib/theme";
import { HGap, LogicButton, LogicText, VGap } from "@Shared/ui";
import React, { useCallback, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const DashboardScreen = () => {
  const listRef = useRef<FlatList>(null);

  const { selectedTag, isOpen, open, close, select } = useTagSelect(ALL_TAGS);
  const { data: courses, isLoading, error, refetch } = useCourses();
  const tags = useCourseTags(courses);

  const filteredCourses = useFilteredCourses(courses, selectedTag);

  const renderItem: ListRenderItem<CourseEntity> = useCallback(
    ({ item, index }) => {
      return <CourseCard course={item} index={index} />;
    },
    []
  );

  const keyExtractor = useCallback((item: CourseEntity, index: number) => {
    return item.id + index;
  }, []);

  // На Android при смене темы (selectedTag) FlatList не отрисовывал карточки, пока пользователь не прокрутит вручную.
  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [selectedTag]);

  if (isLoading) {
    return (
      <View key="container" style={styles.container}>
        <SafeAreaView key="safe" style={[styles.safe, styles.center]}>
          <ActivityIndicator size="large" />
        </SafeAreaView>
      </View>
    );
  }

  if (error) {
    return (
      <View key="container" style={styles.container}>
        <SafeAreaView key="safe" style={[styles.safe, styles.center]}>
          <LogicText color={Colors.WHITE}>
            Произошла ошибка при загрузке курсов
          </LogicText>
          <VGap size={8} />
          <LogicButton label="Загрузить повторно" onPress={refetch} />
        </SafeAreaView>
      </View>
    );
  }

  return (
    <>
      <View key="container" style={styles.container}>
        <VGap size={12} />
        <LogicButton
          label={selectedTag}
          style={{ alignSelf: "center" }}
          showRightIcon
          onPress={open}
          hitSlop={Units.s10}
        />
        <SafeAreaView style={styles.safe}>
          <VGap size={38} />
          <FlatList
            ref={listRef}
            data={filteredCourses}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <HGap size={18} />}
            ListHeaderComponent={<HGap size={18} />}
            ListFooterComponent={<HGap size={32} />}
            initialNumToRender={5}
            removeClippedSubviews
          />
          <VGap size={12} />
        </SafeAreaView>
      </View>

      {isOpen && (
        <SelectTagModal
          tags={tags}
          selectedTag={selectedTag}
          updateSelectedTag={select}
          onPressClose={close}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PURPLE,
  },
  safe: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
