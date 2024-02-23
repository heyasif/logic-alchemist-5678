import React, { useEffect, useState } from 'react'


 import './loginpage.css'



const LoginPage = () => {
    const[username,setUsername]=useState('')
    const [password,setPassword]=useState('');

    
    const[data,setData]=useState([]);
    console.log(data);
    const handleLogin=(e)=>{
      e.preventDefault();
      useEffect(()=>{
        try{
          const res=  fetch('https://epicbazaar.onrender.com/users')
          const datas=  res.json();
          setData(datas)
        }
        catch(err){
          console.log(err);
        }
       
      },[])
    }
  
   
    
 
   
    return (
        <div className='authPage'>
          

            <div className='authcont'>
                <img src='https://images.unsplash.com/photo-1495480137269-ff29bd0a695c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
                    alt='login' />

                <form className='authform' onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className='formgroup'>
                        <label htmlFor='email'>Email</label>
                        <input value={registration.email} type='email' id='email' name='email' onChange={(e)=>setUsername(e.target.value)}  />
                    </div>

                    <div className='formgroup'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' value={registration.password} id='password' name='password' onChange={(e)=>{setPassword(e.target.value)}} />
                    </div>

                  
                        
                    
                 
                      
                        <button className='btn'>Login</button>
                 
                   
                </form>
            </div>
        </div>
    )
}

export default LoginPage