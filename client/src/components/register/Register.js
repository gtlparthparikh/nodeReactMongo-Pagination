import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            users: []
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    registerUser = () => {
        let data = {}
        data.email=this.state.email;
        data.password =this.state.password
        //console.log(data)
        // localStorage.setItem('users', JSON.stringify(data))
        // alert(`user ${this.state.email} registered Please Login`)
        // this.setState({
        //     email: "",
        //     password: ""
        // })
        fetch("http://localhost:3001/api/register", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(
            res => res.json()
        ).then(
            (result) => {
                localStorage.setItem('token',result)
                localStorage.setItem('user',this.state.email)
                this.setState({
                    email:"",
                    password:""
                })
                this.props.history.push("/")
            }
        ).catch(err => console.log(err))
    }
    render() {
        let { email, password, submitted } = this.state;
        return (
            <div className="container mb-5 mt-5">
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" value={email} className="form-control" placeholder="Enter email" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={this.handleChange} className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={this.registerUser}>Reigister</button><br />
                <Link to="/login">
                    Login
                </Link>
            </div>
        )
    }
}

export default Register
