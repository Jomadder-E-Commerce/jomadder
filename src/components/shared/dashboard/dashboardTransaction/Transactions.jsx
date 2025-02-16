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
      { label: "Charge", key: "charge" },
      { label: "Status", key: "status", type: "button" },
      { label: "Order-Details", key: "details", type: "button" },
      { label: "Details", key: "details", type: "button" },
    ];
    return (
        <MyTransactionsView
        loading={isLoading}
        title={"My Transactions"}
        data={data?.data || []}
        myTransactionColumns={transactionColumns}
        filterOptions={[
          "payment reviewing",
          "rejected",
          "delivered",
        ]}
      />
    );
};

export default Transactions;