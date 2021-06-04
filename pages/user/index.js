import axios from 'axios'
import Layout from '../../components/Layout'
import API from '../../config'
import { getCookie } from '../../helpers/auth'

const User = ({ user }) => <Layout>{`User page ${user}`}</Layout>

User.getInitialProps = async(context) => {
    const token = getCookie('token', context.req)

    try {
        const response = await axios.get(`${API}/user`, {
            headers: {
                authorization: `Bearer ${token}`,
                contentType: 'application/json'
            }
        })
        return { user: response.data.name }
    } catch (error) {
        if (!error.response) {
            return { user: 'no user (not even a response)'}
        }
        if (error.response.status === 401) {
            return { user: 'no user'}
        }
    }
}

export default User