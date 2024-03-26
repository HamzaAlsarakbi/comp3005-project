import React, { useEffect, useState } from 'react';
import Navbar from './../../components/Navbar/Navbar'
import { Outlet } from "react-router-dom";
import Toast, { ToastTypes } from '../../components/Toast/Toast';

interface LayoutProps {
}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz@6..12&family=Roboto&display=swap" rel="stylesheet"></link>
      <Navbar />
      {/* <Toast id="backend-error" type={ToastTypes.ERROR} visible={backendToastVisible} setVisible={setBackendToastVisible}>[Internal Error] Cannot fetch from the backend API.</Toast> */}
      <script src="http://localhost:8097"></script>
      <Outlet />
    </>
  );
};

export default Layout;