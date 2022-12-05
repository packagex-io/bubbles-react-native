import React, { createContext, useContext, useRef, useState } from "react";
import { Animated } from "react-native";
import Header from "./Header";

export const HEADER_HEIGHT = 56;

type HeaderStateType = Partial<
  React.ComponentPropsWithoutRef<typeof Header>
> & {
  scrollY: Animated.Value;
};

type HeaderContextType = {
  options: HeaderStateType;
  setOptions: (options: HeaderStateType) => void;
};

type HeaderProviderProps = { children: React.ReactNode };

const HeaderContext = createContext<HeaderContextType>(null);

export function HeaderProvider({ children }: HeaderProviderProps) {
  const searchbarAnimation = useRef(new Animated.Value(0)).current;
  const [options, setOptions] = useState<HeaderStateType>({
    scrollY: searchbarAnimation,
  });

  return (
    <HeaderContext.Provider value={{ options, setOptions }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}
