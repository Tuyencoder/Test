// ProductCard.js
import React from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../context/auth";

const ProductCard = ({ product }) => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <li className="">
        <div className="card mt-4 ml-5 mb-4" style={{ width: "15rem" }}>
          {product.image && (
            <div className="image-container">
              <img
                src={`http://localhost:8000/image/${product?.image.filename}`}
                alt="image"
                className="card-img-top rounded-image"
              />
            </div>
          )}

          <div className="card-container">
            <div className="card-body">
              <h3 className="card-title">{product.name}</h3>
            {auth.user ? (
               <p className="card-text">
               Giá: <strong>{product.price}</strong> vnd
             </p>
            ) : <p className="card-text">
            Giá: <strong>Liên hệ</strong> 
          </p>

            } 
             

              <div className="button-container">
                <a href="#" className="btn btn-primary">
                  Mua ngay
                </a>
                <a onClick className="btn btn-danger">
                  Thêm giỏ hàng
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default ProductCard;
