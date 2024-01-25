// ProductList.js
import React from "react";
import { Table, Button } from "react-bootstrap";

const ProductList = ({ products, onEdit, onDelete, onAdd }) => {
  return (
    <div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <img
                   src={`http://localhost:8000/image/${product?.image.filename}`}
                  alt={product.name}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>
                <Button variant="warning" onClick={() => onEdit(product._id)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => onDelete(product._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default ProductList;
