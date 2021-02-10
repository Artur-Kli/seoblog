import { useState, useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { getCookie } from '../../actions/auth'
import { create, getCategories, removeCategory } from '../../actions/category'

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false
  })

  const {name, error, success, categories, removed, reload} = values
  const token = getCookie('token')

  useEffect(() => {
    loadCategories()
  }, [reload])

  const loadCategories = () => {
    getCategories().then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        setValues({...values, categories: data})
      }
    })
  }

  const showCategories = () => {
    return categories.map((c, i) => {
      return (
        <button 
          onDoubleClick={() => deleteConfirm(c.slug)} 
          title="Double click to delete" 
          key={i} 
          className="btn btn-outline-primary ml-1 mr-1 mt-3"
        >
          {c.name}
        </button>
      )
    })
  }

  const deleteCategory = slug => {
    // console.log('delete', slug)
    removeCategory(slug, token).then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        setValues({...values, error: false, success: false, name: '', removed: !removed, reload: !reload}) 
      }
    })
  }

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Are you sure want to delete this category?')
    if(answer) {
      deleteCategory(slug)
    }
  }

  const clickSubmit = (e) => {
    e.preventDefault()
    // console.log('create category', name)
    create({name}, token).then(data => {
      if(data.error) {
        setValues({...values, error: data.error, success: false})
      } else {
        setValues({...values, error: false, success: !success, name: '', removed: '', reload: !reload})
      }
    })
  }

  const handleChange = (e) => {
    setValues({...values, name: e.target.value, error: false, success: false, removed: ''})
  }

  const showSuccess = () => {
    if(success) {
      return <p className="text-success">Category is created</p>
    }
  }

  const showError = () => {
    if(error) {
      return <p className="text-danger">Category already exist</p>
    }
  }
  
  const showRemoved = () => {
    if(removed) {
      return <p className="text-danger">Category is removed</p>
    }
  }

  const mouseMoveHandler = (e) => {
    setValues({...values, error: false, success: false, removed: '' })
  }

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Create a new category</label>
        <input type="text" className="form-control" onChange={handleChange} value={name} required />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">Create</button>
      </div>
    </form>
  )

  return (
    <>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newCategoryForm()}
        {showCategories()}
      </div>
    </>
  )
}

export default Category