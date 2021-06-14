import axios from 'axios'
import API from '../config'
import { getCookie } from "../helpers/auth"

const withAdmin = Page => {
    const WithAdminUser = props => <Page {...props} />
    WithAdminUser.getInitialProps = async context => {
        const token = getCookie('token', context.req)
        let user = null
        
        if (token) {
            try {
                const response = await axios.get(`${API}/admin`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        contentType: 'application/json'
                    }
                })
                user = response.data
            } catch (error) {
                user = null
            }
        }

        if (!user) {
            console.log('34')
            context.res.writeHead(302, {
                Location: '/'
            })
            context.res.end()
        } else {
            return {
                ...(Page.getInitialProps ? Page.getInitialProps(context) : {}),
                user,
                token
            }
        }
    }

    return WithAdminUser
}

export default withAdmin