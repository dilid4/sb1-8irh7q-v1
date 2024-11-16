import React from 'react';
import { Outlet } from 'react-router-dom';
import ManagerSidebar from '../../components/manager/ManagerSidebar';
import ManagerHeader from '../../components/manager/ManagerHeader';

const ManagerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <ManagerHeader />
      <div className="flex">
        <ManagerSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagerLayout;