import { LIST_WITHDRAWAL } from "api/api";
import { useEffect, useState } from "react";

export const columns = [
  {
    Header: "Amount",
    accessor: "amount",
    align: "left",
  },
  {
    Header: "Name",
    accessor: "name",
    align: "left",
  },
  {
    Header: "Email",
    accessor: "email",
    align: "left",
  },
  {
    Header: "Status",
    accessor: "status",
    align: "left",
  },
  {
    Header: "Get Withdrawal",
    accessor: () => <button>GEt</button>,
    align: "Left",
  },
];
export const useTableData = () => {
  const [rows, setRows] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch(LIST_WITHDRAWAL, {
        method: "GET",
        headers: {
          "x-access-token": window.localStorage.getItem("token"),
        },
      });
      const { status, data } = await response.json();
      if (status === "OK") {
        setRows(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return {
    rows,
  };
};
