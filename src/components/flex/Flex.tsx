import {
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
  Theme,
  RequiredTheme,
  ThemeValue,
  ResponsiveValue,
  system,
  SpaceProps,
  space,
} from "styled-system";

import styled from "~/esm/StyledComponents.js";

// Adding gap properties based on: https://github.com/styled-system/styled-system/pull/1157#issuecomment-854655293
export interface GapProps<ThemeType extends Theme = RequiredTheme, TVal = ThemeValue<"space", ThemeType>> {
  gap?: ResponsiveValue<TVal, ThemeType>;
  rowGap?: ResponsiveValue<TVal, ThemeType>;
  columnGap?: ResponsiveValue<TVal, ThemeType>;
}

const defaults = { space: [0, 4, 8, 16, 32, 64, 128, 256, 512] };

const gap = system({
  gap: { property: "gap", scale: "space", defaultScale: defaults.space },
  rowGap: { property: "rowGap", scale: "space", defaultScale: defaults.space },
  columnGap: { property: "columnGap", scale: "space", defaultScale: defaults.space },
});

export interface FlexProps extends FlexboxProps, LayoutProps, GapProps, SpaceProps {}

const Flex = styled.div<FlexProps>`
  display: flex;
  ${flexbox};
  ${layout};
  ${gap};
  ${space};
`;

export default Flex;
