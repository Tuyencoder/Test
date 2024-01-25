// ProductList.js
import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const ProductListClient = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/product/list");
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ul className="product-list">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
   </ul>
  );
};

export default ProductListClient;
