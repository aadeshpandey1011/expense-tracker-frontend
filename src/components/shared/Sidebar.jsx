// src/components/shared/Sidebar.jsx
// import { FaChartPie, FaSignOutAlt } from 'react-icons/fa';
// import { MdAttachMoney, MdTrendingDown } from 'react-icons/md';
// import { Link, useLocation } from 'react-router-dom';

// const Sidebar = () => {
//   const { pathname } = useLocation();

//   const navItems = [
//     { label: 'Dashboard', icon: <FaChartPie />, path: '/dashboard' },
//     { label: 'Income', icon: <MdAttachMoney />, path: '/income' },
//     { label: 'Expense', icon: <MdTrendingDown />, path: '/expense' },
//   ];

//   return (
//     <div className="w-64 h-screen bg-white shadow-lg border-r flex flex-col justify-between py-8 px-6 fixed left-0 top-0 z-40">
//       <div>
//         <div className="flex flex-col items-center gap-2 mb-10">
//           <img
//             src="https://i.ibb.co/FmJxrdQ/avatar.png"
//             alt="avatar"
//             className="w-16 h-16 rounded-full border"
//           />
//           <h3 className="font-semibold text-lg">Mike William</h3>
//           <p className="text-sm text-gray-500">Expense Tracker</p>
//         </div>

//         <nav className="flex flex-col gap-4">
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-2 rounded-md ${
//                 pathname === item.path
//                   ? 'bg-violet-100 text-violet-700 font-medium'
//                   : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               {item.icon}
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       <button className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-100 rounded-md">
//         <FaSignOutAlt /> Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;






import { useEffect, useState } from 'react';
import { FaChartPie, FaSignOutAlt } from 'react-icons/fa';
import { MdAttachMoney, MdTrendingDown } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // null until we know

  useEffect(() => {
  const storedUser = localStorage.getItem('users');
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
    } catch (err) {
      console.error('User parsing failed', err);
    }
  } else {
    console.warn('No user found in localStorage');
  }
}, []);



  const navItems = [
    { label: 'Dashboard', icon: <FaChartPie />, path: '/dashboard' },
    { label: 'Income', icon: <MdAttachMoney />, path: '/income' },
    { label: 'Expense', icon: <MdTrendingDown />, path: '/expense' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-white shadow-lg border-r flex flex-col justify-between py-8 px-6 fixed left-0 top-0 z-40">
      <div>
        <div className="flex flex-col items-center gap-2 mb-10">
          <img
            src={`https://robohash.org/${user?.fullName || 'default'}.png`}
            alt="avatar"
            className="w-16 h-16 rounded-full border"
            />

          <h3 className="font-semibold text-lg text-center">
            {user ? user.fullName : '...'}
          </h3>
          <p className="text-sm text-gray-500 text-center">Expense Tracker</p>
        </div>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                pathname === item.path
                  ? 'bg-violet-100 text-violet-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-100 rounded-md"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
