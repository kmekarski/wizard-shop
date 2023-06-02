import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {


    // tutaj tworzysz state, funkcje, co tam chcesz zeby było globalne
    const [name, setName] = React.useState("some name")


    // musisz te rzeczy umieścić w objekcie value zeby były dostepne w innych komponentach
    return (
        <UserContext.Provider value={{
            name: name,
            setName: setName
        }}>
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


