import {useState} from 'react'
import Layout from '../../../components/Layout'
import {forgotPassword} from '../../../actions/auth'

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
    showEmail: '',
    success: '',
    error: '',
    showForm: true
  })

  const {email, showEmail, success, error, showForm} = values

  const handleChange = name => e => {
    setValues({...values, showEmail: e.target.value, success: '', error: '', [name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()

    setValues({...values, success: '', error: ''})
    forgotPassword({email}).then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, success: data.success, email: '', showForm: false})
      }
    })
  }

  const showError = () => (
    error ? <div className="alert alert-danger">{error}</div> : ''
  )
  const showMessage = () => (
    success && <div className="alert alert-success">Email has been sent to <b>{`${showEmail}`}</b>. Follow the instructions to reset your password. Link expires in 10min.</div>
  )

  const passwodForgotForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group pt-3">
        <input 
          type="email" 
          onChange={handleChange('email')} 
          className="form-control" 
          value={email} 
          placeholder="Type your email" 
          required 
        />
      </div>
      <div>
        <button className="btn btn-primary">Send password reset link</button>
      </div>
    </form>
  )

  return (
    <Layout>
      <div className="container">
        <h2>Forgot password</h2>
        {showError()}
        {showMessage()}
        {showForm && passwodForgotForm()}
      </div>
    </Layout>
  )
}

export default ForgotPassword