import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

const loadGoogleFont = () => {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
};

function App() {
  useEffect;
  () => {
    loadGoogleFont;
  };
  return <Navbar />;
}

export default App;
