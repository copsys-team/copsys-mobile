import * as Network from "expo-network";
import { useWindowDimensions } from "react-native";

export async function isOnline() {
  const networkState = await Network.getNetworkStateAsync();
  return networkState.isInternetReachable;
}

export function isTablet() {
  const { width } = useWindowDimensions();
  return width >= 768; // Tablet detection
}

export function isLandscapeTablet() {
  const { width, height } = useWindowDimensions();
  return width > height && width > 800; // Tablet in Landscape detection
}
