import React, { createContext, useContext, useState } from "react";

const ImageModalContext = createContext();

export const imageModalState = () => {
  return useContext(ImageModalContext);
};

export const ImageModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");

  const value = {
    open,
    setOpen,
    img,
    setImg,
  };

  return (
    <ImageModalContext.Provider value={value}>
      {children}
    </ImageModalContext.Provider>
  );
};
