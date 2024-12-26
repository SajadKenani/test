import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Show from './showworkers';
import Add from './addworker';
import logo from "./logo.png";
import { Octokit } from '@octokit/core';

function App() {

  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername === process.env.REACT_APP_USERNAME && storedPassword === process.env.REACT_APP_PASSWORD) {
      setLogin(true);
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === process.env.REACT_APP_USERNAME && password === process.env.REACT_APP_PASSWORD) {
      // Set login state to true
      setLogin(true);
      
      // Store username and password in localStorage for future automatic login
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    } else {
      // Handle invalid login
      alert("Invalid credentials");
    }
  };


 
  async function sendDataToRepository(data) {
    try {
      const octokit = new Octokit({
        auth: process.env.REACT_APP_GITHUB_AUTH_TOKEN 
      });

      // Convert the data string to a Uint8Array using TextEncoder
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(data);
        const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'SajadKenani',
        repo: 'database',
        path: 'data.js' // Specify the path to your file
      });

      // Update the file content with the new data
      const sendingFile = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'SajadKenani',
        repo: 'database',
        path: 'data.js', // Specify the path to your file
        message: 'my commit message',
        committer: {
          name: 'Monalisa Octocat',
          email: 'octocat@github.com'
        },
        content: btoa(String.fromCharCode.apply(null, uint8Array)),
        sha: response.data.sha,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },

      });
      
      console.log('Data sent to repository successfully:', sendingFile.data);
    } catch (error) {
      console.error('Error sending data to repository:', error);
    }
  }

  const deleteData = async () => {

    await sendDataToRepository("[]"); // Wait for this function to complete
    window.location.reload();
  };

  const handleLanguage = () => {
    if (localStorage.getItem("value") === "English"){
      localStorage.setItem("value", "Arabic")
    }else {localStorage.setItem("value", "English")}

    window.location.reload()
  }

  return (
    <Router>
      {login ?
            <div className='flex' style={{ width: "100%"}}>


            <div className='hidden lg:flex' style={{height: "20050px", backgroundColor: "#023A48", display: "inline-block", position: "fixed"}}>
              <div className='hidden lg:flex' style={{justifyContent: "center", padding: "50px"}}><img style={{width: "120px"}} src={logo} /></div>
    
              <div className='hidden lg:grid ' style={{padding: "20px"}}>
                <div style={{ marginTop: "30px", fontFamily: "Tajawal"}}> <Link to="/" style={{fontWeight: "700", color: "white"}}> {localStorage.getItem("value") === "English" ? "Show workers" : "عرض العاملات"} </Link> </div>
                <div style={{ marginTop: "30px", fontFamily: "Tajawal"}}> <Link to="/add" style={{fontWeight: "700", color: "white"}}> {localStorage.getItem("value") === "English" ? "Add a worker" : "اضافة عاملة"} </Link> </div> 
                <div style={{ marginTop: "30px", color: "white", fontFamily: "Tajawal", cursor: "pointer"}} onClick={handleLanguage}> {localStorage.getItem("value") === "English" ?" عربي؟" : "English?"}  </div>
                <div style={{ marginTop: "30px", color: "white", fontFamily: "Tajawal", cursor: "pointer"}} onClick={() => {localStorage.clear(); window.location.reload()}}> {localStorage.getItem("value") === "English" ?" Logout" : "تسجيل خروج"}  </div>
              </div>


    
            </div>

    
            <div className='hidden lg:grid' style={{width: "17%"}}></div>
    
    
            {/* Wrap your Route components inside a Routes element */}
            <Routes>
              <Route path="/" element={<Show />} />
              <Route path="/add" element={<Add />} />
            </Routes>

            
            <div className="lg:hidden grid fixed bottom-0 right-0 w-full" style={{right: "0"}}>
  <div className="flex justify-end mb-4" > 
    <Link
      to="/"
      className="px-4 py-2 bg-blue-500 text-white font-bold rounded-full"
    >
      {localStorage.getItem("value") === "English" ? "Show workers" : "عرض العاملات"}
    </Link>
  </div>
  <div className="flex justify-end mb-4">
    <Link
      to="/add"
      className="px-4 py-2 bg-blue-500 text-white font-bold rounded-full"
    >
      {localStorage.getItem("value") === "English" ? "Add a worker" : "اضافة عاملة"}
    </Link>
  </div>
  <div className="flex justify-end mb-4">
    <div
      className="px-4 py-2 bg-blue-500 text-white font-bold rounded-full cursor-pointer"
      onClick={handleLanguage}
    >
      {localStorage.getItem("value") === "English" ? "عربي؟" : "English?"}
    </div>
  </div>
  <div className="flex justify-end">
    <div
      className="px-4 py-2 bg-blue-500 text-white font-bold rounded-full cursor-pointer"
      onClick={() => {
        localStorage.clear();
        window.location.reload();
      }}
    >
      {localStorage.getItem("value") === "English" ? "Logout" : "تسجيل خروج"}
    </div>
  </div>
</div>

          </div>
      :

      <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
      
      }

    </Router>
  );
}


export default App;
