import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { ReactNode, useState } from "react";
import { View, Text } from "react-native";
import { Href, useRouter } from "expo-router";
import React from "react";

export type DrawerContentItem = {
  label: string;
  path?: Href;
  icon?: (props: {
    focused: boolean;
    size: number;
    color: string;
  }) => ReactNode;
  children?: DrawerContentItem[];
};

export default function DrawerContent({
  items,
  ...props
}: DrawerContentComponentProps & {
  items: DrawerContentItem[];
}) {
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };
  return (
    <DrawerContentScrollView contentContainerStyle={{ rowGap: 10 }}>
      {items.map(({ children, icon, label, path }, index) => (
        <View key={index}>
          {/* If item has children, create a collapsible section */}
          {children ? (
            <View style={{ rowGap: 10 }}>
              <DrawerItem
                label={label}
                icon={({ color }) => (
                  <Text style={{ color }}>{openMenus[label] ? "▲" : "▼"}</Text>
                )}
                focused={openMenus[label]}
                onPress={() => toggleMenu(label)}
                activeBackgroundColor={"#00000000"}
              />

              {openMenus[label] &&
                children.map((child, childIndex) => (
                  <DrawerItem
                    key={childIndex}
                    icon={child.icon}
                    focused={props.state.index === childIndex + index}
                    label={child.label || ""}
                    style={{
                      marginStart: 25,
                    }}
                    onPress={() => {
                      child.path && router.push(child.path);
                    }}
                  />
                ))}
            </View>
          ) : (
            <DrawerItem
              label={label}
              icon={icon}
              focused={props.state.index === index}
              onPress={() => path && router.push(path)}
            />
          )}
        </View>
      ))}
    </DrawerContentScrollView>
  );
}
