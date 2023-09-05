import React, { createContext, useState } from "react";
import { ProductsContext } from "./productsContext";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // tutaj tworzysz state, funkcje, co tam chcesz zeby było globalne
  const [name, setName] = React.useState("some name");
  const backendAddr = "https://localhost:7039";

  // musisz te rzeczy umieścić w objekcie value zeby były dostepne w innych komponentach
  return (
    <UserContext.Provider
      value={{
        name: name,
        setName: setName,
        backendAddr: backendAddr,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// w komponencie w którym chcesz mieć dostęp do contextu, musisz zaimportować UserContext:
// import { UserContext } from "../context/userContext"

// a następnie utworzyć taką zmienną
// const userContext = useContext(UserContext)

// do statu (np. name) odwołujesz się tak:
// let username = userContext.name
// lub
// userContext.setName("new name")

export { UserContext, UserContextProvider };
