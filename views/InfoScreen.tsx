import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, Text } from "react-native";
import {
  DrawerScreenProps,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

export type TabTypeProps = {
  InfoTab1: undefined;
  InfoTab2: undefined;
};
const Tab = createBottomTabNavigator<TabTypeProps>();

type InfoDrawerProps = {
  InfoDrawer: undefined;
};

const Drawer = createDrawerNavigator<InfoDrawerProps>();

export default function InfoScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="InfoDrawer"
      screenOptions={{ drawerPosition: "right", headerShown: false }}
    >
      <Drawer.Screen name="InfoDrawer" component={InfoDrawer} />
    </Drawer.Navigator>
  );
}

type InfoProps = DrawerScreenProps<InfoDrawerProps, "InfoDrawer">;
// type InfoProps = StackScreenProps<AppStackParamList, "InfoScreen">;
function InfoDrawer({ navigation }: InfoProps) {
  // const router = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  return (
    <SafeAreaView className="flex-1">
      <View>
        <Ionicons
          name="chevron-back"
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View className="flex-1">
        <Text
        // onPress={() =>
        // router.navigate("HomeScreen", { username: "From InfoScreen" })
        // }
        >
          test
        </Text>
      </View>
      <View className="flex-[2]">
        <Text
        // onPress={() =>
        //   router.navigate("HomeScreen", { username: "From InfoScreen" })
        // }
        >
          test
        </Text>
      </View>
    </SafeAreaView>
  );
}
