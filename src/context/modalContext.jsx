import React, { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {

    const [visible, setVisible] = React.useState(true)
    const [size, setSize] = React.useState("small")

    const callbackRef = React.useRef()

    const setCallback = (callback) => {
        callbackRef.current = callback
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
            setCallback: setCallback,
            handleButtonClick: handleButtonClick
        }}>
            {children}
        </ModalContext.Provider>
    );
};


export { ModalContext, ModalContextProvider };


