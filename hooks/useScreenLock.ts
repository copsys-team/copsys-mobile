import { ScreenLock } from "@/contexts/screenLock";
import { useContext } from "react";

// Custom hook for consuming ScreenLockContext
export const useScreenLock = () => {
    const context = useContext(ScreenLock);
    if (!context) {
      throw new Error("useScreenLock must be used within an ScreenLockProvider");
    }
    return context;
  };
  