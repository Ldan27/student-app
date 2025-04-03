import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Navbars from "./components/Navbars";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbars />
      <Outlet />
    </>
  );
}

export default App;
