import { AppTheme } from "@/contexts/appTheme";
import { useContext } from "react";

// Custom hook to use the AppTheme context
export const useAppTheme = () => {
    const context = useContext(AppTheme);
    if (!context) {
      throw new Error("useAppTheme must be used within an AppThemeProvider");
    }
    return context;
  };