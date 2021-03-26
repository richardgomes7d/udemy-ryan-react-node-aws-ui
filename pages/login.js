import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { showErrorMessage, showSuccessMessage } from '../helpers/alerts'
import { API } from '../config'

const Login = () => {
    const [state, setState] = useState({
        email: 'reactnodeawsrg7d@gmail.com',
        password: 'wingardium7',
        error: '',
        success: '',
        buttonText: 'Login'
    })

    const { name, email, password, error, success, buttonText } = state

    const handleChange = name => e => {
        setState({ ...state, [name]: e.target.value, error: '', success: '', buttonText: 'Login' })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.table({ email, password })
        setState({ ...state, buttonText: 'Logging in'})
        try {
          const response = await axios.post(`${API}/login`, {
                  email,
                  password
          })
          console.log({ response })
          if (response.data.error) {
            setState({
                ...state,
                buttonText: 'Login',
                error: response.data.error
            })
          } else {
              setState({
                  ...state,
                  email: '',
                  password: '',
                  buttonText: 'Submitted',
                  success: response.data.message,
              })
          }
        } catch (error) {
            console.log({ error })
            setState({
                ...state,
                buttonText: 'Login',
                error: error.response.data.error
            })        
        }
    }

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    value={email}
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control"
                    placeholder="Type your email"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    value={password}
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control"
                    placeholder="Type your password"
                    required
                />
            </div>
            <div className="form-group">
                <button className="btn btn-outline-warning">{buttonText}</button>
            </div>
        </form>
    )

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <h1>Login</h1>
                <br />
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                <br />
                {loginForm()}
                <hr />
                {JSON.stringify(state)}
            </div>
        </Layout>
    )
}

export default Login
