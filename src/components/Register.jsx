import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useNavigate, Navigate} from "react-router-dom";



export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const navigate = useNavigate()


  const disabled = !username || !email || !password || !repeatedPassword

  const backendAddr = 'https://wishop.azurewebsites.net'

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password === repeatedPassword && password !== "") {
      const response = await fetch(backendAddr + '/api/Users/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({username, email, password})
      });
      const data = await response.json();
      console.log(data)

      if(response.status === 201) {
        alert('Successfully registered! Now you can log in.');
        window.location.href = '/login';
      } else {
        alert("Other error.")
      }

    } else {
      alert("Passwords do not match or password is empty!")
    }
  };

  return (
    <div className="login">
      <form className='login__form card--big' onSubmit={handleSubmit}>

        <h2 className='text--primary text--dark text--center'>Register</h2>

        <div className='login__group'>
          <label htmlFor='username' className='text--medium-regular text--dark'>Username</label>
          <div className='login__input'>
            <FontAwesomeIcon icon="fa-solid fa-user" className='icon--s' />
            <input className='text--medium-regular text--dark' type="text"
                   value={username}
                   name='username'
                   id='username'
                   placeholder='Enter your username'
                   onChange={
                     (event) => setUsername(event.target.value)
                   } />
          </div>
        </div>

        <div className='login__group'>
          <label htmlFor='email' className='text--medium-regular text--dark '>Email</label>
          <div className='login__input text--input-big'>
            <FontAwesomeIcon icon="fa-solid fa-user" className='icon--s' />
            <input className='text--medium-regular text--dark' type="email"
                   value={email}
                   name='email'
                   id='email'
                   placeholder='Enter your email'
                   onChange={
                     (event) => setEmail(event.target.value)
                   } />
          </div>
        </div>

        <div className='login__group'>
          <label htmlFor='password' className='text--medium-regular text--dark '>Password</label>
          <div className='login__input text--input-big'>
            <FontAwesomeIcon icon="fa-solid fa-lock" className='icon--s' />
            <input className='text--medium-regular text--dark' type="password"
                   value={password}
                   name='password'
                   id='password'
                   placeholder='Enter your password'
                   onChange={
                     (event) => setPassword(event.target.value)
                   } />
          </div>
        </div>

        <div className='login__group'>
          <label htmlFor='repeatedPassword' className='text--medium-regular text--dark '>Password</label>
          <div className='login__input text--input-big'>
            <FontAwesomeIcon icon="fa-solid fa-lock" className='icon--s' />
            <input className='text--medium-regular text--dark' type="password"
                   value={repeatedPassword}
                   name='repeatedPassword'
                   id='repeatedPassword'
                   placeholder='Enter your password again'
                   onChange={
                     (event) => setRepeatedPassword(event.target.value)
                   } />
          </div>
        </div>
        <button className='login__btn btn--medium btn--solid btn' type="submit" disabled={disabled}>Register</button>
        <h4 className='text--small-regular text--clickable text--center' onClick={() => navigate("/login")}>Already have an account?</h4>
      </form>
    </div>
  );
}
