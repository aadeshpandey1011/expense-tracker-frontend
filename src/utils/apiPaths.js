// utils/apiPaths.js
// export const BASE_URL = 'http://localhost:5000/api';

// export const API = {
//   REGISTER: `${BASE_URL}/auth/register`,
//   LOGIN: `${BASE_URL}/auth/login`,
// };






export const BASE_URL = 'http://localhost:5000/api';

export const API = {
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  INCOME: `${BASE_URL}/income`,       // ✅ for POST, GET, DELETE
  EXPENSE: `${BASE_URL}/expense`,     // ✅ for POST, GET, DELETE
};
