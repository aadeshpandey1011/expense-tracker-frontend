


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import AuthLayout from '../../components/layouts/AuthLayout';
// import { API } from '../../utils/apiPaths';

// const SignUp = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [error, setError] = useState('');

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       const res = await fetch(API.REGISTER, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           fullName: formData.fullName,
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.msg || 'Something went wrong');
//         return;
//       }

//       localStorage.setItem('token', data.token); // optional: store token
//       navigate('/dashboard'); // redirect on success

//     } catch (err) {
//       setError('Registration failed. Please try again later.');
//       console.error(err);
//     }
//   };

//   return (
//     <AuthLayout>
//       <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
//         <h3 className="text-4xl font-bold text-black mb-2">Create an Account</h3>
//         <p className="text-base text-slate-600 mb-6">
//           Please fill in the details to sign up
//         </p>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <input
//             name="fullName"
//             placeholder="Full Name"
//             required
//             onChange={handleChange}
//             className="input"
//           />
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             required
//             onChange={handleChange}
//             className="input"
//           />
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             required
//             onChange={handleChange}
//             className="input"
//           />
//           <input
//             name="confirmPassword"
//             type="password"
//             placeholder="Confirm Password"
//             required
//             onChange={handleChange}
//             className="input"
//           />

//           <button
//             type="submit"
//             className="bg-violet-600 text-white py-2 rounded-lg mt-2 hover:bg-violet-700 transition"
//           >
//             Sign Up
//           </button>

//           <p className="text-xs mt-4 text-slate-600 text-center">
//             Already have an account?{' '}
//             <Link to="/login" className="text-violet-600 font-medium hover:underline">
//               Log in here
//             </Link>
//           </p>
//         </form>
//       </div>
//     </AuthLayout>
//   );
// };

// export default SignUp;

























import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import { API } from '../../utils/apiPaths';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(API.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || 'Something went wrong');
        return;
      }

      // ✅ Store token in localStorage
      localStorage.setItem('token', data.token);

      // ✅ Decode the token to extract user info
      const decoded = JSON.parse(atob(data.token.split('.')[1]));
      localStorage.setItem('users', JSON.stringify(decoded.user));
      console.log("Decoded Token:", decoded);
      console.log(localStorage.getItem('users'));  // Should NOT be null

      // ✅ Redirect to dashboard
      navigate('/dashboard');

    } catch (err) {
      setError('Registration failed. Please try again later.');
      console.error(err);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-4xl font-bold text-black mb-2">Create an Account</h3>
        <p className="text-base text-slate-600 mb-6">
          Please fill in the details to sign up
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            name="fullName"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="input"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="input"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="input"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
            className="input"
          />

          <button
            type="submit"
            className="bg-violet-600 text-white py-2 rounded-lg mt-2 hover:bg-violet-700 transition"
          >
            Sign Up
          </button>

          <p className="text-xs mt-4 text-slate-600 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-600 font-medium hover:underline">
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;

