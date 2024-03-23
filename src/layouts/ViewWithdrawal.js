// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import { useParams } from "react-router-dom";
import { useWithdrawal } from "./tables/hook";
import MDInput from "components/MDInput";
const stages = ["Pending Approval", "Approved", "Rejected", "Sent to Bank", "Completed"];
function Tables({ update }) {
  const { requestId } = useParams();
  const {
    initialValues,
    loading,
    touched,
    errors,
    values,
    isValid,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useWithdrawal(requestId);
  const { paymentData, requester } = initialValues;
  const { amount, currentStatus, statuses } = paymentData || {};
  const { firstName, lastName } = requester || {};
  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>{loading && <MDTypography>Loading...</MDTypography>}</MDBox>
              {update && (
                <Grid>
                  <Card>
                    <MDBox component="form" role="form" onSubmit={handleSubmit}>
                      <MDInput
                        placeholder="Transaction Id"
                        name="txnId"
                        fullWidth
                        error={touched.txnId && errors.txnId}
                        value={values.txnId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={loading}
                      />
                      <MDInput
                        placeholder="Type"
                        name="type"
                        fullWidth
                        error={touched.type && errors.type}
                        value={values.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={loading}
                      />
                      <MDInput
                        placeholder="Remarks"
                        name="remarks"
                        fullWidth
                        error={touched.remarks && errors.remarks}
                        value={values.remarks}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={loading}
                      />
                      <MDButton
                        type="submit"
                        variant="gradient"
                        color="info"
                        fullWidth
                        disabled={!isValid || loading}
                      >
                        Submit
                      </MDButton>
                    </MDBox>
                  </Card>
                </Grid>
              )}
              <MDBox>
                <MDTypography>Amount: {amount}</MDTypography>
                <MDTypography>Current Status: {stages[currentStatus - 1]}</MDTypography>
                {(statuses || []).map((status, index) => {
                  const { type, remarks, date } = status;
                  return (
                    <MDBox key={index}>
                      <MDTypography>Remarks: {remarks}</MDTypography>
                      <MDTypography>Date: {new Date(date).toLocaleString()}</MDTypography>
                      <MDTypography>Type: {stages[type - 1]}</MDTypography>
                    </MDBox>
                  );
                })}
                <MDTypography>
                  Requester Full Name: {firstName} {lastName}
                </MDTypography>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
Tables.propTypes = {
  update: PropTypes.bool,
};
export default Tables;
