import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));

    if (res.meta.requestStatus === 'fulfilled') {
      const user = res.payload;
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/blog'); // Redirect normal user to blog page
      }
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
          <h2 className="text-3xl font-semibold text-center text-blue-700">Welcome Back</h2>
          <p className="text-center text-gray-500">Login to your account to continue</p>

          {error && <p className="text-red-500 text-center">{error}</p>}

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
              placeholder="*****"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-center">
            <p className="text-gray-500">Don't have an account?</p>
            <Link
              to="/register"
              className="inline-block mt-2 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
