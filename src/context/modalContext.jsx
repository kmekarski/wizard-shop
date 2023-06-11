import React, { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {

    const [visible, setVisible] = React.useState(false)
    const [list, setList] = React.useState([])
    const [image, setImage] = React.useState(null)

    const [method, setMethod] = React.useState("")
    const callbackRef = React.useRef()

    const setCallback = (callback) => {
        callbackRef.current = callback
        setMethod(callback.name)
        setVisible(true)
      };

    function handleButtonClick() {
        if (callbackRef.current) {
            callbackRef.current()
          }
        else {console.log("callback wasnt set")}
          setVisible(false);
    }


    return (
        <ModalContext.Provider value={{
            visible: visible,
            setVisible: setVisible,
            list: list,
            setList: setList,
            image: image,
            setImage: setImage,
            method: method,
            setCallback: setCallback,
            handleButtonClick: handleButtonClick
        }}>
            {children}
        </ModalContext.Provider>
    );
};


export { ModalContext, ModalContextProvider };


