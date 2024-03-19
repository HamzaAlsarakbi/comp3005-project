import React, { useEffect, useState } from 'react';
import Navbar from './../../components/Navbar/Navbar'
import { Outlet } from "react-router-dom";
import Toast, { ToastTypes } from '../../components/Toast/Toast';

interface LayoutProps {
}

const Layout: React.FC<LayoutProps> = () => {
  const [backendMessage, setBackendMessage] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [backendToastVisible, setBackendToastVisible] = useState(true);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetch('http://127.0.0.1:3001/')
      .then((response) => response.json())
      .then((data) => {
        setBackendMessage(data.message);
        setLoggedIn(data.loggedIn);
      })
      .catch((error) => {
        setBackendToastVisible(true);
        console.error('[Internal Error] Cannot fetch from the backend API', error);
      });
    }, []);
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz@6..12&family=Roboto&display=swap" rel="stylesheet"></link>
      <Navbar loggedIn={loggedIn}></Navbar>
      <Toast id="backend-error" type={ToastTypes.ERROR} visible={backendToastVisible} setVisible={setBackendToastVisible}>[Internal Error] Cannot fetch from the backend API.</Toast>
      <script src="http://localhost:8097"></script>
      <Outlet />
    </>
  );
};

export default Layout;