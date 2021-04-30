import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { showErrorMessage, showSuccessMessage } from '../helpers/alerts'
import { API } from '../config'
import { authenticate, isAuth } from '../helpers/auth'
import Router from 'next/router'

const Login = () => {
    const [state, setState] = useState({
        email: 'reactnodeawsrg7d@gmail.com',
        password: 'wingardium7',
        error: '',
        success: '',
        buttonText: 'Login'
    })

    useEffect(() => {
        isAuth() && Router.push('/')
    }, [])

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
                authenticate(response, () => isAuth() && isAuth().role === 'admin' ? Router.push('/admin') : Router.push('/user'))
            }
        } catch (error) {
            console.log({ error })
            setState({
                ...state,
                buttonText: 'Login',
                // this used to be error.response.data.error not sure if there are 2 types of errors ¯\_(ツ)_/¯
                error: error.message
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
