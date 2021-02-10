import {useState, useEffect} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import {getCookie, isAuth, updateUser} from '../../actions/auth'
import {getProfile, update} from '../../actions/user'
import {API} from '../../config'

const ProfileUpdate = () => {

  const [values, setValues] = useState({
    username: '',
    username_for_photo: '',
    name: '',
    email: '',
    about: '',
    password: '',
    error: false,
    success: false,
    loading: false,
    photo: '',
    userData: process.browser && new FormData()
  })

  const token = getCookie('token')
  const {
    username, 
    username_for_photo, 
    name, 
    email, 
    about, 
    password, 
    error, 
    success, 
    loading, 
    photo, 
    userData
  } = values
  
  const init = () => {
    getProfile(token).then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
      } else {
        console.log(data)
        setValues({
          ...values, 
          username: data.username,
          username_for_photo: data.username,
          name: data.name, 
          email: data.email, 
          about: data.about
        })
      }
    })
  }
  
  useEffect(() => {
    init()
    setValues({...values, userData: new FormData()})
  }, [])

  const handleChange = name => e => {
    // console.log(e.target.value)
    const value = name === 'photo' ? e.target.files[0] : e.target.value
    // let userData = new FormData()
    userData.set(name, value)
    console.log(...userData)
    setValues({...values, [name]: value, userData, error: false, success: false})
  }

  const handleSubmit = e => {
    e.preventDefault()
    // console.log(...userData)
    setValues({...values, loading: true})
    update(token, userData).then(data => {
      if(data.error) {
        console.log('data error: ', data.error)
        setValues({...values, error: data.error, success: false, loading: false})
      } else {
        updateUser(data, () => {
          setValues({
            ...values, 
            username: data.username, 
            name: data.name, 
            email: data.email, 
            about: data.about,
            password: '',
            success: true,
            loading: false
          })
          setTimeout(() => {
            Router.reload()
          }, 500)
        })
      }
    })
  }

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-info mr-2">Profile Photo
          <input onChange={handleChange('photo')} type="file" accept="image/*" hidden/>
        </label>
        <small className="text-muted">Max size: 1mb</small>
      </div>
      <div className="form-group">
        <label className="text-muted">User Name</label>
        <input onChange={handleChange('username')} type="text" value={username} className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
      </div>
      {/*<div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} type="email" value={email} className="form-control" />
      </div>*/}
      <div className="form-group">
        <label className="text-muted">About</label>
        <textarea onChange={handleChange('about')} type="text" value={about} className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
      </div>
      <div>
        {showSuccess()}
        {showError()}
        {showLoading()}
      </div>
      <div>
        <button type="submit" className="btn btn-outline-primary">Update</button>
      </div>
    </form> 
  )

  
  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  )

  const showSuccess = () => (
    <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
      Profile updated
    </div>
  )

  const showLoading = () => (
    <div className="alert alert-info" style={{display: loading ? '' : 'none'}}>
      Loading...
    </div>
  )
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          {/* 
            значение имени username_for_photo - представим как логическое значение,
            т.е. пока мы не получим username_for_photo из бэкэнда, не сиожем пройти проверку
            т.к. объект Boolean(username_for_photo = "") принимает значение false,
            а значит <img /> мы отображать не будем
          */}
          {username_for_photo && username_for_photo !== "" && Boolean(username_for_photo) !== false ? (
            <img 
              src={`${API}/user/photo/${username_for_photo}`}
              className="img img-fluid img-thumbnail mb-3"
              style={{maxHeight: 'auto', maxWidth: '100%'}}
              alt="user profile"
            />
          ) : (
            ""
          )}
          
        </div>
        <div className="col-md-8 mb-5">
          {profileUpdateForm()}
        </div>
      </div>
    </div>
  )
}

export default ProfileUpdate