import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'
const Signin = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" })
            return
        }

        fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json()).then(data => {
            if (data.error) {
                M.toast({ html: data.error, classes: "#c62828 red darken-3" })
            } else {
                localStorage.setItem('jwt', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                dispatch({ type: 'USER', payload: data.user })
                M.toast({ html: "Sign in successfully", classes: "#43a047 green darken-1" })
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="mycard">
            <div className="card auth-card">
                <img style={{width:"30%",}} src={require('./image/logo.png')}></img>
                <h2 className="brand-logo" style={{margin:"0px auto 10px auto"}}>Cactus</h2>
                <div className="input-field">
                <input
                    className="validate"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <label htmlfor="email">Email</label>
                </div>
                <div className="input-field">
                <input
                    className="validate"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <label htmlfor="password">Password</label>
                </div>
                <button className="btn waves-effect waves-light " type="submit" name="action"
                    onClick={() => PostData()}>Sign in</button>
                <h5 className="font-form">
                    <Link to='/signup'>Create a new account? </Link>
                </h5>
            </div>
        </div>
    )
}
export default Signin