import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ProductsContext } from "../context/productsContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const disabled = !email || !password;

  const productsContext = React.useContext(ProductsContext);

  const backendAddr = productsContext.apiAddress;

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(backendAddr + "/Users/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const jwtToken = await response.json();
    const data = jwtDecode(jwtToken);
    console.log(data);
    if (response.status === 200 || response.status === 201) {
      localStorage.setItem(
        "userID",
        data[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ]
      );
      localStorage.setItem("token", jwtToken);
      alert("Zalogowałeś się!");
      window.location.href = "/";
    } else if (response.status === 400) {
      alert("Nieprawidłowe dane logowania!");
    } else if (response.status === 404 || response.status === 409) {
      alert(
        "Nie znaleziono użytkownika! Złe hasło lub użytkownik nie istnieje."
      );
    }
  };

  return (
    <div className="login">
      <form className="login__form card--big" onSubmit={handleSubmit}>
        <h2 className="text--primary text--dark text--center">Login</h2>
        <div className="login__group">
          <label htmlFor="username" className="text--medium-regular text--dark">
            Email
          </label>
          <div className="login__input">
            <FontAwesomeIcon icon="fa-solid fa-user" className="icon--s" />
            <input
              className="text--medium-regular text--dark"
              type="text"
              value={email}
              name="username"
              id="username"
              placeholder="Enter your username"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <div className="login__group">
          <label htmlFor="password" className="text--medium-regular text--dark">
            Password
          </label>
          <div className="login__input">
            <FontAwesomeIcon icon="fa-solid fa-lock" className="icon--s" />
            <input
              className="text--medium-regular text--dark"
              type="password"
              value={password}
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <button
          className="login__btn btn--medium btn--solid btn"
          type="submit"
          disabled={disabled}
        >
          Login
        </button>
        <h4
          className="text--small-regular text--clickable text--center"
          onClick={() => navigate("/register")}
        >
          Do not have an account? Register!
        </h4>
      </form>
    </div>
  );
}

function Logout() {
  localStorage.removeItem("userID"); // docelowo token

  return <Navigate to="/login" />;
}

export { Login, Logout };
