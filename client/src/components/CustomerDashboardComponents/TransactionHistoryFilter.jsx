import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import Header from "./Header";

export default function TransactionHistoryFilter() {
  const user = useSelector((state) => state.user);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalRecords, setTotalRecords] = useState(0);

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const [filters, setFilters] = useState({
    status: null,
    type: null,
    sourceAccount: "",
    targetAccount: "",
    minAmount: null,
    maxAmount: null,
    startDate: null,
    endDate: null,
  });

  const statusOptions = [
    "SUCCESS",
    "FAILURE",
    
  ];

  const typeOptions = [
    "DEPOSIT",
    "WITHDRAW",
    "TRANSFER",
  ];

  useEffect(() => {
    fetchTransactions();
  }, [page, rows,filters, filters.minAmount,
  filters.maxAmount]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const params = {
        page,
        size: rows,
      };

      if (filters.status) params.status = filters.status;
      if (filters.type) params.type = filters.type;

      if (filters.sourceAccount)
        params.sourceAccount = filters.sourceAccount;

      if (filters.targetAccount)
        params.targetAccount = filters.targetAccount;

      if (filters.minAmount !== null)
        params.minAmount = filters.minAmount;

      if (filters.maxAmount !== null)
        params.maxAmount = filters.maxAmount;

      if (filters.startDate)
        params.startDate =
          filters.startDate.toISOString();

      if (filters.endDate)
        params.endDate =
          filters.endDate.toISOString();

      const response = await axios.get(
        "http://localhost:8080/api/transaction/filter",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params,
        }
      );

      setTransactions(response.data.data);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (event) => {
    setPage(event.page);
    setRows(event.rows);
  };

  const applyFilters = () => {
    setPage(0);
    fetchTransactions();
  };
const amountBodyTemplate = (rowData) => {

  const isCredit =
    rowData.transactionType === "DEPOSIT" ||
    (rowData.transactionType === "TRANSFER" &&
      rowData.customerId === null);

  return (
    <span
      style={{
        color: isCredit ? "green" : "red",
        fontWeight: "600"
      }}
    >
      {isCredit ? "+" : "-"}₹{rowData.amount}
    </span>
  );
};
  const clearFilters = () => {
    setFilters({
      status: null,
      type: null,
      sourceAccount: "",
      targetAccount: "",
      minAmount: null,
      maxAmount: null,
      startDate: null,
      endDate: null,
    });

    setPage(0);

    setTimeout(() => {
      fetchTransactions();
    }, 0);
  };
const getDisplayType = (rowData) => {
  if (rowData.transactionType === "TRANSFER") {
    return rowData.customerId === null
      ? "INCOMING TRANSFER"
      : "OUTGOING TRANSFER";
  }

  return rowData.transactionType;
};
  const statusBodyTemplate = (rowData) => {
    let severity = "info";

    if (rowData.transactionStatus === "SUCCESS")
      severity = "success";

    if (rowData.transactionStatus === "FAILED")
      severity = "danger";

    if (rowData.transactionStatus === "PENDING")
      severity = "warning";

    return (
      <Tag
        value={rowData.transactionStatus}
        severity={severity}
      />
    );
  };

  const dateBodyTemplate = (rowData) => {
    return new Date(
      rowData.madeAt
    ).toLocaleString();
  };
const typeBodyTemplate = (rowData) => {
  return getDisplayType(rowData);
};
  return (
    <div>
        <div>
            <Header />
        </div>
    <div className="card p-5">

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(200px,1fr))",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Dropdown
          value={filters.status}
          options={statusOptions}
          placeholder="Status"
          onChange={(e) =>
            setFilters({
              ...filters,
              status: e.value,
            })
          }
        />

        <Dropdown
          value={filters.type}
          options={typeOptions}
          placeholder="Type"
          onChange={(e) =>
            setFilters({
              ...filters,
              type: e.value,
            })
          }
        />

        <InputText
          placeholder="Source Account"
          value={filters.sourceAccount}
          onChange={(e) =>{
            
            setFilters({
              ...filters,
              sourceAccount:
                e.target.value,
            });
          }
          }
        />

        <InputText
          placeholder="Target Account"
          value={filters.targetAccount}
          onChange={(e) =>{
            setFilters({
              ...filters,
              targetAccount:
                e.target.value,
            })
          }
          }
        />

 <InputNumber
  placeholder="Min Amount"
  value={filters.minAmount}
  onValueChange={(e) => {
    console.log("Min:", e.value);
    setFilters(prev => ({
      ...prev,
      minAmount: e.value
    }));
  }}
/>

<InputNumber
  placeholder="Max Amount"
  value={filters.maxAmount}
  onValueChange={(e) => {
    console.log("Max:", e.value);
    setFilters(prev => ({
      ...prev,
      maxAmount: e.value
    }));
  }}
/>

        <Calendar
          value={filters.startDate}
          placeholder="Start Date"
          showIcon
          onChange={(e) =>
            setFilters({
              ...filters,
              startDate: e.value,
            })
          }
        />

        <Calendar
          value={filters.endDate}
          placeholder="End Date"
          showIcon
          onChange={(e) =>
            setFilters({
              ...filters,
              endDate: e.value,
            })
          }
        />

        <Button
          label="Apply"
          onClick={applyFilters}
        />

        <Button
          label="Clear"
          severity="secondary"
          
          onClick={clearFilters}
        />
      </div>

      <DataTable
        value={transactions}
        lazy
        paginator
        loading={loading}
        rows={rows}
        first={page * rows}
        totalRecords={totalRecords}
        onPage={onPageChange}
        responsiveLayout="scroll"
      >
        <Column
          field="id"
          header="ID"
        />

        <Column
          body={typeBodyTemplate}
          header="Type"
        />

        <Column
          field="transactionStatus"
          header="Status"
          body={statusBodyTemplate}
        />

        <Column
          field="source_account"
          header="Source Account"
        />

        <Column
          field="target_account"
          header="Target Account"
        />

        <Column
           body={amountBodyTemplate}
          header="Amount"
        />

        <Column
          field="madeAt"
          header="Date"
          body={dateBodyTemplate}
        />
      </DataTable>
    </div>
    </div>
  );
}