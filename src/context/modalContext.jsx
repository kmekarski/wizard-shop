import React, {createContext, createRef, useEffect, useState} from "react";

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

  const apiUrl = "https://localhost:7039/api";

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

    const downloadUrl = `${apiUrl}/Raports/Raport?start=${dateFrom}&end=${dateTo}`;

    //window.open(downloadUrl, '_blank');

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return (
      <div>
        Jeśli pobieranie nie rozpoczęło się automatycznie, <a href={downloadUrl} target="_blank" rel="noopener noreferrer">kliknij tutaj</a>.
      </div>
    );
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
