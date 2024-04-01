import {useRef, createRef , React, useState} from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../components/contexts/ContextProvider';
import axiosClient from '../axios-client.js';

export default function Signup() {
  
  const nameRef =useRef();
  const emailRef =useRef();
  const passwordRef =useRef();
  const passwordConfirmationRef =useRef();
  const [errors,setErrors] = useState(null);
  const {setUser,setToken} =useStateContext();

  const onSubmit = (ev) => {
      ev.preventDefault()

      const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value
      }
      console.log(payload);
      axiosClient.post('/signup', payload)
        .then(({data}) => {
          console.log('Signup successful:',data); // success
          setUser(data.user)
          setToken(data.token)
       })
      .catch(err => {
        console.error('Signup error',err);  // error
        const response = err.response;
        if (response && response.status === 422){
          console.log(response.data.errors);
          setErrors(response.data.errors);
        }
      }) 
    }

  return (
    <div>
        <div className='login-signup-form animated fadeInDown'>
        <div className="form">
          <form onSubmit={onSubmit}>
            <h1 className="title">Sign-Up for Free</h1>
            {errors && <div className='alert'>
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
              
              </div>
              }
            <input ref={nameRef} placeholder="Full Name" />
            <input ref={emailRef} type="email" placeholder="Email address"/>
            <input ref={passwordRef} type="password" placeholder="Password" />
            <input ref={passwordConfirmationRef} type="password" placeholder="Password confirmation" />
            <button className='btn btn-block'>Sign Up</button>
            <p className='messsage'>
              Already Registered?
              <Link to="/login">Sign-In</Link>
            </p>
          </form>
        </div>
    </div>
    </div>
  )
}
