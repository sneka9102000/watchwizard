import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import withContext from "../withContext";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, error: "" });

  login = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    if (!username || !password) {
      return this.setState({ error: "Fill all fields!" });
    }
    this.props.context.login(username, password).then((loggedIn) => {
      if (!loggedIn) {
        this.setState({ error: "Invalid Credentails" });
      }
    });
  };

  render() {
    return !this.props.context.user ? (
      <>
        <div className="jumbotron jumbotron-fluid ">
          <div className="container">
            <h1 className="display-4">Login Page</h1>

            <p className="lead">Welcome to Watches</p>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.login} className="loginForm">
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third form-group">
              <div className="field">
                <label className="label">Email: </label>
                <input
                  className="input form-control input-control"
                  type="email"
                  name="username"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Password: </label>
                <input
                  className="input form-control input-control"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && (
                <div className="has-text-danger">{this.state.error}</div>
              )}
              <div className="field is-clearfix">
                <button className="loginBtn btn btn-info">Submit</button>
              </div>
              <Link to='/signup'>New User? Sign Up</Link>
            </div>
          </div>
        </form>
      </>
    ) : (
      <Redirect to="/products" />
    );
  }
}

export default withContext(Login);
