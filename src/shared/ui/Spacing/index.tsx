import React from "react";
import { View } from "react-native";
import { moderateScale } from "../../lib/theme/utils/scale";

export const VGap = ({ size }: { size: number }) => {
  return <View style={{ height: moderateScale(size) }} />;
};

export const HGap = ({ size }: { size: number }) => {
  return <View style={{ width: moderateScale(size) }} />;
};
