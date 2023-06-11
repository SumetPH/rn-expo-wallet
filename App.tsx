import "react-native-gesture-handler";

import {
  CompositeNavigationProp,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import {
  DrawerContentComponentProps,
  DrawerItem,
  DrawerNavigationProp,
  DrawerScreenProps,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import HomeScreen from "./views/HomeScreen";

import InfoScreen from "./views/InfoScreen";
import SettingScreen from "./views/SettingScreen";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import ReactQuery from "./providers/ReactQuery";
import { StatusBar } from "expo-status-bar";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useLoaderStore } from "./store/loaderStore";
import TransactionFromModal from "./views/TransactionFromModal";
import AccountSelectModal from "./views/AccountSelectModal";

export type AppStackParamList = {
  Root: undefined;
  InfoScreen: undefined;
  SettingModal: undefined;
  TransactionFromModal: {
    type: "income" | "expense";
  };
  AccountSelectModal: undefined;
};
const Stack = createStackNavigator<AppStackParamList>();

export default function App() {
  const loaderStore = useLoaderStore();

  return (
    <ReactQuery>
      <StatusBar style="light" />
      {/* <Spinner visible={loaderStore.loading} /> */}

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Group>
            <Stack.Screen
              name="Root"
              component={Root}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="InfoScreen" component={InfoScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="SettingModal" component={SettingScreen} />
            <Stack.Screen
              name="TransactionFromModal"
              component={TransactionFromModal}
            />
            <Stack.Screen
              name="AccountSelectModal"
              component={AccountSelectModal}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ReactQuery>
  );
}

export type DrawerParamList = {
  HomeScreen: {
    username: string | undefined;
  };
  SettingScreen: undefined;
};
const Drawer = createDrawerNavigator<DrawerParamList>();

function Root() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{ username: "test" }}
      />
      <Drawer.Screen name="SettingScreen" component={SettingScreen} />
    </Drawer.Navigator>
  );
}

type NavigateProps = CompositeNavigationProp<
  StackNavigationProp<AppStackParamList>,
  DrawerNavigationProp<DrawerParamList>
>;

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useNavigation<NavigateProps>();
  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: "rgb(22 78 99)" }}
    >
      <DrawerItem
        label="HomeScreen"
        labelStyle={{
          color: "#fff",
        }}
        onPress={() =>
          router.navigate("HomeScreen", { username: "From Drawer" })
        }
      />
      <DrawerItem
        label="SettingScreen"
        labelStyle={{
          color: "#fff",
        }}
        onPress={() => router.navigate("SettingScreen")}
      />
      <DrawerItem
        label="SettingModal"
        labelStyle={{
          color: "#fff",
        }}
        onPress={() => router.navigate("SettingModal")}
      />
    </DrawerContentScrollView>
  );
}
