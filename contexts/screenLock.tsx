import { startInactivityTimer, unlockScreen } from "@/services/auth/screenLockService";
import { ScreenLockType } from "@/types/authTypes";
import React, { createContext, useEffect, useState } from "react";
import { AppState } from "react-native";

// Create context
export const ScreenLock = createContext<ScreenLockType | undefined>(undefined);

// Provider component
export const ScreenLockProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Function to handle authentication
  const authenticate = async () => {
    const success = await unlockScreen();
    if (success) {
      setIsUnlocked(true);
      startInactivityTimer(() => setIsUnlocked(false)); // Auto-lock after inactivity
    }
  };

  // Function to lock the app
  const lockApp = () => {
    setIsUnlocked(false);
  };

  // Monitor app state to lock when backgrounded
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "background") {
        lockApp();
      }
    });
    return () => subscription.remove();
  }, []);

  return (
    <ScreenLock.Provider value={{ isUnlocked, authenticate, lockApp }}>
      {children}
    </ScreenLock.Provider>
  );
};