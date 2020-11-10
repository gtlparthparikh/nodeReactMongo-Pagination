import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin, GoogleLogout } from 'react-google-login';

export default function Nav() {
    function login(response) {
        console.log(response)
        if (response.accessToken) {
            localStorage.setItem("accessToken", response.accessToken);
            let data = JSON.stringify({ token: response.accessToken, name: response.profileObj.name, email: response.profileObj.email, gId: response.profileObj.googleId })
            fetch("http://localhost:3001/api/glogin", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            }).then(
                res => {
                    console.log(res.status)
                }
            ).catch(err => console.log(err))
        }
    }
    function logout() {
        console.log('logout response')
        localStorage.removeItem("accessToken")
    }
    function handleLoginFailure(response) {
        console.log("ok", response)
        if (response.details === "Cookies are not enabled in current environment.") {
            alert(response.details);
        }
        else {
            alert('Google login error', response)
        }
    }

    function handleLogoutFailure(response) {
        console.log("out fail");
        console.log('logout failure', response)
        alert('Failed to log out' + response)
    }
    return (
        <div className="container mb-5 mt-5">
            <div>
                {localStorage.getItem('accessToken') ?
                    <GoogleLogout
                        clientId="675663917764-ffg2d95gl8k44ghmjk55hsc2ckghht6o.apps.googleusercontent.com"
                        buttonText='Logout'
                        onLogoutSuccess={logout}
                        onFailure={handleLogoutFailure}
                    >
                    </GoogleLogout> : <GoogleLogin
                        clientId="675663917764-ffg2d95gl8k44ghmjk55hsc2ckghht6o.apps.googleusercontent.com"
                        buttonText='Login'
                        onSuccess={login}
                        onFailure={handleLoginFailure}
                        responseType='code,token'
                        cookiePolicy={'single_host_origin'}
                    ></GoogleLogin>
                }
            </div>
        </div>
    );
}

// class Nav extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//         }
//     }
//     handleChange = (event) => {
//         this.setState({
//             [event.target.name]: event.target.value
//         });
//     }
//     registerUser = () => {
//         let data = {}
//         data.email = this.state.email;
//         data.password = this.state.password
//         //console.log(data)
//         // localStorage.setItem('users', JSON.stringify(data))
//         // alert(`user ${this.state.email} registered Please Login`)
//         // this.setState({
//         //     email: "",
//         //     password: ""
//         // })
//     }
//     login = (response) => {
//         console.log(response)
//         if (response.accessToken) {
//             localStorage.setItem("accessToken", response.accessToken);
//             let data = JSON.stringify({ token: response.accessToken, name: response.profileObj.name, email: response.profileObj.email, gId: response.profileObj.googleId })
//             fetch("http://localhost:3001/api/glogin", {
//                 method: 'POST',
//                 headers: {
//                     'Content-type': 'application/json'
//                 },
//                 body: data
//             }).then(
//                 res => {
//                     console.log(res.status)
//                 }
//             ).catch(err => console.log(err))
//         }
//     }
//     logout = (response) => {
//         console.log("okkk")
//         console.log('logout response', response)
//         localStorage.removeItem("accessToken")
//     }
//     handleLoginFailure = (response) => {
//         console.log("ok", response)
//         if (response.details === "Cookies are not enabled in current environment.") {
//             alert(response.details);
//         }
//         else {
//             alert('Google login error', response)
//         }
//     }

//     handleLogoutFailure = (response) => {
//         console.log('logout failure', response)
//         alert('Failed to log out' + response)
//     }
//     render() {
//         return (
//             <div className="container mb-5 mt-5">
//                 <div>
//                     {localStorage.getItem('accessToken') ?
//                         <GoogleLogout
//                             clientId="675663917764-ffg2d95gl8k44ghmjk55hsc2ckghht6o.apps.googleusercontent.com"
//                             buttonText='Logout'
//                             onLogoutSuccess={this.logout}
//                             onFailure={this.handleLogoutFailure}
//                         >
//                         </GoogleLogout> : <GoogleLogin
//                             clientId="675663917764-ffg2d95gl8k44ghmjk55hsc2ckghht6o.apps.googleusercontent.com"
//                             buttonText='Login'
//                             onSuccess={this.login}
//                             onFailure={this.handleLoginFailure}
//                             responseType='code,token'
//                             cookiePolicy={'single_host_origin'}
//                         ></GoogleLogin>
//                     }
//                 </div>
//             </div>
//         )
//     }
// }

// export default Nav
