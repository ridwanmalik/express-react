import { useState } from 'react'
import { useHistory } from 'react-router'
import { Link, Redirect } from 'react-router-dom'

const Login = ({ register, login, isLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [errorUsername, setErrorUsername] = useState(false)
  const [errorFirstName, setErrorFirstName] = useState(false)
  const [errorLastName, setErrorLastName] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
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
    if (!email) {
      setErrorEmail(true)
      return
    } else {
      setErrorEmail(false)
    }
    if (!password) {
      setErrorPassword(true)
      return
    } else {
      setErrorPassword(false)
    }
    if (!firstName) {
      setErrorFirstName(true)
      return
    } else {
      setErrorFirstName(false)
    }
    if (!lastName) {
      setErrorLastName(true)
      return
    } else {
      setErrorLastName(false)
    }
    //register
    const registerBody = { username, password, email, firstName, lastName, website }
    const registerData = await register(registerBody)


    if (registerData) {
      const loginBody = { username, password }
      const loginData = await login(loginBody)

      //Check if credentials are correct
      if (loginData.success) {
        setUsername('')
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        history.push("/")
      } else {
        setErrorLogin(true)
        setErrorLoginMsg(loginData.msg)
      }
    } else {
      setErrorLogin(true)
      setErrorLoginMsg(registerData.msg)
    }
  }
  return (
    <section id="register" className="h-100">
      {isLogin && <Redirect to="/" />}
      <div className="container h-100 align">
        <div className="register-form-wrapper d-flex align-items-center justify-content-center flex-column h-100">
          {errorLogin &&
            <div className="login-alert alert alert-danger alert-dismissible fade show" role="alert">
              {errorLoginMsg}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setErrorLogin(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          }
          <h1 className="mb-4">Express-React</h1>
          <form className="register-form px-3 py-4 border shadow rounded" onSubmit={onSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="small" htmlFor="username">Username</label>
                <input type="text" className={errorUsername ? "form-control is-invalid" : "form-control"} id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} aria-describedby="usernameFeedback" />
                <div id="usernameFeedback" className="invalid-feedback">
                  Please Provide Your Username.
              </div>
              </div>
              <div className="form-group col-md-6">
                <label className="small" htmlFor="email">Email Address</label>
                <input type="email" className={errorEmail ? "form-control is-invalid" : "form-control"} id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailFeedback" />
                <div id="emailFeedback" className="invalid-feedback">
                  Please Provide Your Email Address.
              </div>
              </div>
            </div>
            <div className="form-group">
              <label className="small" htmlFor="password">Password</label>
              <input type="password" className={errorPassword ? "form-control is-invalid" : "form-control"} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-describedby="passwordFeedback" />
              <div id="passwordFeedback" className="invalid-feedback">
                Please Provide A Password.
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="small" htmlFor="firstName">First Name</label>
                <input type="text" className={errorFirstName ? "form-control is-invalid" : "form-control"} id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} aria-describedby="firstNameFeedback" />
                <div id="firstNameFeedback" className="invalid-feedback">
                  Please Provide Your First Name.
                </div>
              </div>
              <div className="form-group col-md-6">
                <label className="small" htmlFor="lastName">Last Name</label>
                <input type="text" className={errorLastName ? "form-control is-invalid" : "form-control"} id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} aria-describedby="LastNameFeedback" />
                <div id="LastNameFeedback" className="invalid-feedback">
                  Please Provide Your Last Name.
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="small" htmlFor="website">Website (Optional)</label>
              <input type="text" className="form-control" id="website" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-block btn-primary mt-4">Register</button>
            <Link to="/" className="btn btn-block btn-light mt-2">Back To Home</Link>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
