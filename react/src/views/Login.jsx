import React from 'react';
import { useState , useRef, createRef} from 'react';
import {Link} from 'react-router-dom';
import { useStateContext } from '../components/contexts/ContextProvider';
import axiosClient from '../axios-client.js';

export default function Login() {
  
  const emailRef =useRef();
  const passwordRef =useRef();
  const [message,setMessage] = useState(null);
  const {setUser,setToken} =useStateContext();

  const  onSubmit = (ev) => {
      ev.preventDefault();


      const payload = {
        
        email: emailRef.current.value,
        password: passwordRef.current.value,
        
      }
      axiosClient.post('/login', payload)
        .then(({data}) => {
          console.log('Login successful:',data); // success
          setUser(data.user)
          setToken(data.token)
       })
      .catch(err => {
        console.error('Login error',err);  // error
        const response = err.response;
        if (response && response.status === 422){
          console.log(response.data.errors);
          setMessage(response.data.message);
        }
      }) 
  }
  
  return (
    <div className='login-signup-form animated fadeInDown'>
        <div className="form">
          <form onSubmit={onSubmit}>
            <h1 className="title">Log-In to your Account</h1>
            {message && 
            <div className='alert'>
              <p>{message}</p>            
            </div>
            }                     
            <input ref={emailRef}type="email" placeholder="Email"/>
            <input ref={passwordRef}type="password" placeholder="password" />
            <button className='btn btn-block'>Login</button>
            <p>
              Not Registered? 
              <Link to="/signup">Create an Account</Link>
            </p>
          </form>
        </div>
    </div>
  )
}
