import { isTablet } from "@/utils/deviceInfo";
import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function SearchDropdownOptions<T>({
  filteredData,
  renderItem,
}: {
  filteredData: T[];
  renderItem?: ({ item }: { item: T }) => any;
}) {
  const { bottom, top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const checkIsTablet = isTablet();

  return (
    filteredData.length > 0 && (
      <View
        style={[
          styles.suggestions,
          checkIsTablet
            ? styles.tabletSuggestions
            : [
                { height: height - bottom - top - 110 },
                styles.mobileSuggestions,
              ],
        ]}
      >
        <FlatList<T>
          keyboardShouldPersistTaps="handled"
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  suggestions: {
    position: "absolute",
    top: 50,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 4,
    zIndex: 10,
  },
  mobileSuggestions: {
    left: 0,
    right: 0,
  },
  tabletSuggestions: {
    left: "5%",
    right: "5%",
    height: 200, // Smaller dropdown for tablets
  },
});
