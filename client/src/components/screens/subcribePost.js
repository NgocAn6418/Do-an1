import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'
const SubcribePost = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch('/getsubpost', {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setData(result.posts)
            })
    }, [])
    const likePost = (id) => {
        fetch('/like', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }
    const unlikePost = (id) => {
        fetch('/unlike', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }
    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId,
                text,
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }
    const deletePost = (postId) => {
        fetch(`/deletepost/${postId}`, {
            method: "delete",
            headers: {
                "Authorization": localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
            })
    }
    return (
        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5 className="name-in-post" style={{ padding: "10px" }}><Link to={item.postedBy._id !== state._id ? '/profile/' + item.postedBy._id : '/profile'}>{item.postedBy.name}</Link> {item.postedBy._id == state._id &&
                                <i className="material-icons" style={{ float: "right", cursor: "pointer" }}
                                    onClick={() => { deletePost(item._id) }}>delete</i>}</h5>
                            <div className="card-image">
                                <img src={item.photo}></img>
                            </div>
                            <div className="card-content">
                                {
                                    item.likes.includes(state._id)
                                        ?
                                        <i className="material-icons" style={{ color: "pink", fontSize: "200%", cursor: "pointer" }}
                                            onClick={() => { unlikePost(item._id) }}
                                        >favorite</i>
                                        :
                                        <i className="material-icons" style={{ color: "pink", fontSize: "200%", cursor: "pointer" }}
                                            onClick={() => { likePost(item._id) }}
                                        >favorite_border</i>
                                }
                                <h6 style={{ fontSize: "80%", fontWeight: "bold" }}>{item.likes.length} hearts</h6>
                                <h6 className="title-post">{item.title}</h6>
                                <p className="body-post">{item.body}</p>
                                {
                                    item.comments.map(record => {

                                        return (
                                            <h6 className="font-cmt"><span className="name-in-post" style={{ fontWeight: "500" }}>{record.postedBy.name} </span>{record.text}</h6>
                                        )

                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input className="font-cmt" type="text" placeholder="Add a comment" />
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default SubcribePost