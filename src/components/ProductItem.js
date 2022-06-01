import React from "react";
const ProductItem = (props) => {
  const { product } = props;
  console.log(product);
  return (
    <div className="card watchCard">
      <div className="box">
        <div className="media">
          <div className="card-body">
            <figure className="">
              <img className="" src={product.image} alt={product.shortDesc} />
            </figure>
          </div>
          <div className="card-header">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <button className="btn btn-success disabled">
                ${product.price}
              </button>
            </b>
            <div>{product.shortDesc}</div>
            {product.stock > 0 ? (
              <small>{product.stock + " Available"}</small>
            ) : (
              <small className="card-text">Out Of Stock</small>
            )}
            <div className="is-clearfix">
              <button
                className="btn btn-primary button is-small is-outlined is-primary   is-pulled-right"
                onClick={() =>
                  props.addToCart({
                    id: product.name,
                    product,
                    amount: 1,
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
