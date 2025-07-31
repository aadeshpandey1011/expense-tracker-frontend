// src/components/shared/Navbar.jsx
// const Navbar = () => {
//   return (
//     <div className="w-full h-16 bg-white/30 backdrop-blur-md shadow-sm flex items-center justify-end px-6 sticky top-0 z-30">
//       <span className="text-sm text-gray-600">Welcome back 👋</span>
//     </div>
//   );
// };

// export default Navbar;








import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('users');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="w-full h-16 bg-white/30 backdrop-blur-md shadow-sm flex items-center justify-end px-6 sticky top-0 z-30">
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700 font-medium">
            Welcome back, {user.fullName} 👋
          </span>
          <img
            src={`https://robohash.org/${user.email}`}
            alt="avatar"
            className="w-8 h-8 rounded-full border"
          />
        </div>
      ) : (
        <span className="text-sm text-gray-600">Welcome back 👋</span>
      )}
    </div>
  );
};

export default Navbar;
 