import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
} from "@mui/material";
import axios from "axios";

const Device: React.FC = () => {
  const [dName, setdName] = useState("");
  const [dModel, setdModel] = useState("");
  const [devices, setDevices] = useState<any[]>([]);

  const fetchDevices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/device/getAllDevice");
      setDevices(response.data);
    } catch (error) {
      console.error("Error fetching devices", error);
      alert("Failed to fetch devices");
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDevice = { dName, dModel };

    try {
      const response = await axios.post("http://localhost:8080/device/saveDevice", newDevice);

      if (response.status === 200 || response.status === 201) {
        setdName("");
        setdModel("");
        fetchDevices();
      } else {
        alert("Failed to add device");
      }
    } catch (error) {
      alert("Invalid input");
      console.error(error);
    }
  };

  const handleDelete = async (did: number) => {
      if (!window.confirm("Are you sure you want to delete this entry?")) {
            return;
      }
    try {
      const response = await axios.delete(`http://localhost:8080/device/${did}`);
      if (response.status === 200 || response.status === 204) {
        alert("Device entry deleted successfully!");
        fetchDevices();
      } else {
        alert("Failed to delete device");
      }
    } catch (error) {
      alert("Error deleting device");
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" color="primary" gutterBottom>
        Device Management
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Add, view, and manage your devices
      </Typography>

      {/* Form Toolbar */}
      <Toolbar
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, mb: 3, p: 0 }}
      >
        <TextField
          label="Device Name"
          value={dName}
          onChange={(e) => setdName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Device Model"
          value={dModel}
          onChange={(e) => setdModel(e.target.value)}
          required
          fullWidth
        />
        <Button variant="contained" type="submit">
          Add Device
        </Button>
      </Toolbar>

      {/* Full Width Table */}
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Device Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Device Model</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.length > 0 ? (
              devices.map((device, index) => (
                <TableRow key={index} hover>
                  <TableCell>{device.did}</TableCell>
                  <TableCell>{device.dName}</TableCell>
                  <TableCell>{device.dModel}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(device.did)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
          )
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary">No devices found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Device;
