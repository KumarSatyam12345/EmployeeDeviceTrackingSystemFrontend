import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Article = styled.article`
  width: 100%;
  height: 100vh;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 40%;
  padding: 2rem;
  border-radius: 8px;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Login() {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        gmail,
        password,
      });

      localStorage.setItem("auth", "true");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      alert(err.response?.data || "Invalid email or password");
      setPassword("");
    }
  };

  return (
    <Article>
      <Box>
        <Typography variant="h4" color="error" gutterBottom>
          Login Page
        </Typography>
        <form
          onSubmit={handleLogin}
          style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            type="email"
            label="Email"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button variant="contained" type="submit" fullWidth>
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate("/signup")}
          >
            Create User
          </Button>
        </form>
      </Box>
    </Article>
  );
}

export default Login;
