import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')
    const [url, setUrl] = useState(null)
    useEffect(() => {
        if (url) {
            uploadFields()
        }
    }, [url])
    const uploadPic = () => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'DoAn_fff')
        data.append('cloud_name', 'dw3wpsnjc')
        fetch('https://api.cloudinary.com/v1_1/dw3wpsnjc/image/upload', {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const uploadFields = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" })
            return
        }

        fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
                pic: url
            })
        }).then(res => res.json()).then(data => {
            if (data.error) {
                M.toast({ html: data.error, classes: "#c62828 red darken-3" })
            } else {
                M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                history.push('/signin')
            }
        }).catch(err => {
            console.log(err)
        })
    }


    const PostData = () => {
        if (image) {
            uploadPic()
        } else {
            uploadFields()
        }
    }
    return (
        <div className="mycard">
            <div className="card auth-card">
            <img style={{width:"30%",}} src={require('./image/logo.png')}></img>
            <h2 className="brand-logo" style={{margin:"0px auto 10px auto"}}>Cactus</h2>
            <div className="input-field">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <label htmlfor="text">Name</label>
            </div>
            <div className="input-field">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <label htmlfor="email">Email</label>
            </div>
            <div className="input-field">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <label htmlfor="password">Password</label>
            </div>
                <div className="file-field input-field">
                    <div className="btn">
                        <span>Avatar image upload</span>
                        <input type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action"
                    onClick={() =>
                        PostData()
                    }>Sign Up</button>

                <h5 className="font-form">
                    <Link to='/signin'>Already an account?</Link>
                </h5>
            </div>
        </div>
    )
}
export default Signup