// import React from 'react'

// const Income = () => {
//   return (
//     <div>Income</div>
//   )
// }

// export default Income





import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeForm from '../Income/IncomeForm';
import IncomeList from '../Income/IncomeList';

const Income = () => {
  const [incomes, setIncomes] = useState([]);

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Fetch incomes from backend on mount
  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const res = await fetch('/api/income', {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setIncomes(data);
        } else {
          console.error(data.msg || 'Failed to fetch incomes');
        }
      } catch (error) {
        console.error('Error fetching incomes:', error);
      }
    };

    fetchIncomes();
  }, [token]);

  // Callback after adding new income
  const handleAdd = (newIncome) => {
    setIncomes([newIncome, ...incomes]);
  };

  // Callback after deleting income
  const handleDelete = (id) => {
    setIncomes((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Income</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IncomeForm onAdd={handleAdd} />
        <IncomeList incomes={incomes} onDelete={handleDelete} />
      </div>
    </DashboardLayout>
  );
};

export default Income;

