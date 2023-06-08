import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Popover from "react-native-popover-view/dist/Popover";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { HomeNavigateProps } from "../../views/HomeScreen";
import { useNavigation } from "@react-navigation/native";

type Props = {
  totalIncome: string;
  totalExpense: string;
};

export default function TransactionFooter({
  totalIncome,
  totalExpense,
}: Props) {
  const router = useNavigation<HomeNavigateProps>();
  const [showPopover, setShowPopover] = useState(false);

  return (
    <View className="absolute bottom-8 left-0 right-0 ">
      <View className="flex-row">
        <View className="flex-[1] py-1 rounded-tr-2xl bg-cyan-900 pr-3">
          <Text className="text-gray-300 text-right">รายจ่ายรวม</Text>
        </View>
        <View className="flex-[1]"></View>
        <View className="flex-[1] py-1 rounded-tl-2xl bg-cyan-900 pl-3">
          <Text className="text-gray-300">รายรับรวม</Text>
        </View>
      </View>
      <View className="flex-row px-3 bg-cyan-900 ">
        <View className="flex-[1]">
          <Text className="text-white text-lg font-bold">
            {totalIncome} บาท
          </Text>
        </View>
        <View>
          <Popover
            isVisible={showPopover}
            onRequestClose={() => setShowPopover(false)}
            popoverStyle={{
              backgroundColor: "rgb(22 78 99)",
            }}
            from={
              <TouchableWithoutFeedback onPress={() => setShowPopover(true)}>
                <View className="-mt-6 w-14 h-14 bg-yellow-500 border-cyan-900 border-2 rounded-full justify-center items-center">
                  <MaterialIcons name="add" size={46} />
                </View>
              </TouchableWithoutFeedback>
            }
          >
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => {
                  setShowPopover(false);
                  router.navigate("TransactionFromModal", {
                    type: "income",
                  });
                }}
              >
                <View className="py-3 px-6">
                  <Text className="text-white">รายรับ</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowPopover(false);
                  router.navigate("TransactionFromModal", {
                    type: "expense",
                  });
                }}
              >
                <View className="py-3 px-6">
                  <Text className="text-white">รายจ่าย</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Popover>
        </View>
        <View className="flex-[1]">
          <Text className="text-white text-lg font-bold text-right">
            {totalExpense} บาท
          </Text>
        </View>
      </View>
    </View>
  );
}
