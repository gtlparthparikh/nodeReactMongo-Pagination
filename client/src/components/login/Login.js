import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    checkLogin = () => {
        let users = JSON.stringify({ email: this.state.email, password: this.state.password })
        let flag = false
        // let flag = false
        // console.log(users)
        // users.forEach(element => {
        //     if(element.email === this.state.email){
        //         if(element.password === this.state.password){
        //             flag=true
        //         }
        //     }
        // });
        // if(flag){
        //     localStorage.setItem('isLoggedIn',true)
        //     this.props.history.push("/")
        // }else{
        //     alert('unauthorized')
        // }
        
        fetch("http://localhost:3001/api/login", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: users
        }).then(
            res => {
                if (res.status !== 200) {
                    flag = true;
                }
                return res.json();
            }
        ).then(
            (result) => {
                if (flag) {
                    console.log(result);
                    throw new Error(result)
                } else {
                    localStorage.setItem('token', result)
                    localStorage.setItem('user', this.state.email)
                    this.setState({
                        email: "",
                        password: ""
                    })
                    this.props.history.push("/")
                }
            }
        ).catch((err) => {
            alert(err)
        })
    }
    render() {
        return (
            <div className="container">
                <div className="container">
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" name="email" value={this.state.email} className="form-control" placeholder="Enter email" onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" onClick={this.checkLogin}>Login</button>
                </div>
                <br />
                New User <Link to="/register">Click Here</Link>
            </div>
        )
    }
}

export default Login
