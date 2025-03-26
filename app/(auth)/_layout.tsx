import { AuthProvider } from "@/contexts/auth";
import { Stack } from "expo-router";

export default function AuthLayout() {

  return (
    <AuthProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot"/>
    </Stack>
    </AuthProvider>
  );
}
