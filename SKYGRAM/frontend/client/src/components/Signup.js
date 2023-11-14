import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'
import "./Signup.css"
import Logo from "./logo.png"

function Signup() {
    const history = useNavigate()
    // const initialFormData = Object.freeze({
    //     email: '',
    //     name: '',
    //     username: '',
    //     password: '',
    // })

    // const [formData, setFormData] = useState(initialFormData)

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData, [e.target.name]: e.target.value.trim()
    //     })
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     axiosInstance
    //     .post('auth/register/', {
    //         email: formData.email,
    //         name: formData.name,
    //         username: formData.username,
    //         password: formData.password,
    //     })
    //     .then((res) => {
    //         history('/feed')
    //     })
    // }
    axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});
    const [currentUser, setCurrentUser] = useState();
    const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function(res) {
      client.post(
        "login",
        {
          email: email,
          password: password
        }
      ).then(function(res) {
        setCurrentUser(true);
        history("/feed")
      });
    });
  }
    return (
        <>
        <div class="page">
            <div class="header">
                <img src={Logo} class="logo"/>
                <p>Sign up to connect and see photos from your friends in the sky!</p>
                <button><i className="fab fa-facebook-square"></i> Log in with Facebook</button>
                <div className="separator">
                <div className="line"></div>
                <p>OR</p>
                <div className="line"></div>
                </div>
            </div>
            <div class="container">
                <form onSubmit={e => submitRegistration(e)}>
                <input value={email} onChange={e => setEmail(e.target.value)}type="text" placeholder="Email" name="email"/>
                {/* <label htmlFor="email">Email</label> */}
                {/* <input onChange={handleChange}type="text" placeholder="Name" name="name"/>
                <label htmlFor="name">Name</label> */}
                <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" name="username"/>
                {/* <label htmlFor="username">Username</label> */}
                <input value={password} onChange={e => setPassword(e.target.value)}type="password" placeholder="Password" name="password"/>
                {/* <label htmlFor="password">Password</label> */}
                <button type="submit">Sign up</button>
                </form>
                <ul>
                <li>By signing up, you agree to our</li>
                <li><a href="">Terms</a></li>
                <li><a href="">Data Policy</a></li>
                <li>and</li>
                <li><a href="">Cookies Policy</a> .</li>
                </ul>
            </div>
        </div>
        <div class="option">
            <p>Have an account? </p> <Link to="/login">Log in</Link>
        </div>
        <div class="otherapps">
            <p>Get the app.</p>
            <button type="button"><i class="fab fa-apple"></i> App Store</button>
            <button type="button"><i class="fab fa-google-play"></i> Google Play</button>
        </div>
        <div class="footer">
            <ul>
            <li><a href="">ABOUT</a></li>
            <li><a href="">HELP</a></li>
            <li><a href="">PRESS</a></li>
            <li><a href="">API</a></li>
            <li><a href="">JOBS</a></li>
            <li><a href="">PRIVACY</a></li>
            <li><a href="">TEMS</a></li>
            <li><a href="">LOCATIONS</a></li>
            <li><a href="">TOP ACCOUNTS</a></li>
            <li><a href="">HASHTAGS</a></li>
            <li><a href="">LANGUAGE</a></li>
            </ul>
            <p>© 2023 SKYGRAM</p>
        </div>
        </>   
    )
}
export default Signup