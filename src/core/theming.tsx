import { $DeepPartial, createTheming } from "@callstack/react-theme-provider";
import DefaultTheme from "../styles/DefaultTheme";
import { Theme } from "../types";

export const {
  ThemeProvider,
  withTheme,
  useTheme: useAppTheme,
} = createTheming<Partial<Theme>>(DefaultTheme);

export function useTheme<T = Theme>(overrides?: $DeepPartial<T>) {
  return useAppTheme<T>(overrides);
}
