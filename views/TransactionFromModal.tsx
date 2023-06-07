import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import DateTimePicker from "../components/DateTimePicker";

type Props = {};

export default function TransactionFromModal({}: Props) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  return (
    <SafeAreaView>
      <View>
        <Text onPress={() => setShowDateTimePicker(true)}>
          TransactionFromModal : {date.toLocaleString()}
        </Text>
      </View>

      <DateTimePicker
        open={showDateTimePicker}
        onClose={(date) => {
          setDate(date);
          setShowDateTimePicker(false);
        }}
      />
      {/* <View>
        
      </View> */}
    </SafeAreaView>
  );
}
