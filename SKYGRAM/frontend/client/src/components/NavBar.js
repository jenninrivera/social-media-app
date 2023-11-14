import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import "./NavBar.css"
import SKYGRAMLogo from './SKYGRAM.png'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';


function NavBar(){
    const [isSmall, setIsSmall] = useState(false);
    const [isSearchFormVisible, setIsSearchFormVisible] = useState(false)

    const handleSearchClick = () => {
    setIsSmall(!isSmall);
    setIsSearchFormVisible(!isSearchFormVisible);
    };
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // useEffect(() => {
    //     if (query) {
    //         axios.get(`/api/your-existing-endpoint/?search=${query}`)
    //             .then((response) => {
    //                 setSearchResults(response.data);
    //             })
    //             .catch((error) => {
    //                 console.error('Error searching:', error);
    //             });
    //     }
    // }, [query]);

    

    const history = useNavigate()
    // const handleLogout = () => {
    //     axiosInstance.post('/auth/logout')
    //     .then(() => {
    //       localStorage.removeItem('token');
    //     //   localStorage.removeItem('refresh_token');
    //       delete axiosInstance.defaults.headers.common['Authorization'];
    //       history('/login');
    //     })
    //     .catch((error) => {
    //       console.error('Logout failed:', error);
    //     });
    //   }

    //   useEffect(() => {
    //     handleLogout();
    //   }, []);
    const [currentUser, setCurrentUser] = useState();
    const client = axios.create({
      baseURL: "http://127.0.0.1:8000"
    });
    
    function submitLogout(e) {
      e.preventDefault();
      client.post(
        "logout",
        {withCredentials: true}
      ).then(function(res) {
        setCurrentUser(false);
        history('/login')
      });
    }


    return (
        <div className={`NavBar ${isSmall ? 'NavBar__small' : ''}`}>
        
        <img className='NavBar__logo' src={SKYGRAMLogo} alt=''/>

        <div className="NavBar__buttons"> 
        <Link to="/feed">
        <button className="NavBar__button">
            <HomeIcon />
            <span>Home</span>
        </button>
        </Link>
        <button className="NavBar__button" onClick={handleSearchClick}>
            <SearchIcon />
            <span>Search</span>
        </button>
        {isSearchFormVisible && (
            <div>
          <input
            type="text"
            placeholder="Search users"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>{result.name}</li>
                ))}
            </ul>
          </div>
      )}
        {/* <button className="NavBar__button">
            <ExploreIcon />
            <span>Explore</span>
        </button> */}
        <Link to="/crashpads">
        <button className="NavBar__button">
            <PeopleAltIcon />
            <span>Crash Pads</span>
        </button>
        </Link>
        <Link to="/savedposts">
        <button className="NavBar__button">
            <BookmarkBorderIcon />
            <span>Saved</span>
        </button>
        </Link>
        <Link to='/create'>
        <button className="NavBar__button">
            <AddCircleOutlineIcon />
            <span>Create</span>
        </button>    
        </Link>
        <Link to="/profile">
        <div className="NavBar__profile">
            <span className="avatar">
            <div id="proicon"></div>
            </span>
            <div className="username__info">
            <span className="username">jenninrivera</span>
            </div>
        </div>
        </Link>
        {/* <button className="NavBar__button">
            <Avatar>
            {user.username ? user.username.charAt(0).toUpperCase() : "A"}
            </Avatar>
            <span>
            {user.username}{" "}
            <button onClick={handelLogout} className="logout__button">
                Logout
            </button>
            </span>
        </button> */}
        </div>
        <div className="NavBar__more">
          <form onSubmit={e => submitLogout(e)}>
          <button type="submit" className="NavBar__button">
            <LogoutIcon />
            <span className="NavBar__buttonText">Logout</span>
        </button>
            </form> 
        </div>
    </div>
        
    );
}

export default NavBar