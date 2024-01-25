import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="https://inthanhtien.com/wp-content/uploads/2023/02/logo-shopee-3.jpg" // Thay đổi đường dẫn đến logo của bạn
            alt="Logo"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {auth.user ? (
              <>
                <Nav>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
              </>
            ) : auth.role === "Admin" ? (
              <>
                <Nav.Link href="/admin/dashboard">Admin</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
