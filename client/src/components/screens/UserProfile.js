import React, { useEffect, useContext, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { UserContext } from '../../App'
const UserProfile = () => {
    const { state, dispatch } = useContext(UserContext);
    const [userProfile, setProfile] = useState(null);
    const { userId } = useParams()
    const [showFollow, setShowfollow] = useState(state ? !state.following.includes(userId) : true)
    useEffect(() => {
        fetch(`/user/${userId}`, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setProfile(result)
            })
    }, [])
    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: userId
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem('user', JSON.stringify(data))
                setProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id]

                        }
                    }
                })
                setShowfollow(false)
            })
    }
    const unfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unfollowId: userId
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem('user', JSON.stringify(data))

                setProfile((prevState) => {
                    const newFollower = prevState.user.followers.filter(item => item != data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower

                        }
                    }
                })
                setShowfollow(true)
            })
    }
    return (
        <>
            {
                userProfile ? <div style={{ maxWidth: "70%", margin: "0px auto" }}>
                    <div style={{
                        margin: "18px 0px",
                        borderBottom: "1px solid grey"
                    }}>


                        <div style={{
                            display: "flex",
                            justifyContent: "space-around",
                            width: "500px"

                        }}>
                            <div>
                                <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                                    src={userProfile.user.pic} />
                            </div>
                            <div>
                                <h4>{userProfile.user.name}</h4>
                                <h5>{userProfile.user.email}</h5>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                                    <h6>{userProfile.posts.length} posts</h6>
                                    <h6>{userProfile.user.followers.length} follower</h6>
                                    <h6>{userProfile.user.following.length} following</h6>
                                </div>
                                {showFollow ?
                                    <button className="btn waves-effect waves-light " type="submit" name="action"
                                        style={{ margin: "10px" }} onClick={() => followUser()}>Follow</button>
                                    :
                                    <button className="btn waves-effect waves-light " type="submit" name="action"
                                        style={{ margin: "10px" }} onClick={() => unfollowUser()}>unfollow</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="gallery">
                        {
                            userProfile.posts.map(item => {
                                return (
                                    <div className="item">
                                        <img key={item._id} className="item-img" src={item.photo} alt={item.title}></img>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                    :
                    <h2>Loading...</h2>
            }

        </>
    )
}
export default UserProfile