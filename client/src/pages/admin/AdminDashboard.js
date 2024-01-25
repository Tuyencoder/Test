import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Navbar, Nav } from "react-bootstrap";
import ProductList from "../../components/admin/ProductList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/product/list");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    };

    fetchData();
  }, [deleteProductId]);

  const handleAddProduct = () => {
    navigate('/admin/addProduct');
  };

  const handleEditProduct = (productId) => {
    navigate(`/admin/edit-product/${productId}`);
  };

  const handleDeleteProduct = (productId) => {
    setDeleteProductId(productId);
    setShowDeleteModal(true);
  };

  const confirmDeleteProduct = async () => {
    try {
      await axios.delete(`/product/delete/${deleteProductId}`);
      toast.success("Deleted successfully");
      setShowDeleteModal(false);
      
      // Cập nhật state của sản phẩm sau khi xóa
      const updatedProducts = products.filter(product => product._id !== deleteProductId);
      setProducts(updatedProducts);

      navigate('/admin/dashboard');
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const cancelDeleteProduct = () => {
    setShowDeleteModal(false);
    setDeleteProductId(null);
  };

  const handleLogout = () => {
      setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Button
        className="mb-4"
        variant="success"
        onClick={handleAddProduct}
      >
        Add Product
      </Button>{" "}
      
      {/* Product List Component */}
      <ProductList
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onAdd={handleAddProduct}
      />

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDeleteProduct}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDeleteProduct}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
