import { Switch, Route } from "react-router-dom";
import React from "react";
import ProductList from "../components/ProductList";
import Login from "../components/Login";
import Cart from "../components/Cart";
import AddProduct from "../components/AddProduct";
import Register from "../components/Register";

export default function Routers() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/add-product" component={AddProduct} />
        <Route exact path="/products" component={ProductList} />
      </Switch>
    </>
  );
}
