import { Colors, Units } from "@Shared/lib/theme";
import { FsModalLayout, LogicText, VGap } from "@Shared/ui";
import { SelectButton } from "@Shared/ui/LogicButton/SelectButton";
import { useCallback } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";

type SelectTagModalProps = {
  tags: string[];
  selectedTag: string;
  updateSelectedTag: (tag: string) => void;
  onPressClose: () => void;
};

export const SelectTagModal = ({
  tags,
  selectedTag,
  updateSelectedTag,
  onPressClose,
}: SelectTagModalProps) => {
  const renderItem: ListRenderItem<string> = useCallback(
    ({ item, index }) => {
      return (
        <SelectButton
          isActive={item === selectedTag}
          label={item}
          onPress={() => updateSelectedTag(item)}
          onPressClose={onPressClose}
        />
      );
    },
    [selectedTag]
  );

  return (
    <FsModalLayout onPressClose={onPressClose}>
      <VGap size={24} />
      <LogicText
        color={Colors.DARK}
        typography="text18"
        style={styles.title}
        weight={700}
      >
        Выбор темы
      </LogicText>
      <FlatList
        style={styles.list}
        data={tags}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <VGap size={12} />}
        ListHeaderComponent={<VGap size={18} />}
        ListFooterComponent={<VGap size={24} />}
      />
    </FsModalLayout>
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
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "100%",
    maxWidth: Units.s100 * 3 + Units.s36,
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
  },
});
