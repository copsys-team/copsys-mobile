import { DefaultTheme } from "@react-navigation/native";
import { CreateThemeOptions } from "@rneui/themed";

type RNThemeType = typeof DefaultTheme;

export const appTheme: CreateThemeOptions & {
  light?: RNThemeType;
  dark?: RNThemeType;
} = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  },
  dark: {
    ...DefaultTheme,
  },
  lightColors: {
    searchBg: "#fff",
  },
  darkColors: {},
  components: {
    SearchBar: (theme, colors) => {
      return {
        containerStyle: {
          backgroundColor: "transparent",
          borderBottomWidth: 0,
          borderTopWidth: 0,
          paddingVertical: 5,
        },
        inputContainerStyle: {
          borderRadius: 20,
          height: 40,
          backgroundColor: colors.colors.searchBg,
        },
      };
    },
    Input: {
      inputContainerStyle: {
        width: "100%",
        borderBottomWidth: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "#f3f3f3",
      },
      inputStyle: {
        fontSize: 16,
        height: 40,
      },
      labelStyle: {
        fontSize: 14,
        fontWeight: "400",
        marginBottom: 5,
      },
    },
    Card: {
      containerStyle: {
        borderRadius: 10,
        borderWidth: 0,
        shadowOpacity: 0,
      },
      wrapperStyle: {
        borderLeftWidth: 0,
        borderWidth: 0,
        borderRadius: 10,
      },
    },
    
    Button: {
      buttonStyle: {
        height: 45,
        borderRadius: 25,
      },
      containerStyle: {
        marginHorizontal: 10,
      },
    },
    
    Tab: {
      buttonStyle(active) {
        return {
          backgroundColor: active ? "#fff" : "#f9f9ff",
        };
      },
      titleStyle: {
        color: "black",
      },
    },
  },
};
