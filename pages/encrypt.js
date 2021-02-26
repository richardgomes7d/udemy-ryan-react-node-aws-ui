import { useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { showErrorMessage, showSuccessMessage } from '../helpers/alerts'
import { API } from '../config'
import crypto from 'crypto'


const Encrypt = () => {
    const [state, setState] = useState({
        salt: '1321608104587',
        password: 'wingardium7',
        hashedPassword: '',
        error: '',
        success: '',
        buttonText: 'Encrypt'
    })

    const { salt, password, hashedPassword, error, success, buttonText } = state

    const handleChange = name => e => {
        setState({ ...state, [name]: e.target.value, error: '', success: '', buttonText: 'Encrypt' })
    }

    const encryptPassword = (salt, password) => {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            console.log(err)
            return '';
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.table({ salt, password, hashedPassword })
        setState({ ...state, hashedPassword: encryptPassword(salt, password)})

    }

    const encryptForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    value={salt}
                    onChange={handleChange('salt')}
                    type="text"
                    className="form-control"
                    placeholder="Type your name"
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
                <input
                    value={hashedPassword}
                    type="text"
                    className="form-control"
                    placeholder="Hashed password"
                    readOnly
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
                <h1>Encrypt</h1>
                <br />
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                <br />
                {encryptForm()}
                <hr />
                {JSON.stringify(state)}
            </div>
        </Layout>
    )
}

export default Encrypt
