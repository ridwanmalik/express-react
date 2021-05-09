import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import ShowPost from './components/ShowPost'
import Users from './components/Users'
import EditPost from './components/EditPost'

function App() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [errorPost, setErrorPost] = useState(null)
  const [isLogin, setIsLogin] = useState(localStorage.getItem("login"))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [token, setToken] = useState(localStorage.getItem("token"))


  const getUsers = async () => {
    const usersFormServer = await fetchUsers()
    setUsers(usersFormServer)
  }
  const getPosts = async () => {
    const postsFormServer = await fetchPosts()
    setPosts(postsFormServer)
  }

  const login = async (bodyData) => {
    //Fetch Auth Data
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    const data = await response.json()
    //Check if credentials are correct
    if (data.success) {
      localStorage.setItem('login', true)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.data))
      setUser(data.data)
      setToken(data.token)
      setIsLogin(true)
      await getPosts()
      await getUsers()
    }
    return data
  }

  const register = async (registerBody) => {
    const registerResponse = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(registerBody)
    })
    const registerData = await registerResponse.json()

    return registerData
  }



  useEffect(() => {
    if (isLogin) {
      if (Object.keys(posts).length === 0) {
        getPosts()
      }
      if (Object.keys(users).length === 0) {
        getUsers()
      }
    }
  }, [login])

  const fetchPostComments = async (id) => {
    const response = await fetch(`/api/posts/${id}/comments`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    const data = await response.json()
    return data.data
  }

  const fetchPosts = async () => {
    const response = await fetch("/api/posts", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    const data = await response.json()
    return data.data
  }

  const fetchUsers = async () => {
    const response = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    const data = await response.json()
    return data.data
  }

  const fetchPost = async (id) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    const data = await response.json()
    return data.data
  }

  const deletePost = async (id) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    const data = await response.json()
    if (data.success) {
      getPosts()
    }
    return data.data
  }

  const logout = () => {
    localStorage.removeItem('login')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setIsLogin(false)
  }

  return (
    <Router>
      <div className="App">
        <Route path='/' exact>
          <Navbar isLogin={isLogin} onLogout={logout} user={user} />
          {isLogin ?
            <Dashboard user={user} token={token} posts={posts} onLoad={getPosts} errorPost={errorPost} setErrorPost={setErrorPost} />
            : <Home />
          }
        </Route>
        <Route path='/login'>
          <Login login={login} isLogin={isLogin} />
        </Route>
        <Route path='/register'>
          <Register register={register} login={login} isLogin={isLogin} />
        </Route>
        <Route path='/profile'>
          <Navbar isLogin={isLogin} onLogout={logout} user={user} />
          <Profile isLogin={isLogin} user={user} token={token} onLoad={getPosts} setErrorPost={setErrorPost} posts={posts} />
        </Route>
        <Route path="/posts/:id" exact>
          <Navbar isLogin={isLogin} onLogout={logout} user={user} />
          <ShowPost isLogin={isLogin} token={token} user={user} fetchPost={fetchPost} fetchPostComments={fetchPostComments} onDelete={deletePost} />
        </Route>
        <Route path="/posts/:id/edit" exact>
          <Navbar isLogin={isLogin} onLogout={logout} user={user} />
          <EditPost isLogin={isLogin} token={token} user={user} onLoad={getPosts} fetchPost={fetchPost} fetchPostComments={fetchPostComments} onDelete={deletePost} />
        </Route>
        <Route path="/users">
          <Navbar isLogin={isLogin} onLogout={logout} user={user} />
          <Users isLogin={isLogin} token={token} user={user} users={users} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
