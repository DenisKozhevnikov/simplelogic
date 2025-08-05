import { Dimensions } from "react-native";

const BASE_WIDTH = 350;
const BASE_HEIGHT = 680;

const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

export const scale = (size: number) => (shortDimension / BASE_WIDTH) * size;
export const verticalScale = (size: number) =>
  (longDimension / BASE_HEIGHT) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;
