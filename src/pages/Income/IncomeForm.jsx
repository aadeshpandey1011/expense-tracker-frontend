// src/pages/Income/IncomeForm.jsx
import { useState } from 'react';
import { API } from '../../utils/apiPaths';


import { toast } from 'react-toastify';


const IncomeForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    source: '',
    amount: '',
    date: '',
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) return setError('Unauthorized: No token');

    try {
      const res = await fetch(API.INCOME, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || 'Failed to add income');
        return;
      }

      setForm({ source: '', amount: '', date: '' });
      setError('');
      onAdd?.(data); // optional callback
    
     toast.success('Income added successfully!');

     setTimeout(() => {
        window.location.reload();
        }, 2000);

    } catch (err) {
      setError('Error adding income');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold">Add Income</h3>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <input name="source" value={form.source} onChange={handleChange} placeholder="Source" required className="input" />
      <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="Amount" required className="input" />
      <input name="date" type="date" value={form.date} onChange={handleChange} required className="input" />
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Income</button>
    </form>
  );
};

export default IncomeForm;
