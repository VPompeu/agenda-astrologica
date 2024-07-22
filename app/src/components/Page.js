import React, {useEffect } from 'react';
import MenuBar from './MenuBar';
import { useNavigate } from "react-router-dom";
import { Navigate, Outlet } from 'react-router-dom';
import SessionStore from '../stores/SessionStore';


const Page = () => {

  const navigate = useNavigate();
  const auth = SessionStore.getToken();

  useEffect(() => {
    if(!auth) {
      navigate("/login");
    } else {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div>
      <MenuBar />
      {auth ? <Outlet /> : <Navigate to="/login" />}
    </div>
  );
}

export default Page;
