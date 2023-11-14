import React from 'react'
import "./CrashPadPostCard.css"
function CrashPadPostCard({crashpadpost}) {
  
  return (
    // <div className="crashpost">

    //     <div className="user_info">
    //         <div id="propic">
    //             <img src="" alt=""/>
    //         </div>
    //         <span>username</span>
    //     </div>
    //     <h3>📍 location</h3>
    //     <p>text</p>
    // </div>
    <>
    <div class="blog-container">
    
    <div class="blog-header">
            <h3>{crashpadpost.username}</h3>
        
    </div>

    <div class="blog-body">
        <div class="blog-title">
        <h1><a href="#">📍 {crashpadpost.location}</a></h1>
        </div>
        <div class="blog-summary">
        <p>{crashpadpost.text}</p>
        </div>
    </div>
    </div>
    </>

  )
}


export default CrashPadPostCard