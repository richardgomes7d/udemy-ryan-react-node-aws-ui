import Layout from '../../components/Layout'
import withUser from '../withUser'

const User = ({ user, token }) => <Layout>{`User page ${JSON.stringify(token)}`}</Layout>

export default withUser(User)