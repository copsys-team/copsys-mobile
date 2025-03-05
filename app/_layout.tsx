import React, { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ScreenOrientation from "expo-screen-orientation";
import { AppThemeProvider } from "@/contexts/appTheme";
import { ScreenLockProvider } from "@/contexts/screenLock";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { isTablet } from "@/utils/deviceInfo";
import { AppService } from "@/services/appService";
import { useTenantStore } from "@/hooks/stores/useTenantStore";
import { useAuthStore } from "@/hooks/stores/useAuthStore";

export default function RootLayout() {
  const istablet = isTablet();
  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
    // lock orientation to portrait if device is not tablet
    if (!istablet) lockOrientation();
  }, []);

  const appService = new AppService(useAuthStore(), useTenantStore());
  appService.run().catch((error) => {
    console.warn(error);
  });

  return (
    <AppThemeProvider>
      <ScreenLockProvider>
        <GestureHandlerRootView>
          <Stack screenOptions={{headerShown:false}} />
        </GestureHandlerRootView>
        <StatusBar style="auto" />
      </ScreenLockProvider>
    </AppThemeProvider>
  );
}
