import React, { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {

    const [visible, setVisible] = React.useState(false)
    const [list, setList] = React.useState([])
    const [image, setImage] = React.useState(null)

    const [method, setMethod] = React.useState("")
    const callbackRef = React.useRef()

    const [dateFrom, setDateFrom] = React.useState(formatDateToInputValue(new Date()));
    const [dateTo, setDateTo] = React.useState(formatDateToInputValue(new Date()));

    function formatDateToInputValue(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

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

      console.log('Executing Callback:', dateFrom, dateTo);
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
            handleButtonClick: handleButtonClick,
            formatDateToInputValue: formatDateToInputValue,
            dateFrom: dateFrom,
            setDateFrom: setDateFrom,
            dateTo: dateTo,
            setDateTo: setDateTo
        }}>
            {children}
        </ModalContext.Provider>
    );
};


export { ModalContext, ModalContextProvider };


