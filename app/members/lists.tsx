import { Text } from "@rneui/themed";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OpenDrawer } from "../(main)/_layout";

export default function ListMemberLayout() {
  return (
    <SafeAreaView>
      <Button title='click me' onPress={OpenDrawer}/>
    </SafeAreaView>
  );
}
