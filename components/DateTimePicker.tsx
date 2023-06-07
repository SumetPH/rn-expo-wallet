import React, { useEffect, useRef, useState } from "react";
import DateTimePickerLib from "@react-native-community/datetimepicker";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  open: boolean;
  onClose: (date: Date) => void;
};

export default function DateTimePicker({ open, onClose }: Props) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [tab, setTab] = useState<"date" | "time">("date");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (open) {
      actionSheetRef.current?.show();
    }
  }, [open]);

  return (
    <ActionSheet ref={actionSheetRef} onClose={() => onClose(date)}>
      <View className="flex-row p-3">
        <TouchableOpacity
          className="flex-1 bg-gray-200 p-2 m-2 rounded-lg"
          onPress={() => setTab("date")}
        >
          <Text className="text-center ">วันที่</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-gray-200 p-2 m-2 rounded-lg"
          onPress={() => setTab("time")}
        >
          <Text className="text-center">เวลา</Text>
        </TouchableOpacity>
      </View>
      <View>
        {tab === "date" ? (
          <DateTimePickerLib
            mode="date"
            display="spinner"
            is24Hour={true}
            value={date}
            themeVariant="light"
            locale="th"
            onChange={(event, current) => current && setDate(current)}
          />
        ) : (
          <DateTimePickerLib
            mode="time"
            display="spinner"
            is24Hour={true}
            value={date}
            themeVariant="light"
            locale="th"
            onChange={(event, current) => current && setDate(current)}
          />
        )}
      </View>
    </ActionSheet>
  );
}
