import {
  SafeAreaView,
  SectionList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";

import { useNavigation } from "@react-navigation/native";
import { AppStackParamList, DrawerParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { useQuery } from "react-query";
import { TransactionAll } from "./HomeScreen.types";
import axios from "axios";
import { URL } from "@env";
import { useEffect, useMemo, useState } from "react";
import numeral from "numeral";
import _ from "lodash";
import { RefreshControl } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLoaderStore } from "../store/loaderStore";

import TransactionList from "../components/transaction/TransactionList";
import TransactionFooter from "../components/transaction/TransactionFooter";

type HomeProps = DrawerScreenProps<DrawerParamList, "HomeScreen">;

export type HomeNavigateProps = StackNavigationProp<AppStackParamList>;

export default function HomeScreen({ route, navigation }: HomeProps) {
  const router = useNavigation<HomeNavigateProps>();
  const loaderStore = useLoaderStore();

  const {
    data: transactionAll,
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["transactionAll"],
    queryFn: () =>
      axios.post<TransactionAll[]>(`${URL}/api/transaction/transactionAll`, {
        profile_id: 1,
      }),
  });

  useEffect(() => {
    if (isFetching || isLoading) {
      loaderStore.updateLoading(true);
    } else {
      loaderStore.updateLoading(false);
    }
  }, [isLoading]);

  const transactionList = useMemo(() => {
    const groupData = _.groupBy(transactionAll?.data, "date");
    const transactions = [];
    for (const [key, value] of Object.entries(groupData)) {
      transactions.push({
        title: key,
        data: value.map((v) => ({
          trans_id: v.trans_id,
          trans_type_id:
            v.wallet_category.wallet_transaction_type.trans_type_id,
          acc_name: v.wallet_account.acc_name,
          cate_name: v.wallet_category.cate_name,
          time: v.time,
          trans_amount: v.trans_amount,
        })),
      });
    }
    return transactions;
  }, [transactionAll]);

  const totalIncome: string = useMemo(() => {
    const total = transactionAll?.data
      .filter((trans) => trans.wallet_category.trans_type_id === 1)
      .reduce((p, c) => p + Number(c.trans_amount), 0);
    return numeral(total).format("0,0.00");
  }, [transactionAll]);

  const totalExpense: string = useMemo(() => {
    const total = transactionAll?.data
      .filter((trans) => trans.wallet_category.trans_type_id === 2)
      .reduce((p, c) => p + Number(c.trans_amount), 0);
    return numeral(total).format("0,0.00");
  }, [transactionAll]);

  return (
    <SafeAreaView className="flex-1 bg-cyan-900">
      <View className="flex-row justify-between items-center p-2">
        <View>
          <MaterialIcons
            name="menu"
            color="#fff"
            size={36}
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <View>
          <Text className="text-lg text-white">เดือนนี้</Text>
        </View>
        <View>
          <MaterialIcons name="settings" color="#fff" size={30} />
        </View>
      </View>

      <TransactionList transactions={transactionList} refetch={refetch} />

      <TransactionFooter
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />
    </SafeAreaView>
  );
}
