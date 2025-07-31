// import React from 'react';

// const IncomeList = ({ incomes, onDelete }) => {
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Income List</h2>
//       <ul className="space-y-4">
//         {incomes.map(income => (
//           <li key={income._id} className="bg-white p-4 rounded shadow flex justify-between">
//             <div>
//               <h4 className="font-semibold">{income.source}</h4>
//               <p className="text-sm text-gray-500">
//                 {new Date(income.date).toLocaleDateString()}
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               <span className="text-green-600 font-bold">₹{income.amount}</span>
//               <button
//                 onClick={() => onDelete(income._id)}
//                 className="text-red-500 hover:underline text-sm"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//         {incomes.length === 0 && (
//           <li className="text-center text-gray-500 text-sm">No income records found.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default IncomeList;










// src/pages/Income/IncomeList.jsx
import React, { useEffect, useState } from 'react';
import { API } from '../../utils/apiPaths';
import { toast } from 'react-toastify';

const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);
  const token = localStorage.getItem('token');

  const fetchIncomes = async () => {
    try {
      const res = await fetch(API.INCOME, {
        headers: {
          'x-auth-token': token
        }
      });
      const data = await res.json();
      setIncomes(data);
    } catch (err) {
      console.error('Failed to fetch incomes', err);
    }
  };

//   const handleDelete = async (id) => {
//     try {
//       await fetch(`${API.INCOME}/${id}`, {
//         method: 'DELETE',
//         headers: { 'x-auth-token': token }
//       });
//       setIncomes(prev => prev.filter(i => i._id !== id));
//     } catch (err) {
//       console.error('Failed to delete income', err);
//     }
//   };

    

const handleDelete = async (id) => {
    try {
        const res = await fetch(`${API.INCOME}/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
        });

        const data = await res.json();

        if (res.ok) {
        setIncomes(prev => prev.filter(i => i._id !== id));
        toast.success('Income deleted successfully!');
        } else {
        toast.error(data.msg || 'Failed to delete income');
        }
    } catch (err) {
        console.error('Failed to delete income', err);
        toast.error('Error deleting income');
    }
    };


  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Income List</h2>
      <ul className="space-y-4">
        {incomes.map(income => (
          <li key={income._id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <h4 className="font-semibold">{income.source}</h4>
              <p className="text-sm text-gray-500">{new Date(income.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-600 font-bold">₹{income.amount}</span>
              <button
                onClick={() => handleDelete(income._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {incomes.length === 0 && (
          <li className="text-center text-gray-500 text-sm">No income records found.</li>
        )}
      </ul>
    </div>
  );
};

export default IncomeList;
