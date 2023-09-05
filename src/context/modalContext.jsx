import React, { createContext, createRef, useState } from "react";

const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [visible, setVisible] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [image, setImage] = React.useState(null);

  const [method, setMethod] = React.useState("");
  const callbackRef = React.useRef();

  const todaysDate = formatDateToInputValue(new Date());

  const [dateFrom, setDateFrom] = React.useState(todaysDate);
  const [dateTo, setDateTo] = React.useState(todaysDate);

  function formatDateToInputValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const setCallback = (callback) => {
    callbackRef.current = callback;
    setMethod(callback.name);
    setVisible(true);
  };

  function handleButtonClick() {
    if (callbackRef.current) {
      callbackRef.current();
    } else {
      console.log("callback wasnt set");
    }
    setVisible(false);

    if (method === "createReport") {
      createReport();
    } else {
      console.log(`Executing Callback: ${method}`);
    }
  }

  function createReport() {
    console.log("Executing Callback:", dateFrom, dateTo);
    //fetch
  }

  return (
    <ModalContext.Provider
      value={{
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
        setDateTo: setDateTo,
        createReport: createReport,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
