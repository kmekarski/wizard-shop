import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default function Profile(props) {
  const apiUrl = 'https://wishop.azurewebsites.net/api'

  const [profileInfo, setProfileInfo] = useState('{{\n' +
    '  "userId": 0,\n' +
    '  "username": "",\n' +
    '  "name": "",\n' +
    '  "surname": "",\n' +
    '  "email": "",\n' +
    '  "password": "",\n' +
    '  "passwordSalt": "",\n' +
    '  "status": "",\n' +
    '  "role": ""\n' +
    '}}')

  const getProfileInfo = async (e) => {
    const response = await fetch(apiUrl + "/Users/" + localStorage.getItem("userID"), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setProfileInfo(data)
    })
    .catch(error => {
      console.error(error);
    })
  };

  useEffect(() => {
    getProfileInfo()
      .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <div className="profile">
      {localStorage.getItem("userID") !== null && <div className="container2">
        <h2 className="text--primary">Hello {profileInfo.username}!</h2>
        {profileInfo.status === "Unactivated" && <h4 className="text--secondary">Your account is unactivated!</h4>}
        <h4 className="text--secondary">
          {profileInfo.name !== null && profileInfo.surname !== null && "Name: " + profileInfo.name + " " + profileInfo.surname}
        </h4>
        {
          //<h4 className="text--secondary">
          //profileInfo.name === null && profileInfo.surname === null && "You have not filled your personal data."}
          //</h4>
        }
        <h4 className="text--secondary">
          Email address: {profileInfo.email}
        </h4>
      </div>}
      {localStorage.getItem("userID") === null && <div className="container">
        <h2 className="text--primary">Not logged in!</h2>
      </div>}
    </div>
  );
}