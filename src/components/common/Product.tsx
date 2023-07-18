import React, { useContext } from "react";
//import { ShopContext } from "../../context/shop-context";

export const Product = (props: any) => {

  const { id, name, price, image } = props.data;
  //const { addToCart, cartItems } = useContext(ShopContext);

  //const cartItemCount = cartItems[id];

  return (
    <div className="product">
      <img src={image} />
      <div className="description">
        <p>
          <b className="product-name"> {name}</b>
        </p>
        <p className="price-value">{price}$</p>
      </div>
        <button className="add-to-cart-button">Add to cart</button>

      {/* <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button> */}
    </div>
  );
};