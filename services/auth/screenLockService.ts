import { AppState } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

let inactivityTimer: NodeJS.Timeout | null = null;

/**
 * Handles biometric authentication with passcode fallback.
 * @returns {Promise<boolean>} - Returns true if authentication is successful, false otherwise.
 */
export const unlockScreen = async (): Promise<boolean> => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    console.warn("Biometric authentication is not set up on this device.");
    return false;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Unlock App",
    fallbackLabel: "Use Device Passcode",
    disableDeviceFallback: false, // Enables passcode fallback
  });

  return result.success;
};

/**
 * Starts an inactivity timer that locks the app after the specified timeout.
 * @param {Function} lockCallback - Callback function to lock the app.
 * @param {number} timeout - Timeout duration in milliseconds (default: 1 minute).
 */
export const startInactivityTimer = (
  lockCallback: () => void,
  timeout: number = 60000
) => {
  if (inactivityTimer) clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    lockCallback();
  }, timeout);
};

/**
 * Clears the inactivity timer.
 */
export const clearInactivityTimer = () => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
    inactivityTimer = null;
  }
};

/**
 * Monitors app state and locks when backgrounded.
 * @param {Function} lockCallback - Callback function to lock the app.
 */
export const monitorAppState = (lockCallback: () => void) => {
  AppState.addEventListener("change", (nextAppState) => {
    if (nextAppState === "background") {
      lockCallback(); // Lock the app when it goes to the background
    }
  });
};
