import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
// import './App.css'
import Home from './components/Home/Home';


  function App() {
    const [message, setMessage] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);  // Track sidebar visibility
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);  // Toggle the sidebar visibility
    };

  useEffect(() => {
    axios.get('/api/message')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="app">
      <Navbar toggleSidebar={toggleSidebar} /> {/* Pass the toggle function */}
      {sidebarOpen && <Sidebar />} {/* Conditionally render the Sidebar */}

      {/* Main content area */}
      <div className={sidebarOpen ? 'main-content with-sidebar' : 'main-content'}>
        <Home/>
      </div>
    </div>
  );
}

export default App;

