// // src/pages/Dashboard/Home.jsx
// import DashboardLayout from '../../components/layouts/DashboardLayout';

// const Home = () => {
//   return (
//     <DashboardLayout>
//       <h2 className="text-2xl font-bold text-gray-700 mb-4">Dashboard Overview</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="p-4 bg-white shadow rounded-lg">
//           <h4 className="text-sm text-gray-500">Total Balance</h4>
//           <p className="text-2xl font-bold text-gray-800">₹91,100</p>
//         </div>
//         <div className="p-4 bg-white shadow rounded-lg">
//           <h4 className="text-sm text-gray-500">Total Income</h4>
//           <p className="text-2xl font-bold text-green-600">₹98,200</p>
//         </div>
//         <div className="p-4 bg-white shadow rounded-lg">
//           <h4 className="text-sm text-gray-500">Total Expenses</h4>
//           <p className="text-2xl font-bold text-red-500">₹7,100</p>
//         </div>
//       </div>

//       <div className="h-64 bg-white rounded-lg shadow flex items-center justify-center text-gray-400">
//         📊 Chart Placeholder (coming soon)
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Home;

















// import DashboardLayout from '../../components/layouts/DashboardLayout';
// import { useEffect, useState } from 'react';

// const Home = () => {
//   const [income, setIncome] = useState(0);
//   const [expense, setExpense] = useState(0);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const incomeRes = await fetch('/api/income', {
//           headers: { Authorization: token },
//         });
//         const incomeData = await incomeRes.json();

//         const expenseRes = await fetch('/api/expense', {
//           headers: { Authorization: token },
//         });
//         const expenseData = await expenseRes.json();

//         const totalIncome = incomeData.reduce((acc, curr) => acc + curr.amount, 0);
//         const totalExpense = expenseData.reduce((acc, curr) => acc + curr.amount, 0);

//         setIncome(totalIncome);
//         setExpense(totalExpense);
//       } catch (err) {
//         console.error('Failed to fetch data:', err);
//       }
//     };

//     fetchData();
//   }, [token]);

//   const balance = income - expense;

//   return (
//     <DashboardLayout>
//       <h2 className="text-2xl font-bold text-gray-700 mb-4">Dashboard Overview</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="p-4 bg-white shadow rounded-lg">
//           <h4 className="text-sm text-gray-500">Total Balance</h4>
//           <p className="text-2xl font-bold text-gray-800">₹{balance}</p>
//         </div>
//         <div className="p-4 bg-white shadow rounded-lg">
//           <h4 className="text-sm text-gray-500">Total Income</h4>
//           <p className="text-2xl font-bold text-green-600">₹{income}</p>
//         </div>
//         <div className="p-4 bg-white shadow rounded-lg">
//           <h4 className="text-sm text-gray-500">Total Expenses</h4>
//           <p className="text-2xl font-bold text-red-500">₹{expense}</p>
//         </div>
//       </div>

//       <div className="h-64 bg-white rounded-lg shadow flex items-center justify-center text-gray-400">
//         📊 Chart Placeholder (coming soon)
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Home;















import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import Charts from '../../components/dashboard/Charts';

const Home = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await fetch('/api/income', {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          },
        });
        const incomeData = await incomeRes.json();

        const expenseRes = await fetch('/api/expense', {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          },
        });
        const expenseData = await expenseRes.json();

        console.log('Income:', incomeData);
        console.log('Expense:', expenseData);

        setIncome(incomeData);
        setExpense(expenseData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, [token]);

  const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Dashboard Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h4 className="text-sm text-gray-500">Total Balance</h4>
          <p className="text-2xl font-bold text-gray-800">₹{balance}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h4 className="text-sm text-gray-500">Total Income</h4>
          <p className="text-2xl font-bold text-green-600">₹{totalIncome}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h4 className="text-sm text-gray-500">Total Expenses</h4>
          <p className="text-2xl font-bold text-red-500">₹{totalExpense}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <Charts incomeData={income} expenseData={expense} />
      </div>

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3 text-green-700">Recent Income</h3>
          <ul className="space-y-2">
            {income.slice(0, 5).map(item => (
              <li key={item._id} className="text-sm flex justify-between">
                <span>{item.source}</span>
                <span className="font-medium">₹{item.amount}</span>
              </li>
            ))}
            {income.length === 0 && (
              <li className="text-gray-400 text-sm text-center">No income added</li>
            )}
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3 text-red-600">Recent Expenses</h3>
          <ul className="space-y-2">
            {expense.slice(0, 5).map(item => (
              <li key={item._id} className="text-sm flex justify-between">
                <span>{item.category}</span>
                <span className="font-medium">₹{item.amount}</span>
              </li>
            ))}
            {expense.length === 0 && (
              <li className="text-gray-400 text-sm text-center">No expenses added</li>
            )}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
