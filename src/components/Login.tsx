import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  height: 50%;
  border-radius: 5px;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextFieldd = styled(TextField)`
  width: 100%;
  border-radius: 5px;
  &:focus {
    border: 1px solid red;
  }
`;

const Buttonn = styled(Button)`
  height: 40%;
  width: 100%;
`;

const Typography = styled.label`
  font-size: 3em;
  color: red;
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername === "admin123" && trimmedPassword === "admin@123") {
      localStorage.setItem("auth", "true");
      navigate("/dashboard", { replace: true });
      setUsername("");
      setPassword("");
    } else {
      alert("Invalid credentials ,plz signup");
      navigate("/newuserlogin", { replace: true });
      setPassword("");
      setUsername("");
    }
  };

  return (
    <Article>
      <Box>
        <Typography>Login Page</Typography>
        <form onSubmit={handleLogin}>
          <TextFieldd
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <TextFieldd
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <Buttonn variant="contained" type="submit">
            Login
          </Buttonn>
        </form>
      </Box>
    </Article>
  );
}

export default Login;
