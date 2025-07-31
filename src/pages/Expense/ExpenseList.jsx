import React, { useEffect, useState } from 'react';
import { API } from '../../utils/apiPaths';

import { toast } from 'react-toastify';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('token');

  const fetchExpenses = async () => {
    try {
      const res = await fetch(API.EXPENSE, {
        headers: {
          'x-auth-token': token,
        },
      });
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error('Failed to fetch expenses', err);
    }
  };

//   const handleDelete = async (id) => {
//     try {
//       await fetch(`${API.EXPENSE}/${id}`, {
//         method: 'DELETE',
//         headers: { 'x-auth-token': token },
//       });
//       setExpenses((prev) => prev.filter((item) => item._id !== id));
//     } catch (err) {
//       console.error('Failed to delete expense', err);
//     }
//   };
    
    

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${API.EXPENSE}/${id}`, {
            method: 'DELETE',
            headers: { 'x-auth-token': token }
            });

            const data = await res.json();

            if (res.ok) {
            setExpenses(prev => prev.filter(e => e._id !== id));
            toast.success('Expense deleted successfully!');
            } else {
            toast.error(data.msg || 'Failed to delete expense');
            }
        } catch (err) {
            console.error('Failed to delete expense', err);
            toast.error('Error deleting expense');
        }
        };


  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Expense List</h2>
      <ul className="space-y-4">
        {expenses.map((expense) => (
          <li key={expense._id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <h4 className="font-semibold">{expense.category}</h4>
              <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-red-600 font-bold">₹{expense.amount}</span>
              <button
                onClick={() => handleDelete(expense._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {expenses.length === 0 && (
          <li className="text-center text-gray-500 text-sm">No expense records found.</li>
        )}
      </ul>
    </div>
  );
};

export default ExpenseList;

