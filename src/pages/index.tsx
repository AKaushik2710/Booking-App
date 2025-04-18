import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("📨 Response from backend:", data);

    if (!res.ok) {
      setMessage(`Error: ${data.message || 'Something went wrong.'}`);
      return;
    }

    setMessage(data.message);
    setForm({ name: '', email: '', date: '', time: '' });
  } catch (err: any) {
    console.error("❌ Error during form submit:", err);
    setMessage('Network or server error');
  }
};

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>

        {['name', 'email', 'date', 'time'].map((field) => (
          <input
            key={field}
            type={field === 'email' ? 'email' : field === 'date' || field === 'time' ? field : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={(form as any)[field]}
            onChange={handleChange}
            required
            className="mb-3 w-full p-2 border rounded"
          />
        ))}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Book Now
        </button>

        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </main>
  );
}

