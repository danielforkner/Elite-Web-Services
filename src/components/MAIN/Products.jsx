import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import EditProduct from "./EditProduct";
import CreateProduct from "./CreateProduct";
import useAuth from "../hooks/useAuth";
import { getAllTypes, addProductToCart } from "../../axios-services";

const Products = () => {
  const { token, publicProducts, user, cart, setCart, types } = useAuth();
  const [filterProducts, setFilterProducts] = useState([]);
  const [productType, setProductType] = useState("");

  useEffect(() => {
    if (productType) {
      setFilterProducts(
        publicProducts.filter(
          (publicProducts) => publicProducts.typeName === productType
        )
      );
    } else {
      setFilterProducts(publicProducts);
    }
  }, [publicProducts, productType]);

  return (
    <div>
      {productType ? (
        <button onClick={() => setProductType("")}>See all</button>
      ) : null}

      {user.isAdmin ? <CreateProduct types={types} /> : null}

      {/* Map out the type buttons */}
      {types ? (
        <div id="typeList">
          {types.map((type, index) => {
            return (
              <button
                key={`typeList: ${index}`}
                onClick={() => setProductType(type.name)}
              >
                {type.name}
              </button>
            );
          })}
        </div>
      ) : null}

      {filterProducts ? (
        <div id="productList" className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {productType ? <h1>{productType}</h1> : <h1>Public Products</h1>}
              {filterProducts.map((product) => (
                <div key={"productList:" + product.id} className="col-md-4">
                  <Link to={`/products=${product.id}`} className="card mb-4 box-shadow">
                    <div className="card-body">
                      {!productType ? (
                        <h6 className="card-text">Category: {product.typeName}</h6>
                      ) : null}
                      <h2 className="card-text">{product.name}</h2>
                      <p className="card-text">{product.description}</p>
                      {/* remove later */}
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                      {user.username ? (
                        <button className="btn btn-sm btn-outline-secondary"
                        onClick={async (event) => {
                          event.preventDefault();
                          const newCart = await addProductToCart(
                            token,
                            cart.cartId,
                            product.id,
                            1
                            );
                            setCart(newCart);
                          }}
                          >
                          Add To Cart
                        </button>
                      ) : null}
                      {/* {user.isAdmin ? (
                        <EditProduct product={product} types={types} />
                        ) : null} */}
                        </div>
                        <small className="text-muted">${product.price}/hr</small>
                        </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h5>Sorry, we couldn't find anything that matched your search!</h5>
      )}
    </div>
  );
};

export default Products;
