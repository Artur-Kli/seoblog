import {withRouter} from 'next/router'
import Layout from '../components/Layout'
import SigninComponent from '../components/auth/SigninComponent'

const Signin = ({router}) => {
  const showRedirectMessage = () => {
    if(router.query.message) {
      return <div className="alert alert-warning">{router.query.message}</div>
    } else {
      return
    }
  }
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Signin</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {showRedirectMessage()}
          <SigninComponent />
        </div>
      </div>
    </Layout>
  )
}

export default withRouter(Signin)