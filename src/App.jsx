import Main from "./components/main";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer"; 
import { useEffect, useState } from "react";


function App() {

  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(false);   
  const [showModal, setShowModal] = useState(false);
  
  function handleToggleModal() {
    setShowModal(!showModal);
  }

  async function fetchAPIData() {
    const NASA_KEY = process.env.REACT_APP_NASA_API_KEY;

    if (!NASA_KEY) {
      console.error('NASA API key not found in environment variables');
      return;
    }
    

    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log('DATA:', data);
    } catch (err) {
      console.error('Error fetching NASA APOD:', err.message);
    }
  }

  useEffect(() => {
    //fetchAPIData();
  }, []);

  return (
    <>
      {data ? (<BG/>) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && <Sidebar handleToggleModal={handleToggleModal} />}
      <Footer handleToggleModal={handleToggleModal} />
    </>
  );
}

export default App;