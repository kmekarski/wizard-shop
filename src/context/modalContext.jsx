import React, { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {

    const [visible, setVisible] = React.useState(false)
    const [size, setSize] = React.useState("small")

    const [content, setContent] = React.useState("")
    const callbackRef = React.useRef()

    const setCallback = (callback) => {
        callbackRef.current = callback
        setContent(callback.name)
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
            size: size,
            setSize: setSize,
            content,
            setCallback: setCallback,
            handleButtonClick: handleButtonClick
        }}>
            {children}
        </ModalContext.Provider>
    );
};


export { ModalContext, ModalContextProvider };


