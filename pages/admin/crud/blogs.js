import Link from 'next/link'
import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import BlogsRead from '../../../components/crud/BlogsRead'

const Blogs = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-3 pb-3">
              <h2>Manage blogs</h2>
            </div>
            <div className="col-md-12">
              <BlogsRead />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  )
}

export default Blogs