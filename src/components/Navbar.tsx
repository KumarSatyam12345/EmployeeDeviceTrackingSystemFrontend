import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Device Management
        </Typography>
        {/* <Button color="inherit" component={Link} to="/newdashboard">
          New Dashboard
        </Button> */}
        <Button color="inherit" component={Link} to="/dashboard">
          Inventory
        </Button>
        <Button color="inherit" component={Link} to="/devices">
          Devices
        </Button>
        <Button color="inherit" component={Link} to="/employees">
          Employees
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
