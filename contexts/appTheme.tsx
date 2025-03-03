import React, { createContext } from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { ThemeProvider as RNThemeProvider } from "@react-navigation/native";
import { appTheme } from "@/themes/theme";
import { useColorScheme } from "react-native";

// Create a context.
export const AppTheme = createContext<typeof appTheme | undefined>(undefined);

// Create a theme instance.
const theme = createTheme(appTheme);

// Create a provider.
export const AppThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const colorTheme = useColorScheme();
  return (
    <AppTheme.Provider value={theme}>
      <ThemeProvider theme={theme}>
        <RNThemeProvider
          value={colorTheme === "dark" ? appTheme.dark : appTheme.light}
        >
          {children}
        </RNThemeProvider>
      </ThemeProvider>
    </AppTheme.Provider>
  );
};
