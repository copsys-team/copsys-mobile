import React, { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";
import { isTablet } from "@/utils/deviceInfo";
import { Redirect, Tabs } from "expo-router";
import { useScreenLock } from "@/hooks/useScreenLock";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import Drawer from "expo-router/drawer";
import { FontAwesome } from "@expo/vector-icons";

export default function AppLayout() {
  const checkIsTablet = isTablet();

  // Change drawer type depending screen orientation
  const [drawerType, setDrawerType] = useState<"permanent" | "front">("front");
  const updateDrawerType = ({ screen }: { screen: ScaledSize }) => {
    const { width, height } = screen;
    const newType = width > height && width > 800 ? "permanent" : "front";
    setDrawerType(newType);
  };

  useEffect(() => {
    updateDrawerType({ screen: Dimensions.get("screen") });
    // Listen for screen size changes
    const subscription = Dimensions.addEventListener(
      "change",
      updateDrawerType
    );
    return () => subscription.remove();
  }, []);

  const { authenticate } = useScreenLock();
  useEffect(() => {
    authenticate(); // authenticate user biometric if device supports
  }, []);

  return (
    <AuthGuard>
      {checkIsTablet ? <MainDrawer drawerType={drawerType} /> : <MainTabs />}
    </AuthGuard>
  );
}

function AuthGuard({ children }: { children: any }) {
  const { loggedIn } = useAuthStore();
  if (!loggedIn) return <Redirect href={"/(auth)/login"} />;
  return <>{children}</>;
}

function MainTabs() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

function MainDrawer({ drawerType }: { drawerType: "permanent" | "front" }) {
  return (
    <Drawer screenOptions={{ drawerType }}>
      <Drawer.Screen
        name="index"
        options={{
          title: "Dashboard",
          drawerIcon: () => <FontAwesome size={20} name="dashboard" />,
        }}
      />
      <Drawer.Screen
        name="members"
        options={{
          title: "Members",
          drawerIcon: () => <FontAwesome size={20} name="group" />,
        }}
      />
      <Drawer.Screen
        name="passbooks"
        options={{
          title: "Passbooks",
          drawerIcon: () => <FontAwesome size={20} name="book" />,
        }}
      />
    </Drawer>
  );
}
