import React, { useState, useEffect, useRef } from "react";
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
import NewDashboard from "./NewDashBoard";

const Dashboard: React.FC = () => {
  const [uid, setUid] = useState("");
  const [did, setDid] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [dashboards, setDashboards] = useState<any[]>([]);
  const effectRan = useRef(false); // <--- prevent double useEffect run

  const fetchDashboards = async () => {
    try {
      const response = await axios.get("http://localhost:8080/inventory/getAllRepo");
      setDashboards(response.data);
    } catch (error) {
      console.error("Error fetching dashboards:", error);
      alert("Failed to fetch dashboards. Please try again.");
    }
  };

  useEffect(() => {
    if (effectRan.current) return; // skip if already run
    effectRan.current = true;
    fetchDashboards();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDashboard = {
      user: { uid },
      device: { did },
      dateOfIssue,
      returnDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/inventory/saveRepo",
        newDashboard
      );

      if (response.status === 200 || response.status === 201) {
        alert("Dashboard entry added successfully!");
        await fetchDashboards(); // ensure UI updates
        setUid("");
        setDid("");
        setDateOfIssue("");
        setReturnDate("");
      } else {
        console.error("Error:", response);
        alert("Failed to add dashboard entry. Please try again.");
      }
    } catch (error) {
      console.error("Error adding dashboard entry:", error);
      alert("Failed to add dashboard entry. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      const response = await axios.delete(`http://localhost:8080/inventory/${id}`);
      if (response.status === 200 || response.status === 204) {
        alert("Dashboard entry deleted successfully!");
        await fetchDashboards(); // ensure UI updates
      } else {
        alert("Failed to delete dashboard entry");
      }
    } catch (error) {
      console.error("Error deleting dashboard entry:", error);
      alert("Error deleting dashboard entry");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <NewDashboard />

      <Typography variant="h4" color="primary" gutterBottom sx={{ mt: 3 }}>
        Dashboard Management
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Assign devices to employees and track issue/return dates
      </Typography>

      <Toolbar
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3, p: 0 }}
      >
        <TextField
          label="Employee ID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          required
          sx={{ minWidth: 150, flex: 1 }}
        />
        <TextField
          label="Device ID"
          value={did}
          onChange={(e) => setDid(e.target.value)}
          required
          sx={{ minWidth: 150, flex: 1 }}
        />
        <TextField
          label="Issue Date"
          type="date"
          value={dateOfIssue}
          onChange={(e) => setDateOfIssue(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          required
          sx={{ minWidth: 150, flex: 1 }}
        />
        <TextField
          label="Return Date"
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ minWidth: 150, flex: 1 }}
        />
        <Button variant="contained" type="submit" sx={{ height: 56 }}>
          Add Dashboard
        </Button>
      </Toolbar>

      <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Employee ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Device ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Issue Date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Return Date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dashboards.length > 0 ? (
              dashboards.map((dashboard) => (
                <TableRow key={dashboard.id} hover>
                  <TableCell>{dashboard.user.uid}</TableCell>
                  <TableCell>{dashboard.device.did}</TableCell>
                  <TableCell>{dashboard.dateOfIssue}</TableCell>
                  <TableCell>{dashboard.returnDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(dashboard.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No dashboard entries found
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
