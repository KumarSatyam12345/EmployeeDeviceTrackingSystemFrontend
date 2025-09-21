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

const Employee: React.FC = () => {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [employees, setEmployees] = useState<any[]>([]);
  const hasFetched = useRef(false); // Prevent duplicate calls

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/getAllUser");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
      alert("Failed to fetch employees");
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchEmployees();
      hasFetched.current = true;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = { name, gmail };

    try {
      const response = await axios.post("http://localhost:8080/user/SaveUser", newEmployee);
      if (response.status === 200 || response.status === 201) {
        setName("");
        setGmail("");
        alert("Employee entry added successfully!");
        fetchEmployees();
      } else {
        alert("Failed to add employee");
      }
    } catch (error) {
      alert("Invalid input");
      console.error(error);
    }
  };

  const handleDelete = async (uid: number) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      const response = await axios.delete(`http://localhost:8080/user/${uid}`);
      alert(response.data.message);
      fetchEmployees();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error deleting employee";
      alert(errorMessage);
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Employee Management
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Add, view, and manage employees
      </Typography>

      <Toolbar
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3, p: 0 }}
      >
        <TextField
          label="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ flex: 1, minWidth: 200 }}
        />
        <TextField
          label="Employee Email"
          type="email"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          required
          sx={{ flex: 1, minWidth: 250 }}
        />
        <Button variant="contained" type="submit" sx={{ height: 56 }}>
          Add Employee
        </Button>
      </Toolbar>

      <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>UID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Employee Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Employee Email</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <TableRow key={index} hover>
                  <TableCell>{employee.uid}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.gmail}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(employee.uid)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary">No employees found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Employee;
