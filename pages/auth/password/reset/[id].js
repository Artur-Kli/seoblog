import {useState} from 'react'
import {withRouter} from 'next/router'
import Layout from '../../../../components/Layout'
import {resetPassword} from '../../../../actions/auth'

const ResetPassword = ({router}) => {
  const [values, setValues] = useState({
    name: '',
    newPassword: '',
    error: '',
    message: '',
    showForm: true
  })

  const {name, newPassword, error, message, showForm} = values

  const handleSubmit = e => {
    e.preventDefault()

    resetPassword({
      resetPasswordLink: router.query.id,
      newPassword
    }).then((data) => {
      // console.log(data)
      if(data.error) {
        setValues({...values, error: data.error, showForm: true, newPassword: ''})
      } else {
        setValues({...values, message: data.message, error: '', showForm: false, newPassword: ''})
      }
    })
  }

  const passwodResetForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group pt-3">
        <input 
          type="password" 
          onChange={e => setValues({...values, newPassword: e.target.value})} 
          className="form-control" 
          value={newPassword} 
          placeholder="Type new password" 
          required 
        />
      </div>
      <div>
        <button className="btn btn-primary">Change password</button>
      </div>
    </form>
  )

  const showError = () => (
    error ? <div className="alert alert-danger">{error}</div> : ''
  )
  const showMessage = () => (
    message ? <div className="alert alert-success">{message}</div> : ''
  )

  return (
    <Layout>
      <div className="container">
        <h2>Reset Password</h2>
        <hr/>
        {showError()}
        {showMessage()}
        {showForm && passwodResetForm()}
      </div>
    </Layout>
  )
}

export default withRouter(ResetPassword)