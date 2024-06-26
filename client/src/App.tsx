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
import EquipmentBrowser from "./routes/Browsers/EquipmentBrowser/EquipmentBrowser";
import SessionProvider from './components/SessionProvider/SessionProvider';
import TrainerBrowser from './routes/Browsers/TrainerBrowser/TrainerBrowser';
import MemberBrowser from './routes/Browsers/MemberBrowser/MemberBrowser';
import RoomBrowser from './routes/Browsers/RoomBrowser/RoomBrowser';
import ClassBrowser from './routes/Browsers/ClassBrowser/ClassBrowser';
import EquipmentDetails from './routes/Details/EquipmentDetails/EquipmentDetails';
import MemberDetails from './routes/Details/MemberDetails/MemberDetails';
import TrainerDetails from './routes/Details/TrainerDetails/TrainerDetails';
import BookingBrowser from './routes/Browsers/BookingBrowser/BookingBrowser';
import BookingDetails from './routes/Details/BookingDetails/BookingDetails';
import BookingForm from './routes/BookingForm/BookingForm';

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
              <Route path="/equipment/:id" element={<EquipmentDetails />} />
              <Route path="/classes" element={<ClassBrowser />} />
              <Route path="/trainers" element={<TrainerBrowser />} />
              <Route path="/trainers/:email" element={<TrainerDetails />} />
              <Route path="/members" element={<MemberBrowser />} />
              <Route path="/members/:email" element={<MemberDetails />} />
              <Route path="/rooms" element={<RoomBrowser />} />
              <Route path="/bookings" element={<BookingBrowser />} />
              <Route path="/bookings/:id" element={<BookingDetails />} />
              <Route path="/new-booking" element={<BookingForm />} />
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
