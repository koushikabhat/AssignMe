import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={()=>{navigate('/admin')}}>Admin</button>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
