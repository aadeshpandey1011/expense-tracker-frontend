import { useState } from 'react';
import { API } from '../../utils/apiPaths';


import { toast } from 'react-toastify';


const ExpenseForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    category: '',
    amount: '',
    date: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return setError('Unauthorized: No token found');

    try {
      const res = await fetch(API.EXPENSE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || 'Failed to add expense');
        return;
      }

      setForm({ category: '', amount: '', date: '' });
      setError('');
      onAdd?.(data);
    
      toast.success('Expense added successfully!');
      setTimeout(() => {
        window.location.reload();
        }, 2000);

    } catch (err) {
      setError('Error adding expense');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold">Add Expense</h3>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        required
        className="input"
      />
      <input
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
        className="input"
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
        className="input"
      />
      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;

