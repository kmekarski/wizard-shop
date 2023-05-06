import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const backendAddr = 'https://wishop.azurewebsites.net'

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password === repeatedPassword && password !== "") {
      const response = await fetch(backendAddr + '/api/Users/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
      <form className='login card--big' onSubmit={handleSubmit}>

        <h2 className='login__title text--primary'>Register</h2>

        <div className='login__group'>
          <label htmlFor='username' className='text--medium-small'>Username</label>
          <div className='login__input text--input-big'>
            <FontAwesomeIcon icon="fa-solid fa-user" className='icon--input' />
            <input className=' text--input-big' type="text"
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
          <label htmlFor='email' className='text--medium-small'>Email</label>
          <div className='login__input text--input-big'>
            <FontAwesomeIcon icon="fa-solid fa-user" className='icon--input' />
            <input className=' text--input-big' type="email"
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
          <label htmlFor='password' className='text--medium-small'>Password</label>
          <div className='login__input text--input-big'>
            <FontAwesomeIcon icon="fa-solid fa-lock" className='icon--input' />
            <input className=' text--input-big' type="text"
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
          <label htmlFor='repeatedPassword' className='text--medium-small'>Password</label>
          <div className='login__input text--input-big'>
            <FontAwesomeIcon icon="fa-solid fa-lock" className='icon--input' />
            <input className='text--input-big' type="password"
                   value={repeatedPassword}
                   name='repeatedPassword'
                   id='repeatedPassword'
                   placeholder='Enter your password again'
                   onChange={
                     (event) => setRepeatedPassword(event.target.value)
                   } />
          </div>
        </div>
        <button className='login__btn btn--medium btn--solid btn' type="submit">Register</button>
      </form>
    </div>
  );
}
