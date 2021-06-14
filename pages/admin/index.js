import Layout from '../../components/Layout'
import withAdmin from '../withAdmin'

const Admin = (user, token) => <Layout>Admin page ${JSON.stringify(user)}</Layout>

export default withAdmin(Admin)