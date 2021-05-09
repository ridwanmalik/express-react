import { useState } from 'react'
import { useHistory } from 'react-router'
import { Link, Redirect } from 'react-router-dom'

const Login = ({ login, isLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorUsername, setErrorUsername] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorLogin, setErrorLogin] = useState(false)
  const [errorLoginMsg, setErrorLoginMsg] = useState('')
  let history = useHistory()
  const onSubmit = async (e) => {
    e.preventDefault()
    //Validation
    if (!username) {
      setErrorUsername(true)
      return
    } else {
      setErrorUsername(false)
    }
    if (!password) {
      setErrorPassword(true)
      return
    } else {
      setErrorPassword(false)
    }
    let bodyData = { username, password }
    let validMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //Check if it's a email or not
    if (validMail.test(username)) {
      bodyData = { email: username, password }
    }
    const loginData = await login(bodyData)
    if (loginData.success) {
      setPassword('')
      setUsername('')
      history.replace("/")
    } else {
      setErrorLogin(true)
      setErrorLoginMsg(loginData.msg)
    }
  }

  return (
    <section id="login" className="h-100">
      {isLogin && <Redirect to="/" />}
      <div className="container h-100 align">
        <div className="login-form-wrapper d-flex align-items-center justify-content-center flex-column h-100">
          {errorLogin &&
            <div className="login-alert alert alert-danger alert-dismissible fade show" role="alert">
              {errorLoginMsg}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setErrorLogin(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          }
          <h1 className="mb-4">Express-React</h1>
          <form className="login-form px-3 py-4 border shadow rounded" onSubmit={onSubmit}>
            <div className="form-group">
              <label className="small" htmlFor="username">Username / Email Address</label>
              <input type="text" className={errorUsername ? "form-control is-invalid" : "form-control"} id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} aria-describedby="usernameFeedback" />
              <div id="usernameFeedback" className="invalid-feedback">
                Please Provide Your Username/Email Address.
              </div>
            </div>
            <div className="form-group">
              <label className="small" htmlFor="password">Password</label>
              <input type="password" className={errorPassword ? "form-control is-invalid" : "form-control"} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-describedby="passwordFeedback" />
              <div id="passwordFeedback" className="invalid-feedback">
                Please Provide Your Password.
              </div>
            </div>
            <button type="submit" className="btn btn-block btn-primary mt-4">Login</button>
            <Link to="/" className="btn btn-block btn-light mt-2">Back To Home</Link>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login

