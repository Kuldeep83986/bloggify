import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(registerUser(form)).unwrap();
      console.log('Register success:', res);
      navigate('/login');
    } catch (err) {
      console.error('Register failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100">
      <Navbar />

      <div className="flex-grow flex flex-col justify-center items-center mt-[15vh] mb-[20vh] px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl p-8 rounded-xl w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-semibold text-center text-blue-700">Create Account</h2>
          <p className="text-center text-gray-500">Join us and start your journey</p>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <label className="block mb-1 text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="yourname"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
