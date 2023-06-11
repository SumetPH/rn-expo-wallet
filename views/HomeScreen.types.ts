export interface TransactionAll {
  trans_id: number;
  acc_id: number;
  trans_note?: any;
  trans_date: string;
  trans_amount: string;
  profile_id: number;
  cate_id: number;
  wallet_account: {
    acc_id: number;
    profile_id: number;
    acc_name: string;
    acc_type_id: number;
    acc_amount_initial: string;
    acc_icon?: any;
    acc_hidden: boolean;
    acc_note?: any;
    update_at: string;
  };
  wallet_category: {
    cate_id: number;
    trans_type_id: number;
    cate_name: string;
    profile_id: number;
    wallet_transaction_type: {
      trans_type_id: number;
      trans_type_name: string;
      update_at: string;
    };
  };
  date: string;
  time: string;
}
