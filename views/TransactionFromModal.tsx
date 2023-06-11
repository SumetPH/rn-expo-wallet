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
import { Controller, useForm } from "react-hook-form";

type Props = StackScreenProps<AppStackParamList, "TransactionFromModal">;

type Form = {
  amount: string;
  date: Date;
  note: string;
};

export default function TransactionFromModal({ navigation, route }: Props) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [value, setValue] = useState("0");

  const { control, getValues, handleSubmit, formState } = useForm<Form>({
    defaultValues: {
      amount: "0",
      date: new Date(),
      note: "",
    },
  });

  const submit = (data: Form) => {
    console.log({ data });
  };

  return (
    <View>
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
        <TouchableWithoutFeedback
          className="flex-1"
          onPress={handleSubmit(submit)}
        >
          <MaterialIcons name="check" size={30} color="#fff" />
        </TouchableWithoutFeedback>
      </View>
      <View className=" p-3 border-b border-gray-300">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-lg text-gray-500">จำนวน</Text>
          </View>
          <View className="flex-row mt-2 items-center">
            <Controller
              control={control}
              name="amount"
              rules={{
                required: {
                  value: true,
                  message: "กรุณากรอกข้อมูล",
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "กรุณากรอกเฉพาะตัวเลข",
                },
              }}
              render={({ field }) => (
                <TextInput
                  ref={field.ref}
                  keyboardType="numeric"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  style={{
                    fontSize: 24,
                    fontWeight: "500",
                    width: 200,
                    textAlign: "right",
                    color: route.params.type === "income" ? "green" : "red",
                  }}
                />
              )}
            />
            <Text className="ml-2 text-gray-500">บาท</Text>
          </View>
        </View>
        {formState.errors.amount && (
          <Text className="text-xs text-red-500">
            {formState.errors.amount?.message}
          </Text>
        )}
      </View>
      <View className=" border-b border-gray-300 flex-row">
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("AccountSelectModal")}
        >
          <View className="flex-1 py-6 border-r border-gray-300">
            <Text className="text-center text-lg text-gray-500">
              เลือกบัญชี
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => console.log("first2")}>
          <View className="flex-1 py-6">
            <Text className="text-center text-lg text-gray-500">
              เลือกหมวดหมู่
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View className="flex-row justify-between items-center p-3 border-b border-gray-300">
        <View>
          <Text className="text-lg text-gray-500">วันและเวลา</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => setShowDateTimePicker(true)}>
          <View className="flex-row items-center">
            <Text className="text-lg mr-2">
              {format(getValues().date, "dd-MM-yyyy HH:mm")}
            </Text>
            <MaterialIcons name="calendar-today" size={20} />
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DateTimePicker
                  open={showDateTimePicker}
                  onSave={(date) => {
                    field.onChange(date);
                    setShowDateTimePicker(false);
                  }}
                  onClose={() => setShowDateTimePicker(false)}
                />
              )}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View className="flex-row justify-between items-center p-3 border-b border-gray-300">
        <View>
          <Text className="text-lg text-gray-500">บันทึก</Text>
        </View>
        <Controller
          control={control}
          name="note"
          render={({ field }) => (
            <TextInput
              className="w-4/5 p-2 text-right"
              placeholder="บันทึก"
              multiline
            />
          )}
        />
      </View>
    </View>
  );
}
