import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useNavigate, Navigate} from "react-router-dom";
import jwtDecode from 'jwt-decode';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const backendAddr = 'https://wishop.azurewebsites.net'

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(backendAddr + '/api/Users/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const jwtToken = await response.json()
        const data = jwtDecode(jwtToken)
        console.log(data)
        if(response.status === 200 || response.status === 201) {
            localStorage.setItem('userID', data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"])
            alert('Zalogowałeś się!')
            window.location.href = '/'
        } else if(response.status === 400)  {
            alert('Nieprawidłowe dane logowania!')
        } else if(response.status === 404 || response.status === 409)  {
            alert('Nie znaleziono użytkownika! Złe hasło lub użytkownik nie istnieje.')
        }
    }

    return (
        <div className="login">
            <form className='login card--big' onSubmit={handleSubmit}>
                <h2 className='login__title text--primary'>Login</h2>
                <div className='login__group'>
                    <label htmlFor='username' className='text--medium-small'>Email</label>
                    <div className='login__input text--input-big'>
                        <FontAwesomeIcon icon="fa-solid fa-user" className='icon--input' />
                        <input className=' text--input-big' type="text"
                            value={email}
                            name='username'
                            id='username'
                            placeholder='Enter your username'
                            onChange={
                                (event) => setEmail(event.target.value)
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
                <h4 className='btn' onClick={() => navigate("/register")}>Do not have an account? Register!</h4>
            </form>
        </div>
    );
}



function Logout() {
    localStorage.removeItem('userID'); // docelowo token

    return <Navigate to="/login" />
}

export { Login, Logout }