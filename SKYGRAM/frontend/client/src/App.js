import {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import Login from './components/Login';
import HomePage from './components/HomePage'
import Signup from './components/Signup'
import CreatePost from './components/CreatePost'
import CrashPadPost from './components/CrashPadPost'
import SavedPosts from './components/SavedPosts'
import Profile from "./components/Profile"
import axios from 'axios';
// import PrivateRoute from './utils/PrivateRoute'
// import { AuthProvider } from './context/AuthContext'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


function App() {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    client.get("user")
    .then(function(res) {
      console.log(res)
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);
  // useEffect(()=> {
  //   console.log()
  //   console.log(localStorage.getItem('token'))
  //   fetch("auth/api/check-auth/",{
  //            headers: {
  //              Authorization: `Bearer ${localStorage.getItem('token')}`,
  //            },
  //          }).then((res) => {
  //     if (res.ok) {
  //       console.log('res ok')
  //         res.json().then((user) => setisAuthenticated(true));
  //     }else{
  //       console.log('res not ok')
  //     }
  // });
  // },[])
  // const checkUserAuthentication = async () => {
  //   try {
  //     const response = await axios.get('auth/api/check-auth/', {
  //       headers: {
  //         Authorization: `JWT ${localStorage.getItem('access_token')}`,
  //       },
  //     });
  
  //     if (response.data.detail === 'Success') {
  //       setisAuthenticated(true)
  //       return true;
  //     } else {
  //       setisAuthenticated(false)
  //       return false;
  //     }
  //   } catch (error) {

  //     return false;
  //   }
  // };

  useEffect(() => {
    fetch('feed')
    .then(response => response.json())
    .then(posts => setPosts([...posts].sort().reverse()))
}, [])

  const addNewPost = (newPost) => {
    const formData = new FormData();

    formData.append('caption', newPost.caption);
    formData.append('image', newPost.image);

  //   console.log(formData.get('caption'))
  //   console.log(formData.get('image'))


    fetch('http://127.0.0.1:8000/posts', {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(newData => setPosts([newData, ...posts]))
    .then(navigate('/feed'))
  }
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={currentUser ? (<HomePage posts={posts} /> ):(<Login />)}/>
        <Route path="/create" element={<CreatePost addNewPost={addNewPost} />}/>
        <Route path="/crashpads" element={<CrashPadPost/>}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/savedposts" element={<SavedPosts/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/feed" element={<HomePage posts={posts} currentUser={currentUser} />}/>
      </Routes>
        
    </div>
  );
}

export default App;
