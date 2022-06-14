import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../Store/action';
import { Redirect, useHistory } from "react-router-dom";

function Register() {

    const [state, setState] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        mobilenumber: "",
        address:""
    });

    let dispatch = useDispatch();
    let history = useHistory()
    
    const { email, password,firstname,lastname,mobilenumber,address } = state;
    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    var reg = false

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state)
        history.push('/login')
        dispatch(addUser(state))
        reg = true;
        console.log(reg)
    }

    return reg ? <Redirect to="/login" /> : (
        <>
            <div className="jumbotron jumbotron-fluid ">
                <div className="container">
                    <h1 className="display-4">Sign Up</h1>

                    <p className="lead">Welcome to Watches</p>
                </div>
            </div>
            <br />
            <br />
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="columns is-mobile is-centered">
                    <div className="column is-one-third form-group">
                        <div className="field">
                            <label className="label">Email: </label>
                            <input
                                className="input form-control input-control"
                                type="email"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="field">
                            <label className="label">Password: </label>
                            <input
                                className="input form-control input-control"
                                type="password"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="field">
                            <label className="label">firstname: </label>
                            <input
                                className="input form-control input-control"
                                type="firstname"
                                name="firstname"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="field">
                            <label className="label">lastname: </label>
                            <input
                                className="input form-control input-control"
                                type="lastname"
                                name="lastname"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="field">
                            <label className="label">mobilenumber: </label>
                            <input
                                className="input form-control input-control"
                                type="mobilenumber"
                                name="mobilenumber"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="field">
                            <label className="label">address: </label>
                            <input
                                className="input form-control input-control"
                                type="address"
                                name="address"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="field is-clearfix">
                            <button className="loginBtn btn btn-info">Sign Up</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Register
