"use client";
import {useGetMyTransactionQuery } from "@/components/Redux/services/transactionApi";
import MyTransactionsView from "./MyTransactionsView";


const Transactions = () => {
    const { data, isLoading } = useGetMyTransactionQuery();
    const transactionColumns = [
      { label: "Transaction ID", key: "transactionId" },
      { label: "Date", key: "date" },
      { label: "Type", key: "type" },
      { label: "Amount", key: "amount" },
      // { label: "Charge", key: "charge" },
      { label: "Order Id", key: "type" },
      // { label: "Order-Details", key: "details", type: "button" },
      { label: "Status", key: "status", type: "button" },
      { label: "Slip", key: "details", type: "button" },
    ];
    return (
        <MyTransactionsView
        loading={isLoading}
        title={"My Transactions"}
        data={data?.data || []}
        myTransactionColumns={transactionColumns}
        filterOptions={[
              "All Transaction",
          "payment reviewing",
          "rejected",
          "delivered",
        ]}
      />
    );
};

export default Transactions;