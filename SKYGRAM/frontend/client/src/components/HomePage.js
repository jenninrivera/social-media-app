import React, {useEffect, useState} from 'react'
import './HomePage.css'
import NavBar from './NavBar'
import Feed from './Feed'

function HomePage({posts, currentUser}) {
    
    return (
    <div className='HomePage'>
        <div className='homepage__nav'>
        <NavBar currentUser={currentUser}/>
        </div>
        <div className='homepage__feed'>
        <Feed posts={posts}/>
        </div>

    </div>
        
    )
}

export default HomePage