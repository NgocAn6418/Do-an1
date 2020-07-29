import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from './components/Navbar'
import SignIn from './components/screens/Signin'
import SignUp from './components/screens/Signup'
import Profile from "./components/screens/Profile";
import Home from './components/screens/Home'
import CreatePost from './components/screens/CreatePost'
import UserProfile from './components/screens/UserProfile'
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import { reducer, initialState } from './components/reducers/userReducers'
import SubcribePost from './components/screens/subcribePost';

export const UserContext = createContext()
const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({ type: "USER", payload: user })
      history.push('/')
    } else {
      history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/signup'>
        <SignUp />
      </Route>
      <Route path='/signin'>
        <SignIn />
      </Route>
      <Route exact path='/profile'>
        <Profile />
      </Route>
      <Route path='/createpost'>
        <CreatePost />
      </Route>
      <Route path='/profile/:userId'>
        <UserProfile />
      </Route>
      <Route path='/myfollowerspost'>
        <SubcribePost />
      </Route>
    </Switch>
  )
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter >
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
