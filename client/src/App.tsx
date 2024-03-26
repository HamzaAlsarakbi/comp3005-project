import  {  useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import './components/Theme/Theme.css';
import Layout from './routes/Layout/Layout';
import Login from './routes/Login/Login';
import NoPage from './routes/NoPage/NoPage';
import Signup from './routes/Signup/Signup';
import api from './lib/api';
import Dashboard from './routes/Dashboard/Dashboard';
import axios from 'axios';

function App() {
  const [sessionData, setSessionData] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', 'dark');
    console.log('session check');
    axios.get(api.path('/sessions/check'), { withCredentials: true }).then((res) => {
        setLoggedIn(true);
        setSessionData(res.data.message);
    }).catch((err) => {
      setSessionData(null);
      setLoggedIn(false);
    });

  }, []);
  return (
    <BrowserRouter>
        <Routes>
        {loggedIn ? 
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard session={sessionData} />} />
            <Route path="*" element={<NoPage />} />
          </Route>
          : 
          <Route index element={<Login />} />
        }
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
