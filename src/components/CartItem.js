import React from "react";

const CartItem = (props) => {
  const { cartItem, cartKey } = props;

  const { product, amount } = cartItem;
  return (
    <div className="box card cartCard">
      <div className="media">
        <div className="media-left">
          <figure className="image is-1by1">
            <img src={product.image} alt={product.shortDesc} className="" />
          </figure>
        </div>
        <div className="media-content card-header">
          <b style={{ textTransform: "capitalize" }}>
            {product.name}{" "}
            <button type="button" class="btn btn-warning disabled">
              Rs.{product.price}
            </button>
          </b>
          <div>{product.shortDesc}</div>
          <i>
            <small>{`${amount} in cart`}</small>
          </i>
          <div
            className="media-right"
            onClick={() => props.removeFromCart(cartKey)}
          >
            <button className="btn btn-outline-danger">REMOVE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
