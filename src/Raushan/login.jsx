import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './loginpage.css'
const Login = () => {
    const[registration,setRegistration]=useState({email:'',password:''})
    const[submit,setSubmit]=useState('');
    console.log(submit)
    const handleChange=(e)=>{
      const name=e.target.name;
      const value= e.target.value;

      setRegistration({...registration,[name]:value})
    }
    const handleSubmit=(e)=>{
       e.preventDefault();
       setSubmit(registration);
       setRegistration({email:'',password:''})
       
    }
    return (
        <div className='authPage'>
          

            <div className='authcont'>
                <img src='https://images.unsplash.com/photo-1495480137269-ff29bd0a695c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
                    alt='login' />

                <form className='authform' onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className='formgroup'>
                        <label htmlFor='email'>Email</label>
                        <input value={registration.email} type='email' id='email' name='email' onChange={handleChange}  />
                    </div>

                    <div className='formgroup'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' value={registration.password} id='password' name='password' onChange={handleChange} />
                    </div>

                  
                        
                    
                 
                      
                        <button className='btn'>Login</button>
                 
                   
                </form>
            </div>
        </div>
    )
}

export default Login