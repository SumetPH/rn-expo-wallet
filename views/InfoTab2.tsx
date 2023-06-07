import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { TabTypeProps } from "./InfoScreen";

type InfoTab2Props = BottomTabScreenProps<TabTypeProps, "InfoTab2">;

export default function InfoTab2({ navigation }: InfoTab2Props) {
  return (
    <View className="h-full justify-center items-center">
      <Text onPress={() => navigation.navigate("InfoTab1")}>InfoTab2</Text>
    </View>
  );
}
