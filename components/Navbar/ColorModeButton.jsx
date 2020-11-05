import React from "react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

const ColorModeButton = () => {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.theme === "dark") {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);

  const lightMode = () => {
    setDark(false);
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
  };

  const darkMode = () => {
    setDark(true);
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  };

  return (
    <>
      {dark ? (
        <button onClick={lightMode}>
          <IoSunnyOutline className="nav-icon" />
        </button>
      ) : (
        <button onClick={darkMode}>
          <IoMoonOutline className="nav-icon" />
        </button>
      )}
    </>
  );
};

export default ColorModeButton;
