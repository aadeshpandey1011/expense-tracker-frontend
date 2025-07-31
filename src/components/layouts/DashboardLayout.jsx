// src/components/layouts/DashboardLayout.jsx
import Sidebar from '../shared/Sidebar';
import Navbar from '../shared/Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
