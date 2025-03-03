import React, { useState, useRef, ReactElement } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { SearchBar } from "@rneui/themed";
import { SearchDropdownOptions } from "./SearchDropdownOptions";

export function SearchDropdown<T>({
  data,
  filterFunction,
  renderItem,
  onSelectItem,
  onSetQuery,
  placeholder = "Search...",
  containerStyle,
  searchContainerStyle,
  inputContainerStyle,
}: {
  data: T[];
  filterFunction: (query: string, data: T[]) => T[];
  renderItem: (props: { item: T; onSelect: (item: T) => void }) => ReactElement;
  onSelectItem: (item: T) => void;
  onSetQuery: (item: T) => string;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  searchContainerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
}): React.JSX.Element {
  const searchRef = useRef(null); // Reference for SearchBar
  const [query, setQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<T[]>([]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.length > 0) {
      setFilteredData(filterFunction(text, data));
    } else {
      setFilteredData([]);
    }
  };

  const handleSelectItem = (item: T) => {
    onSetQuery && setQuery(onSetQuery(item));
    setFilteredData([]);
    onSelectItem && onSelectItem(item);
  };

  return (
    <View style={[containerStyle]}>
      <SearchBar
        ref={searchRef}
        placeholder={placeholder}
        onChangeText={handleSearch}
        value={query}
        clearButtonMode="while-editing"
        containerStyle={[searchContainerStyle]}
        inputContainerStyle={[styles.inputContainer, inputContainerStyle]}
      />
      <SearchDropdownOptions<T>
        filteredData={filteredData}
        renderItem={({ item }: { item: T }) =>
          renderItem({ item, onSelect: handleSelectItem })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    elevation: 4,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
});
