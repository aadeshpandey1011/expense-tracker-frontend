// utils/apiPaths.js
// export const BASE_URL = 'http://localhost:5000/api';

// export const API = {
//   REGISTER: `${BASE_URL}/auth/register`,
//   LOGIN: `${BASE_URL}/auth/login`,
// };






<<<<<<< HEAD
export const BASE_URL = 'https://expense-tracker-backend-v03k.onrender.com/api';
=======
// export const BASE_URL = 'http://localhost:5000/api';

// export const API = {
//   REGISTER: `${BASE_URL}/auth/register`,
//   LOGIN: `${BASE_URL}/auth/login`,
//   INCOME: `${BASE_URL}/income`,       // ✅ for POST, GET, DELETE
//   EXPENSE: `${BASE_URL}/expense`,     // ✅ for POST, GET, DELETE
// };

















const isDev = import.meta.env.MODE === 'development';

export const BASE_URL = isDev
  ? '/api' // Local: proxy handles this
  : 'https://expense-tracker-backend-v03k.onrender/api.com'; // 🔁 your live backend URL
>>>>>>> a70012a (Ensure _redirects included in dist for Render)

export const API = {
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  INCOME: `${BASE_URL}/income`,       // ✅ for POST, GET, DELETE
  EXPENSE: `${BASE_URL}/expense`,     // ✅ for POST, GET, DELETE
};

















// const isDev = import.meta.env.MODE === 'development';

// export const BASE_URL = isDev
//   ? '/api' // Local: proxy handles this
//   : 'https://expense-tracker-backend-v03k.onrender.com'; // 🔁 your live backend URL

// export const API = {
//   REGISTER: `${BASE_URL}/auth/register`,
//   LOGIN: `${BASE_URL}/auth/login`,
//   INCOME: `${BASE_URL}/income`,
//   EXPENSE: `${BASE_URL}/expense`,
// };
