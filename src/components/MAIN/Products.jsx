import React, { useState, useEffect } from "react";
import EditProduct from "./EditProduct";
import CreateProduct from "./CreateProduct"
import useAuth from "../hooks/useAuth";
import { getAllTypes } from "../../axios-services";

const Products = () => {
  const { publicProducts, user } = useAuth();
  const [filterProducts, setFilterProducts] = useState([]);
  const [productType, setProductType] = useState("");
  const [types, setTypes] = useState([]);

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

  useEffect(() => {
    const displayAllTypes = async () => {
      const data = await getAllTypes();
      setTypes(data);
    };
    displayAllTypes();
  }, []);

  return (
    <div>
      {productType ? (
        <button onClick={() => setProductType("")}>See all</button>
      ) : null}

      {user.isAdmin ? <CreateProduct types={types} />: null}

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
        <div id="productList">
          {productType ? <h1>{productType}</h1> : <h1>Public Products</h1>}
          {filterProducts.map((product) => (
            <div key={"productList:" + product.id}>
              <h2>{product.name}</h2>
              {!productType ? <h3>Category: {product.typeName}</h3>: null}
              <p>{product.description}</p>
              <p>${product.price}/hr</p>
              {user.isAdmin ? (
                <EditProduct product={product} types={types} />
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <h5>Sorry, we couldn't find anything that matched your search!</h5>
      )}
    </div>
  );
};

export default Products;