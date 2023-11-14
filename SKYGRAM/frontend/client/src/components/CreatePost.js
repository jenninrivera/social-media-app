import React from 'react'
import NavBar from './NavBar'
import {useState} from 'react'
import {useNavigate} from "react-router-dom"
import './Create.css'

function CreatePost({addNewPost}) {
    const navigate = useNavigate()
    const defaultObj = {
        image: null,
        caption: ""
    }

    const [form, setForm] = useState(defaultObj)

    const handleSubmit = (e) => {
        e.preventDefault()
        addNewPost(form)
        console.log(form)
        setForm(defaultObj)
    }
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleImageChange = (e) => {
        setForm({...form, 
          image: e.target.files[0]
        })
      };


  return (
    <>
    <NavBar />
    <div className="container">
        <div className="box">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="field">
                    <input onChange={handleImageChange} accept="image/png, image/jpeg" name="image" className="file" type="file"/>
                </div>
                <div className="field">
                    <input onChange={handleChange} value={form.caption} name="caption"className="caption" type="text" placeholder="..." />
                    <label htmlFor="password">Caption</label>
                </div>
                <button className="login-button" type="submit">Post</button>
                
            </form>
        </div>
        
        
        
        </div>
      </>
  )
}

export default CreatePost