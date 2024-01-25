// AddProductForm.js
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddProductForm = ({ onSubmit }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi hàm onSubmit để xử lý thêm sản phẩm
    onSubmit(product);
    // Sau khi thêm sản phẩm, có thể reset form hoặc thực hiện các thao tác khác
    setProduct({
      name: "",
      description: "",
      price: "",
      image: "",
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="productName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="productDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter product description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="productPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter product price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="productImage">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          name="image"
          value={product.image}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
};

export default AddProductForm;
