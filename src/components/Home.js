import React, { Component } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Routers from "../router/router";
import Context from "../Context";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: [],
      role: '',
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");

    const products = await axios.get("http://localhost:3001/products");
    user = user ? JSON.parse(user) : null;
    cart = cart ? JSON.parse(cart) : {};

    this.setState({ user, products: products.data, cart });

    if(this.state.user) {
      if(this.state.user.accessLevel < 1) {
        this.setState({
          role: "admin"
        })
      }
      else {
        this.setState({
          role: "user"
        })
      }
    }
  }

  login = async (email, password) => {
    const res = await axios
      .post("http://localhost:3001/login", { email, password })
      .catch((res) => {
        return { status: 401, message: "Unauthorized" };
      });

    if (res.status === 200) {
      const { email } = jwt_decode(res.data.accessToken);
      const user = {
        email,
        token: res.data.accessToken,
        accessLevel: email === "admin@example.com" ? 0 : 1,
      };

      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  logout = (e) => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };

  addToCart = (cartItem) => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }

    const isRole = () => {
      if(this.state.user) {
        if(this.state.user.email === " admin@example.com") {
          this.setState({
            role: "admin"
          })
        }
        else {
          this.setState({
            role: "user"
          })
        }
      }
    }

    isRole()

    const cart = this.state.cart;

    const products = this.state.products.map((p) => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount;

        axios.put(`http://localhost:3001/products/${p.id}`, { ...p });
      }
      return p;
    });

    this.setState({ products });
    this.clearCart();
  };

  render() {

    console.log("user : ", this.state.user)
    console.log("Email:",this.state.user && this.state.user.email)
    console.log("role:", this.state.role)

    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <nav
              className="navbar navbar-light bg-light"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="nav-item">
                <h1>
                  <b className="navbar-item navHead">Watch Wizard</b>
                </h1>
                <label
                  role="button"
                  class="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ showMenu: !this.state.showMenu });
                  }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </label>
              </div>
              <div
                className={`nav-menu ${this.state.showMenu ? "is-active" : ""} col-sm-6 `}
              >
                <Link to="/products" className="nav-item">
                  Products
                </Link>
                {this.state.user && this.state.user.accessLevel < 1 && (
                  <Link to="/add-product" className="nav-item">
                    Add Items
                  </Link>
                )}
                {
                  this.state.role === "user" &&  (
                  <Link to="/cart" className="nav-item">
                  <i class="fa fa-shopping-cart " aria-hidden="true"></i> 
                    <sup className="tag">
                      {Object.keys(this.state.cart).length}
                    </sup>
                  </Link>
                  )
                }
                {!this.state.user ? (
                  <Link to="/login" className="nav-item">
                    Login
                  </Link>
                ) : (
                  <Link to="/" onClick={this.logout} className="nav-item">
                    Logout
                  </Link>
                )}
              </div>
            </nav>
            <Routers /> {/* Router component  */}
          </div>
        </Router>
      </Context.Provider>
    );
  }
}

