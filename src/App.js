import BG from "./components/BG";
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
    
    const today=(new Date()).toDateString()
    const localKey=`NASA-${today}`
    if(localStorage.getItem(localKey)){
      const apiData=JSON.parse(localStorage.getItem(localKey))
      setData(apiData)
      console.log("Fetched from cache today")
      return;
    }
    localStorage.clear()
    try {
      const res = await fetch(url);
      const apiData = await res.json();
      localStorage.setItem(localKey,JSON.stringify(apiData))
      setData(apiData)
      console.log("Fetched from API today") 
    } catch (err) {
      console.error('Error fetching NASA APOD:', err.message);
    }
  }

  useEffect(() => {
    fetchAPIData();
  }, []);

  return (
    <>
      {data ? (<BG data={data} />) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      
      {showModal && (
        <Sidebar data={data} handleToggleModal={handleToggleModal} />
      )}
      
      {data && (
      <Footer data={data} handleToggleModal={handleToggleModal} />
      )}
    </>
  );
}

export default App;