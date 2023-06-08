import React, { useCallback, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DateTimePicker from "../components/DateTimePicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../App";
import { format } from "date-fns";

type Props = StackScreenProps<AppStackParamList, "TransactionFromModal">;

export default function TransactionFromModal({ navigation, route }: Props) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [value, setValue] = useState("0");

  return (
    <SafeAreaView>
      <View className="bg-cyan-900 px-3 py-2 flex-row justify-between items-center">
        <TouchableWithoutFeedback
          className="flex-1"
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="close" size={30} color="#fff" />
        </TouchableWithoutFeedback>
        <View>
          <Text className="text-white text-lg font-medium">
            {route.params?.type === "income" ? "รายรับ" : "รายจ่าย"}
          </Text>
        </View>
        <TouchableWithoutFeedback className="flex-1">
          <MaterialIcons name="check" size={30} color="#fff" />
        </TouchableWithoutFeedback>
      </View>
      <View className="flex-row justify-between items-center p-3 border-b border-gray-300">
        <View>
          <Text className="text-lg text-gray-500">จำนวน</Text>
        </View>
        <View className="flex-row mt-2">
          <TextInput
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
            style={{ fontSize: 18, width: 200, textAlign: "right" }}
          />
          <Text className="ml-2 text-gray-500">บาท</Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center p-3 border-b border-gray-300">
        <View>
          <Text className="text-lg text-gray-500">วันและเวลา</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => setShowDateTimePicker(true)}>
          <View className="flex-row items-center">
            <Text className="text-lg mr-2">
              {format(date, "dd-MM-yyyy HH:mm")}
            </Text>
            <MaterialIcons name="calendar-today" size={20} />
            <DateTimePicker
              open={showDateTimePicker}
              onSave={(date) => {
                setDate(date);
                setShowDateTimePicker(false);
              }}
              onClose={() => setShowDateTimePicker(false)}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}
