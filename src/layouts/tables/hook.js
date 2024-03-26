import { EXPORT_WITHDRAWAL } from "api/api";
import { LIST_WITHDRAWAL, GET_WITHDRAWAL } from "api/api";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import { Link } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UPDATE_WITHDRAWAL } from "api/api";
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
    Header: "View Withdrawal",
    accessor: ({ requestId }) => (
      <Link href={`/withdrawals/view/${requestId}`}>
        <MDButton>View</MDButton>
      </Link>
    ),
    align: "left",
  },
  {
    Header: "Update Withdrawal",
    accessor: ({ requestId }) => (
      <Link href={`/withdrawals/update/${requestId}`}>
        <MDButton>Update</MDButton>
      </Link>
    ),
    align: "left",
  },
];
export const useTableData = () => {
  const [rows, setRows] = useState([]);
  const exportData = async (type) => {
    try {
      const response = await fetch(`${EXPORT_WITHDRAWAL}?type=${type}`, {
        method: "GET",
        headers: {
          "x-access-token": window.localStorage.getItem("token"),
          "ngrok-skip-browser-warning": "any",
        },
      });
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
          "ngrok-skip-browser-warning": "any",
        },
      });
      const { status, data, message } = await response.json();
      if (status === "OK") {
        setRows(data);
      } else {
        alert(message);
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

export const useWithdrawal = (requestId) => {
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${GET_WITHDRAWAL}${requestId}`, {
        method: "GET",
        headers: {
          "x-access-token": window.localStorage.getItem("token"),
          "ngrok-skip-browser-warning": "any",
        },
      });
      const data = await response.json();
      setInitialValues(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const { values, touched, errors, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      txnId: "",
      type: "",
      remarks: "",
    },
    validationSchema: Yup.object().shape({
      txnId: Yup.string().required(),
      type: Yup.string().required(),
      remarks: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      const { txnId, type, remarks } = values;
      setLoading(true);
      try {
        const response = await fetch(`${UPDATE_WITHDRAWAL}${requestId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": window.localStorage.getItem("token"),
            "ngrok-skip-browser-warning": "any",
          },
          body: JSON.stringify({
            txnId,
            type,
            remarks,
          }),
        });
        const { status, message } = await response.json();
        alert(message);
        if (status === "OK") {
          getData();
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    },
  });
  useEffect(() => {
    getData();
  }, []);
  return {
    initialValues,
    loading,
    values,
    touched,
    errors,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
  };
};
