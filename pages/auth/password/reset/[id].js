import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { showErrorMessage, showSuccessMessage } from '../../../../helpers/alerts'
import { API } from '../../../../config'
import { withRouter } from 'next/router'
import Layout from '../../../../components/Layout'

const ResetPassword = ({ router }) => {
    const [state, setState] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset Password',
        success: '',
        error: '',
    })

    const { name, token, newPassword, buttonText, success, error } = state

    useEffect(() => {
        let token = router.query.id
        if (token) {
            const { name } = jwt.decode(token)
            setState({ ...state, name, token })
        }
    }, [router])

    const handleChange = e => {
        setState({
            ...state,
            newPassword: e.target.value,
            success: '',
            error: '',
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        
        setState({ ...state, buttonText: 'Resetting' });
        try {
            const response = await axios.put(`${API}/reset-password`, { newPassword, resetPasswordLink: token })
            console.log('Forgot Password response', response)
            setState({
                ...state,
                newPassword: '',
                buttonText: 'Done',
                success: response.data.message
            })
        } catch (error) {
            console.log('Reset Password error', error)
            setState({
                ...state,
                buttonText: 'Reset Password',
                error: error.response.data.error
            })
        }
    }

    const passwordResetForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    value={newPassword}
                    placeholder="Type your new password"
                    required
                />
            </div>
            <div>
                <button className="btn btn-outline-warning">{buttonText}</button>
            </div>
        </form>
    )

    return (
        <Layout>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Hi {name}, ready to reset your password?</h1>
                    <br/>
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                    {passwordResetForm()}
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(ResetPassword)