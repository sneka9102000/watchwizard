import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import { Card, Row, Col, Container } from "react-bootstrap";

const ProductList = (props) => {
  const { products } = props.context;

  return (
    <>
      <div className="jumbotron jumbotron-fluid ">
        <div className="container">
          <h1 className="display-4">Watches </h1>
          <p className="lead">Get the latest Brands of Watches here !</p>
        </div>
      </div>
      <br />
      <div className="container">
        <Container>
          <Row>
            {products && products.length ? (
              products.map((product, index) => (
                <Col key={index} xs={12} md={3} lg={4}>
                  <ProductItem
                    product={product}
                    key={index}
                    addToCart={props.context.addToCart}
                  />
                </Col>
              ))
            ) : (
              <div className="column">
                <span className="title has-text-grey-light">
                  OOPS ! No products found!
                </span>
              </div>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default withContext(ProductList);
