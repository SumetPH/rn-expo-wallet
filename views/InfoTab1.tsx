import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { TabTypeProps } from "./InfoScreen";

type InfoTab1Props = BottomTabScreenProps<TabTypeProps, "InfoTab1">;

export default function InfoTab1({ navigation }: InfoTab1Props) {
  return (
    <View className="h-full justify-center items-center">
      <Text onPress={() => navigation.navigate("InfoTab2")}>InfoTab1</Text>
    </View>
  );
}
