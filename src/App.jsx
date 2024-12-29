import Main from "./components/main";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const[showModal, setShowModal]=useState(false)
  return (
    <>
      <Main/>
      {showModal &&  (
        <Sidebar/>
        )}
      <Footer/>
    </>
  );
}

export default App;
