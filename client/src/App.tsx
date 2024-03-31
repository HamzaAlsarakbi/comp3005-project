import { useEffect, useState } from 'react';
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
import EquipmentBrowser from "./routes/EquipmentBrowser/EquipmentBrowser";
import SessionProvider from './components/SessionProvider/SessionProvider';
import TrainerBrowser from './routes/TrainerBrowser/TrainerBrowser';
import MemberBrowser from './routes/MemberBrowser/MemberBrowser';
import RoomBrowser from './routes/RoomBrowser/RoomBrowser';

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', 'dark');
  }, []);

  const sessionCallback = (valid: boolean, session: string | null) => {
    setLoggedIn(valid);
  }
  return (
    <SessionProvider sessionCallback={sessionCallback}>
      <BrowserRouter>
        <Routes>
          {loggedIn ?
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/equipment" element={<EquipmentBrowser />} />
              <Route path="/classes" element={<Dashboard />} />
              <Route path="/trainers" element={<TrainerBrowser />} />
              <Route path="/members" element={<MemberBrowser />} />
              <Route path="/rooms" element={<RoomBrowser />} />
              <Route path="*" element={<NoPage />} />
            </Route>
            :
            <Route index element={<Login />} />
          }
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
}

export default App;
