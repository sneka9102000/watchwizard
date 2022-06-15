import React from "react";
import withContext from "../withContext";
import CartItem from "./CartItem";
import { Card, Row, Col, Container } from "react-bootstrap";

const Cart = (props) => {
  const { cart } = props.context;
  const cartKeys = Object.keys(cart || {});
  return (
    <>
      <div className="jumbotron jumbotron-fluid ">
        <div className="container">
          <h1 className="display-4">My Cart</h1>
          <p className="lead">List all the items in your cart </p>
        </div>
      </div>
      <br />
      <div className="container">
        <Container>
          <Row>
            {cartKeys.length ? (
              <div>
                {cartKeys.map((key) => (
                  <Col key={key} xs={12} md={3} lg={6}>
                    <CartItem
                      cartKey={key}
                      key={key}
                      cartItem={cart[key]}
                      removeFromCart={props.context.removeFromCart}
                    />
                  </Col>
                ))}

                <div className="column is-12 is-clearfix">
                  <br />
                  <div className="is-pulled-right">
                    <button
                      onClick={props.context.clearCart}
                      className="btn btn-danger"
                    >
                      Clear cart
                    </button>{" "}
                    <button
                      className="btn btn-dark"
                      onClick={props.context.checkout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="column">
                <div className="title has-text-grey-light">
                  Your order has been Placed successfully
                </div>
              </div>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default withContext(Cart);
