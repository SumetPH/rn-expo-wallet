import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  RefreshControl,
  SectionList,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { HomeNavigateProps } from "../../views/HomeScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import numeral from "numeral";

type Data = {
  trans_id: number;
  trans_type_id: number;
  acc_name: string;
  cate_name: string;
  time: string;
  trans_amount: string;
};

type Transactions = {
  title: string;
  data: Data[];
};

type Props = {
  transactions: Transactions[];
  refetch: () => Promise<any>;
};

export default function TransactionList({ transactions, refetch }: Props) {
  const router = useNavigation<HomeNavigateProps>();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    });
  };

  return (
    <SectionList
      className="bg-gray-200"
      sections={transactions}
      keyExtractor={(item, index) => item.trans_id.toString()}
      stickySectionHeadersEnabled={true}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#fff"
        />
      }
      renderSectionHeader={({ section: { title } }) => (
        <View className="bg-gray-300 px-2 py-2">
          <Text className="font-bold">{title}</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <TouchableWithoutFeedback
          onPress={() => router.navigate("SettingModal")}
        >
          <View className="bg-white py-2 px-2 flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View
                className={`
                w-11 h-11 rounded-full flex justify-center items-center 
                ${item.trans_type_id === 1 ? "bg-green-500" : "bg-red-500"}
              `}
              >
                <MaterialIcons name="money" color="#fff" size={30} />
              </View>
              <View className="ml-2">
                <Text className="font-medium">
                  {item.acc_name} {item.cate_name}
                </Text>
                <Text className="text-sm text-gray-500">{item.time}</Text>
              </View>
            </View>
            <View>
              {item.trans_type_id === 1 ? (
                <Text className="text-green-500 text-lg font-semibold">
                  + {numeral(item.trans_amount).format("0,0.00")}
                </Text>
              ) : (
                <Text className="text-red-500 text-lg font-semibold">
                  - {numeral(item.trans_amount).format("0,0.00")}
                </Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
      ItemSeparatorComponent={() => (
        <View className="border-[0.5px] border-gray-200"></View>
      )}
      ListFooterComponent={() => <View className="h-12 bg-gray-200"></View>}
    />
  );
}
