// NewUserLogin.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Article = styled.article`
  height: 100vh;
  width: 100vw;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  height: 50%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const TextField = styled.input`
  height: 30px;
  width: 80%;
  margin: 10px;
  padding: 5px;
`;

const Button = styled.button`
  height: 40px;
  width: 90%;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
`;

function NewUserLogin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill out both fields");
      return;
    }
    localStorage.setItem("auth", "true");
    navigate("/newdashboard");
  };

  return (
    <Article>
      <Div>
        <label htmlFor="name">Name</label>
        <TextField
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <TextField
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSubmit}>Sign Up</Button>
      </Div>
    </Article>
  );
}

export default NewUserLogin;
