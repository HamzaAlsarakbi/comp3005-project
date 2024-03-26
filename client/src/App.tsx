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

function App() {
  const [sessionData, setSessionData] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', 'dark');
    
    const onload = (req: XMLHttpRequest) => {
      switch(req.status) {
        case 401:
          setLoggedIn(false);
          break;
        default:
          setLoggedIn(true);
          setSessionData(JSON.parse(req.responseText));
          break;
      }
    }
    console.log('session check');
    api.get({ path: 'sessions/check', onload: onload });

  }, []);
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<NoPage />} />
          </Route>
        {loggedIn ? 
          <Route index element={<Dashboard session={sessionData} />} />
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
