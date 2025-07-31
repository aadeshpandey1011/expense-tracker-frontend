// import React, { useEffect, useState } from 'react';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { API } from '../../utils/apiPaths';

// const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

// const Charts = ({ incomeData, expenseData }) => {
//   // const [incomeData, setIncomeData] = useState([]);
//   // const [expenseData, setExpenseData] = useState([]);
//   const [pieData, setPieData] = useState([]);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchData = async () => {
//       const incomeRes = await fetch(`${API.INCOME}`, {
//         headers: { Authorization: token },
//       });
//       const expenseRes = await fetch(`${API.EXPENSE}`, {
//         headers: { Authorization: token },
//       });

//       const incomes = await incomeRes.json();
//       const expenses = await expenseRes.json();

//       setIncomeData(incomes);
//       setExpenseData(expenses);

//       const groupedByCategory = expenses.reduce((acc, curr) => {
//         acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
//         return acc;
//       }, {});

//       const pieFormatted = Object.entries(groupedByCategory).map(([key, value]) => ({
//         name: key,
//         value,
//       }));

//       setPieData(pieFormatted);
//     };

//     fetchData();
//   }, []);

//   const monthlySummary = () => {
//     const map = {};
//     [...incomeData, ...expenseData].forEach((item) => {
//       const month = new Date(item.date).toLocaleString('default', { month: 'short' });
//       if (!map[month]) map[month] = { month, income: 0, expense: 0 };
//       if (item.source) map[month].income += item.amount;
//       if (item.category) map[month].expense += item.amount;
//     });
//     return Object.values(map);
//   };

//   return (
//     <div className="grid md:grid-cols-2 gap-8 mt-6">
//       <div className="bg-white p-6 rounded-xl shadow">
//         <h3 className="text-lg font-semibold mb-4">Monthly Income vs Expense</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={monthlySummary()}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="income" fill="#4ade80" name="Income" />
//             <Bar dataKey="expense" fill="#f87171" name="Expense" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow">
//         <h3 className="text-lg font-semibold mb-4">Expense by Category</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={pieData}
//               dataKey="value"
//               nameKey="name"
//               outerRadius={100}
//               fill="#8884d8"
//               label
//             >
//               {pieData.map((_, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Charts;








import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

const Charts = ({ incomeData, expenseData }) => {
  // Remove local state and fetch logic

  // Prepare pie chart data from expenseData
  const pieData = expenseData.reduce((acc, curr) => {
    const found = acc.find(item => item.name === curr.category);
    if (found) {
      found.value += curr.amount;
    } else {
      acc.push({ name: curr.category, value: curr.amount });
    }
    return acc;
  }, []);

  // Prepare monthly summary for bar chart
  const monthlySummary = () => {
    const map = {};
    [...incomeData, ...expenseData].forEach((item) => {
      const month = new Date(item.date).toLocaleString('default', { month: 'short' });
      if (!map[month]) map[month] = { month, income: 0, expense: 0 };
      if (item.source) map[month].income += item.amount;
      if (item.category) map[month].expense += item.amount;
    });
    return Object.values(map);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlySummary()}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4ade80" name="Income" />
            <Bar dataKey="expense" fill="#f87171" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Expense by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;