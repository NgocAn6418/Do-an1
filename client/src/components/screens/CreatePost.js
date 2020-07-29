import React, { useState, useEffect } from 'react'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'
const CreatePost = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    useEffect(() => {
        if (url) {
            fetch('/createpost', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url,
                })
            }).then(res => res.json()).then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                } else {
                    M.toast({ html: "Created post successfully", classes: "#43a047 green darken-1" })
                    history.push('/')
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }, [url])
    const PostDetails = () => {
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

    return (
        <div className="card input-filed"
            style={{
                margin: "10px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}>
            <input type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input type="text"
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)} />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Image upload</span>
                    <input type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light " type="submit" name="action"
                onClick={() => PostDetails()}
            >Post</button>
        </div>
    )
}
export default CreatePost