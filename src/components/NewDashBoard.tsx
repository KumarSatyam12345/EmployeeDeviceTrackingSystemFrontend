import React from "react";
import { Typography, Paper, Grid } from "@mui/material";
import { useDeviceContext } from "./DeviceProvider";



const NewDashboard: React.FC = () => {
  const { devices } = useDeviceContext(); // Access devices from context

  return (
    <>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Device Inventory Summary
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4} ml="500px" mb="20px">
          <Paper sx={{ padding: 2, textAlign: "center", ml:"10px"}}>
            <Typography variant="h6">Total Devices</Typography>
            <Typography variant="h4">{devices.length}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default NewDashboard;