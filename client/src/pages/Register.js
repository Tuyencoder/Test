// RegisterForm.js
import React, { useState } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Buyer"); // Default role is Buyer
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/auth/register", {
        email,
        password,
        role,
      });

      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
        setLoading(true);
        toast.success("Register successful");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <Container>
      <h1>Đăng Ký</h1>
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

        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Buyer">Buyer</option>
            <option value="Admin">Admin</option>
          </Form.Control>
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">
          Register
        </Button>

        {/* Nút chuyển sang trang Login */}
        <p className="mt-2">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-primary">
            Đăng nhập ngay
          </Link>
        </p>
      </Form>
    </Container>
  );
};

export default RegisterForm;
