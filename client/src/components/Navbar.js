import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
const Navbar = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
        if (state) {
            return [
                <li><Link to="/createpost"><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"rgba(255, 255, 255, 0.5)"}}>add_a_photo</i></Link></li>,
                <li><Link to="/profile"><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"rgba(255, 255, 255, 0.5)"}}>account_circle</i></Link></li>,
                <li><Link to="/myfollowerspost"><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"rgba(255, 255, 255, 0.5)"}}>people_outline</i></Link></li>,
                <li>
                    <button className="btn #c62828 red darken-3 font-form" type="submit" name="action"
                        onClick={() => {
                            localStorage.clear()
                            dispatch({ type: "CLEAR" })
                            history.push('/signin')
                        }}>Logout</button>
                </li>
            ]
        } else {
            return [
                <li className="font-form"><Link to="/signin">Sign in</Link></li>,
                <li className="font-form"><Link to="/signup">Sign up</Link></li>
            ]
        }
    }
    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-wrapper drank">
                    <Link to={state ? "/" : "signin"} className="brand-logo left ">Cactus</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {renderList()}
                     </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar