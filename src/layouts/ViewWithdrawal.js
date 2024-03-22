// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

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
const stages = ["Pending Approval", "Approved", "Rejected", "Sent to Bank", "Completed"];
function Tables() {
  const { requestId } = useParams();
  const { initialValues, loading } = useWithdrawal(requestId);
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
              <MDBox>
                <MDTypography>Amount: {amount}</MDTypography>
                <MDTypography>Current Status: {stages[currentStatus - 1]}</MDTypography>
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

export default Tables;
