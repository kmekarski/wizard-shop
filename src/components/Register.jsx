import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const backendAddr = 'https://wishop.azurewebsites.net'

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(backendAddr + '/api/Users/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log(data)
        if (data.status === "OK") {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', data.username);
            alert('Zalogowałeś się!');
            window.location.href = '/';
        } else {
            alert('Nieprawidłowe dane logowania!');
        }
    };

    return (
        <div className="login">
            <form className='login card--big' onSubmit={handleSubmit}>
                <h2 className='login__title text--primary'>Login</h2>
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
                    <label htmlFor='password' className='text--medium-small'>Password</label>
                    <div className='login__input text--input-big'>
                        <FontAwesomeIcon icon="fa-solid fa-lock" className='icon--input' />
                        <input className='text--input-big' type="password"
                            value={password}
                            name='password'
                            id='password'
                            placeholder='Enter your password'
                            onChange={
                                (event) => setPassword(event.target.value)
                            } />
                    </div>
                </div>
                <button className='login__btn btn--medium btn--solid btn' type="submit">Login</button>
            </form>
        </div>
    );
}
