// import React from 'react';
// import AuthLayout from '../../components/layouts/AuthLayout';

// const Login = () => {
//   return (
//     <AuthLayout>
//       <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
//         <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
//         <p className="text-xs text-slate-700 mt-[5px] mb-6">
//           Please enter your details to log in
//         </p>
//       </div>
//     </AuthLayout>
//   );
// };

// export default Login;















// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import AuthLayout from '../../components/layouts/AuthLayout';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     console.log('Login form submitted:', formData);
//     // TODO: Connect to backend login API
//   };

//   return (
//     <AuthLayout>
//       <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
//         <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500">
//           Welcome Back
//         </h3>

//         <p className="text-xs text-slate-700 mt-[5px] mb-6">
//           Please enter your details to log in
//         </p>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div>
//             <label className="text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
//               placeholder="••••••••"
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-violet-600 text-white py-2 rounded-lg mt-2 hover:bg-violet-700 transition"
//           >
//             Log In
//           </button>

//           <p className="text-xs mt-4 text-slate-600 text-center">
//             Don't have an account?{' '}
//             <Link to="/signUp" className="text-violet-600 font-medium hover:underline">
//               Sign up here
//             </Link>
//           </p>
//         </form>
//       </div>
//     </AuthLayout>
//   );
// };

// export default Login;













import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import { API } from '../../utils/apiPaths';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async e => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch(API.LOGIN, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       setError(data.msg || 'Login failed');
  //       return;
  //     }

  //     localStorage.setItem('token', data.token);
  //     navigate('/dashboard');
  //   } catch (err) {
  //     setError('Something went wrong. Please try again later.');
  //     console.error(err);
  //   }
  // };

  const handleSubmit = async e => {
  e.preventDefault();

  try {
    const res = await fetch(API.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.msg || 'Login failed');
      return;
    }

    localStorage.setItem('token', data.token);

    // Decode token and save user
    const decoded = JSON.parse(atob(data.token.split('.')[1]));
    localStorage.setItem('users', JSON.stringify(decoded.user)); // { _id, fullName, email }
    console.log("Decoded Token:", decoded);
    console.log(localStorage.getItem('users'));  // Should NOT be null


    navigate('/dashboard');
  } catch (err) {
    setError('Something went wrong. Please try again later.');
    console.error(err);
  }
};


  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-4xl font-bold text-black mb-2">Welcome Back</h3>
        <p className="text-base text-slate-600 mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
          />

          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input"
          />

          <button
            type="submit"
            className="bg-violet-600 text-white py-2 rounded-lg mt-2 hover:bg-violet-700 transition"
          >
            Log In
          </button>

          <p className="text-xs mt-4 text-slate-600 text-center">
            Don't have an account?{' '}
            <Link to="/signUp" className="text-violet-600 font-medium hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
