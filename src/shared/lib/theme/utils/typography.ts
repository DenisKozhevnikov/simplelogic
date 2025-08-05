import { moderateScale } from "./scale";

/**
 * Constants for frequently used values
 */
const LETTER_SPACING = {
  DEFAULT: moderateScale(-0.16),
  SMALL: moderateScale(-0.12),
  LARGE: moderateScale(-0.24),
} as const;

/**
 * Constants for line-height multipliers
 */
export const LINE_HEIGHT_MULTIPLIER = {
  TIGHT: 1, // For tight text
  NORMAL: 1.2, // Standard multiplier
  LOOSE: 1.5, // For loose text
} as const;

/**
 * Interface for typing text styles
 */
export interface TypographyStyle {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}

/**
 * Type for typography settings
 */
export interface TypographySettings {
  fontSize: number;
  lineHeightMultiplier?: keyof typeof LINE_HEIGHT_MULTIPLIER;
  letterSpacing?: keyof typeof LETTER_SPACING;
}

/**
 * Creates a typography style based on settings
 */
export const createTypographyStyle = ({
  fontSize,
  lineHeightMultiplier = "NORMAL",
  letterSpacing = "DEFAULT",
}: TypographySettings): TypographyStyle => ({
  fontSize: moderateScale(fontSize),
  lineHeight: moderateScale(
    fontSize * LINE_HEIGHT_MULTIPLIER[lineHeightMultiplier]
  ),
  letterSpacing: LETTER_SPACING[letterSpacing],
});

/**
 * Available font sizes
 */
export type FontSize =
  | "text8"
  | "text10"
  | "text12"
  | "text13"
  | "text14"
  | "text15"
  | "text16"
  | "text18"
  | "text20"
  | "text22"
  | "text24"
  | "text28"
  | "text30"
  | "text32"
  | "text36"
  | "text52"
  | "text72";

/**
 * Application typography
 */
export const Typography: Record<FontSize, TypographyStyle> = {
  text8: createTypographyStyle({
    fontSize: 8,
    letterSpacing: "SMALL",
    lineHeightMultiplier: "TIGHT",
  }),
  text10: createTypographyStyle({
    fontSize: 10,
    lineHeightMultiplier: "NORMAL",
  }),
  text12: createTypographyStyle({
    fontSize: 12,
    lineHeightMultiplier: "LOOSE",
  }),
  text13: createTypographyStyle({
    fontSize: 13,
    lineHeightMultiplier: "LOOSE",
  }),
  text14: createTypographyStyle({
    fontSize: 14,
    lineHeightMultiplier: "LOOSE",
  }),
  text15: createTypographyStyle({
    fontSize: 15,
    lineHeightMultiplier: "LOOSE",
  }),
  text16: createTypographyStyle({
    fontSize: 16,
    lineHeightMultiplier: "LOOSE",
  }),
  text18: createTypographyStyle({
    fontSize: 18,
    lineHeightMultiplier: "LOOSE",
  }),
  text20: createTypographyStyle({
    fontSize: 20,
    lineHeightMultiplier: "NORMAL",
  }),
  text22: createTypographyStyle({
    fontSize: 22,
    lineHeightMultiplier: "NORMAL",
  }),
  text24: createTypographyStyle({
    fontSize: 24,
    lineHeightMultiplier: "LOOSE",
    letterSpacing: "LARGE",
  }),
  text28: createTypographyStyle({
    fontSize: 26,
    lineHeightMultiplier: "NORMAL",
  }),
  text30: createTypographyStyle({
    fontSize: 30,
    lineHeightMultiplier: "NORMAL",
  }),
  text32: createTypographyStyle({
    fontSize: 32,
    lineHeightMultiplier: "NORMAL",
  }),
  text36: createTypographyStyle({
    fontSize: 36,
    lineHeightMultiplier: "NORMAL",
  }),
  text52: createTypographyStyle({
    fontSize: 52,
    lineHeightMultiplier: "NORMAL",
  }),
  text72: createTypographyStyle({
    fontSize: 72,
    lineHeightMultiplier: "NORMAL",
  }),
};
