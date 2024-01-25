// LoginForm.js
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });

      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
        setLoading(true);
        toast.success("Login successful");
        if (data.role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <Container>
      <h1>Đăng Nhập</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">
          Login
        </Button>

        {/* Nút chuyển sang trang Register */}
        <p className="mt-2">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-primary">
            Đăng ký ngay
          </Link>
        </p>
      </Form>
    </Container>
  );
};

export default LoginForm;
