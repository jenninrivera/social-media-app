import React, {useEffect, useState} from 'react'
import './CrashPadPost.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CrashPadPostCard from './CrashPadPostCard'
import NavBar from './NavBar'

function CrashPadPost() {
//   const [crashPosts, setCrashPosts] = useState([])
//   useEffect(() => {
//     fetch('/crashpads')
//     .then(response => response.json())
//     .then(crashPosts => console.log(setCrashPosts([...crashPosts].sort().reverse())))
// }, [])
const crashpadposts = [
  {
    "username": "freddyprice",
    "text": "Working a charter flight to Amsterdam next week ,any rooms available?",
    "location": "Amsterdam"
  },
  {
    "username": "emilydelta",
    "text": "Looking for A 2 night stay in Los Angeles, will take anything!",
    "location": "Los Angeles, California",
  },
  {
    "username": "samantharedding",
    "text": "Spare room available for the next week!",
    "location": "Hoboken, New Jersey",
  },
  {
    "username": "tiaholmes",
    "text": "I have a room avaiable for the next two days.",
    "location": "Philidelphia, Pennsylvania",
  },
  {
    "username": "kennyfranklin",
    "text": "Spare room in the best city in the world! For the next two days -",
    "location": "Miami, Florida",
  },
  {
    "username": "ashleyrs",
    "text": "Large spare room, big windows, in the obviously best city on Planet Earth... NYC! Must be Pet friendly because I have two cats!",
    "location": "New York, NY"
  }
]
  return (
    <div>
        <NavBar />
        {crashpadposts.map((post) => (<CrashPadPostCard key={post.username} crashpadpost={post}/>))}

        </div>
    
    
  )
}

export default CrashPadPost;