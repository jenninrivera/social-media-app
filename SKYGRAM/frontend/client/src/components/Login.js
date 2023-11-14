import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import React from 'react'
import {useState} from "react"
import axios from "axios";
import "./Login.css" 
import SKYGRAMLogo from './logo.png'

function Login() {

    const history = useNavigate();
	// // const initialFormData = Object.freeze({
	// // 	email: '',
	// // 	password: '',

	// // });

	// const [formData, setFormData] = useState({});

	// const handleChange = (e) => {
	// 	setFormData({
	// 		...formData,
	// 		[e.target.id]: e.target.value.trim(),
	// 	});
	// };

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
    //     console.log(formData)
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Accept':'application/json'
    //         }

        // async function loginUser () {
        //     console.log("what happened???")
        //     const response = await axiosInstance
        //         .post('auth/login', {
        //             username: formData.username,
        //             password: formData.password,
        //         },{
        //             withCredentials: true,
        //             headers: headers
        //         })
        //         .then((res) => {
        //             console.log(res)
        //             // console.log(res.data.access);
        //             localStorage.setItem('token', res.data.access);
        //             // localStorage.setItem('refresh_token', res.data.refresh);
        //             axiosInstance.defaults.headers['Authorization'] =
        //                 'JWT ' + localStorage.getItem('token');
        //             history('/feed');
        //         })
                // .catch((error) => {
                //     console.log("help")
                //     console.log(error)
                // });
    //         console.log("asdfasdf")
    //         return await response.json();
    //     }

    //     loginUser()	
	// };
    const client = axios.create({
        baseURL: "http://127.0.0.1:8000"
        });
    const [currentUser, setCurrentUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function submitLogin(e) {
        e.preventDefault();
        client.post(
            "login",
            {
            email: email,
            password: password
            }
        ).then(function(res) {
            console.log(res)
            setCurrentUser(res.data);
            history('/feed')
            });
        }
    return (
        <div className="container">
        <div className="box">
            <div className="heading"></div>
            <form onSubmit={e => submitLogin(e)} className="login-form">
                <div className="field">
                    <input value={email} onChange={e => setEmail(e.target.value)} id="username" type="name" placeholder="Email"/>
                    <label htmlFor="username">Email</label>
                </div>
                <div className="field">
                    <input value={password} onChange={e => setPassword(e.target.value)}  id="password" type="password" placeholder="Password" />
                    <label htmlFor="password">Password</label>
                </div>
                <button type="submit" className="login-button" title="login">Log In</button>
                <div className="separator">
                <div className="line"></div>
                <p>OR</p>
                <div className="line"></div>
                </div>
                <div className="other">
                    <button className="fb-login-btn" type="button">
                        <i className="fa fa-facebook-official fb-icon"></i>
                        <span className="">Log in with Facebook</span>
                    </button>
                    <a className="forgot-password" href="#">Forgot password?</a>
                </div>
            </form>
        </div>
        <div className="footer-box">
            <p>Don't have an account?</p> <Link to="/signup">Sign Up</Link>
        </div>
        <div className="footer">
            <p>© 2023 SKYGRAM</p>
        </div>
        
        </div>
        
    )
}

export default Login

