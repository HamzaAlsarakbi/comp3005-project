import  {  useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import './components/Theme/Theme.css';
import Layout from './routes/Layout/Layout';
import Login from './routes/Login/Login';
import NoPage from './routes/NoPage/NoPage';

function App() {
  const [backendMessage, setBackendMessage] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', 'dark');
  }, []);
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<NoPage />} />
          </Route>
        <Route index element={<Login />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
