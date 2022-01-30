import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import {createCategory} from './helper/adminapicall'

const AddCategory = () => {

    const [name , setName ] = useState("");
    const [error , setError] = useState(false);
    const [success , setSuccess] = useState(false);

    const {user , token } = isAutheticated();
 
    const goBack = () => (
        <div className='mt-5'>
            <Link className='btn btn-sm btn-success mb-3' to='/admin/dashboard'>Admin Dashboard</Link>
        </div>        
    )

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    }

    const onSubmit = (event) => {
       event.preventDefault();
       setError("");
       setSuccess(false);

       //backend request fired
       createCategory(user._id , token , {name})
         .then(data => {
             if(data.error){
               setError(true)
             }
             else{
                 setError("");
                 setSuccess(true);
                 setName("");
             }
         })

    }

    const myCategoryForm = () => (
           <form>
               <div className="form-group">
                   <p className="lead">Enter the Category</p>
                   <input className='form-control my-3' 
                          autoFocus required 
                          onChange={handleChange}
                          value={name}
                          placeholder='Enter Category'/>
                   <button onClick={onSubmit} className="btn btn-outline-info my-2">Submit</button>
               </div>
           </form>
    )

    const successMessage  = () => 
        {
           if(success){
             return <h4 className='text-success'>Category Created Successfully</h4>
           }
        }
    

    const warningMessage = () => {
        if(error)
        {
            return <h4 className='text-success'>Failed to create Category</h4>

        }
    }

    return (
       <Base title='Create Category' 
             description='Add a new Category over here'
             className='container bg-info p-4'>
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                   {myCategoryForm()}
                   {goBack()}
                </div>   
            </div>
       </Base>
    )
}

export default AddCategory;