// import React from 'react'

// const Expense = () => {
//   return (
//     <div>Expense</div>
//   )
// }

// export default Expense






import DashboardLayout from '../../components/layouts/DashboardLayout';
import ExpenseForm from '../Expense/ExpenseForm';
import ExpenseList from '../Expense/ExpenseList';

const Expense = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Expense</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpenseForm />
        <ExpenseList />
      </div>
    </DashboardLayout>
  );
};

export default Expense;
