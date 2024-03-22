import { EXPORT_WITHDRAWAL } from "api/api";
import { LIST_WITHDRAWAL } from "api/api";
import MDButton from "components/MDButton";
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
    accessor: () => <MDButton>Get</MDButton>,
    align: "Left",
  },
  {
    Header: "Update Withdrawal",
    accessor: () => <MDButton>Update</MDButton>,
    align: "Left",
  },
];
export const useTableData = () => {
  const [rows, setRows] = useState([]);
  const exportData = async () => {
    try {
      const response = await fetch(`${EXPORT_WITHDRAWAL}?type=1`, {
        method: "GET",
        headers: {
          "x-access-token": window.localStorage.getItem("token"),
        },
      });
      console.log(...response.headers);
      if (response.headers.get("content-type") === "text/csv; charset=utf-8") {
        const blob = await response.blob();
        const file = window.URL.createObjectURL(blob);
        window.location.assign(file);
      } else {
        const { message } = await response.json();
        alert(message);
      }
    } catch (e) {
      console.log(e);
    }
  };
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
    exportData,
  };
};
