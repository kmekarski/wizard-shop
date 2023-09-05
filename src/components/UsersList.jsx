import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartPopup from "./CartPopup.jsx";
import ProductImage from "./ProductImage.jsx";
import Header from "./Header.jsx";
import { ProductsContext } from "../context/productsContext";
import { ModalContext } from "../context/modalContext.jsx";
import UploadImage from "./UploadImage.jsx";
import { useParams } from "react-router-dom";

export default function UsersList(props) {
  const navigate = useNavigate();
  const productsContext = React.useContext(ProductsContext);
  const modalContext = React.useContext(ModalContext);

  const header = ["Username", "Name", "Email", "Role", "Action"];

  const backendAddr = productsContext.apiAddress;

  /*function blockUser(user) {
        //odpowiedni fetch dla banowania uzytkownika tutaj
        user.status = 'Unactivated'
        fetch(backendAddr + "/Users/" + user.userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(user)
        })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response;
          })
          .catch((error) => {
              console.error("Error deleting review:", error);
          })
    }

    function unblockUser(user) { // NIE MA ENDPOINTA DO BANOWANIA/ODBANOWANIA - edycja user
        //odpowiedni fetch dla odbanowania uzytkownika tutaj
        user.status = 'Activated'
        fetch(backendAddr + "/Users/" + user.userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(user)
        })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response;
          })
          .catch((error) => {
              console.error("Error deleting review:", error);
          })
    }*/

  async function updateUser(user) {
    try {
      const response = await fetch(backendAddr + "/Users/" + user.userId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await response.text(); // Możemy też odczytać odpowiedź, jeśli zawiera dodatkowe dane

      // Po udanym żądaniu do serwera, odświeżamy listę użytkowników
      getUsers().then(() => {
        filterUsers();
      });
    } catch (error) {
      console.error("Error handling user request:", error);
    }
  }

  async function blockUser(user) {
    //odpowiedni fetch dla banowania użytkownika tutaj
    user.status = "Unactivated";
    await updateUser(user);
  }

  async function unblockUser(user) {
    //odpowiedni fetch dla odbanowania użytkownika tutaj
    user.status = "Activated";
    await updateUser(user);
  }

  function handleActionClick(e, user) {
    e.preventDefault();
    switch (e.target.innerHTML) {
      case "Block": {
        modalContext.setCallback(() => blockUser(user));
        break;
      }
      case "Unblock": {
        modalContext.setCallback(() => unblockUser(user));
        break;
      }
    }
  }
  /*
    const activeUsers = [
        {
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            email: "klaudiuszmekarski@gmail.com",
            role: "user"
        },
        {
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            email: "klaudiuszmekarski@gmail.com",
            role: "user"
        },
        {
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            email: "klaudiuszmekarski@gmail.com",
            role: "user"
        },
        {
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            email: "klaudiuszmekarski@gmail.com",
            role: "user"
        }
    ]*/

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch(backendAddr + "/Users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error getting reviews:", error);
      });
  };

  const [activeUsers, setActiveUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);

  const filterUsers = () => {
    const activeUsers = users.filter((user) => user.status === "Activated");
    setActiveUsers(activeUsers);
    const blockedUsers = users.filter((user) => user.status === "Unactivated");
    setBlockedUsers(blockedUsers);
  };

  React.useEffect(() => {
    getUsers().catch((error) => {
      console.error(error);
    });
  }, []);

  React.useEffect(() => {
    filterUsers();
    console.log(activeUsers);
    console.log(blockedUsers);
  }, [users]);

  /*
    const blockedUsers = [
        {
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            email: "klaudiuszmekarski@gmail.com",
            role: "user",
            status: "active"
        },
        {
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            email: "klaudiuszmekarski@gmail.com",
            role: "user"
        },
        {
            username: "klaumek406",
            name: "Klaudiusz Mękarski",
            email: "klaudiuszmekarski@gmail.com",
            role: "user"
        }
    ]*/

  const usersHtml = (props.type === "active" ? activeUsers : blockedUsers).map(
    (el, index) => {
      return (
        <div
          className={`users-list__row ${
            index % 2 === 1 ? "users-list__row--gray" : ""
          }`}
        >
          <p className="text--small-regular text--dark">{el.username}</p>
          <p className="text--small-reguler text--dark">{el.name}</p>
          <p className="text--small-regular text--dark">{el.email}</p>
          <p className="text--small-regular text--dark">{el.role}</p>
          <div
            className="btn--solid btn--small btn"
            onClick={(e) => handleActionClick(e, el)}
          >
            {props.type === "active" ? "Block" : "Unblock"}
          </div>
        </div>
      );
    }
  );

  const headerHtml = (
    <div className="users-list__header">
      {header.map((el) => {
        return <p className="text--medium-bold text--dark">{el}</p>;
      })}
    </div>
  );

  return (
    <div className="users-list">
      <div className="container">
        <Header
          title="Admin panel"
          subtitle={props.type === "active" ? "Active users" : "Blocked users"}
          searchbar={false}
          buttons={false}
        ></Header>
        <div className="users-list__main">
          <div className="users-list__card card--big">
            {headerHtml}
            <div className="users-list__card__rows">{usersHtml}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
