import Link from 'next/link'
import Layout from '../../../components/Layout'
import Private from '../../../components/auth/Private'
import BlogsRead from '../../../components/crud/BlogsRead'
import {isAuth} from '../../../actions/auth'

const Blogs = () => {
  const username = isAuth() && isAuth().username
  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-3 pb-3">
              <h2>Manage blogs</h2>
            </div>
            <div className="col-md-12">
              <BlogsRead username={username} />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  )
}

export default Blogs