import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../UI/AuthCard.jsx';
import TextInput from '../UI/TextInput.jsx';
import PasswordInput from '../UI/PasswordInput.jsx';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showPasswordHint, setShowPasswordHint] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);
  setSuccess('');
  setErrors({});

  try {
    const Response = await fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username_or_email: formData.email,  
        password: formData.password,
      }),
    });

    const data = await Response.json();
    console.log(data);
    if (!Response.ok) {
      setErrors({
        general: data?.detail || "Invalid credentials",
      });
      return;
    }
    setSuccess(' Login successful! Redirecting...');

  } catch (error) {
    setErrors({
      general: error.message || 'Something went wrong. Please try again.',
    });
  } finally {
    setTimeout(() => {navigate('/dashboard'),
    setLoading(false)}
    , 2000);
    
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Side - Hero / Story (hidden on small screens) */}
        <div className="hidden lg:flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80"
              alt="Woman with dog"
              className="h-80 w-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-200">
                Welcome back
              </p>
              <h2 className="text-2xl font-semibold">
                Continue your rescue journey 🐾
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <img
              src="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?auto=format&fit=crop&w=400&q=80"
              alt="Cat cuddle"
              className="h-20 w-full object-cover rounded-2xl shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80"
              alt="Dog in shelter"
              className="h-20 w-full object-cover rounded-2xl shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=400&q=80"
              alt="Happy dog"
              className="h-20 w-full object-cover rounded-2xl shadow-md"
            />
          </div>

          <p className="text-sm text-slate-200/80 leading-relaxed">
            Log in to manage your{' '}
            <span className="font-semibold text-amber-300">adoption requests</span>, track rescues, and stay
            connected with loving pets and families. 💛
          </p>
        </div>

        {/* Right Side - Login Card */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-md">
            <AuthCard title="">
              {/* Header (centered), form below is left-aligned */}
              <div className="mb-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 shadow-sm mb-3">
                  <span className="text-3xl">🐾</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-50">
                  Log in to Pet Rescue
                </h1>
                <p className="mt-1 text-sm text-slate-300">
                  Welcome back! Let&apos;s help more pets find their forever homes.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="you@example.com"
                />

                <div>
                  <PasswordInput
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="Enter your password"
                    onFocus={() => setShowPasswordHint(true)}
                    onBlur={() => setShowPasswordHint(false)}
                  />
                  {showPasswordHint && !errors.password && (
                    <p className="mt-1 text-xs text-slate-400">
                      Tip: Make sure Caps Lock is off and check for typos.
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm mt-1">
                  <label className="inline-flex items-center gap-2 text-slate-300">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-slate-400 text-amber-400 focus:ring-amber-400"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-amber-300 hover:text-amber-200 hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {errors.general && (
                  <p className="mt-2 text-sm text-red-500 bg-red-50/90 border border-red-200 rounded-md px-3 py-2">
                    {errors.general}
                  </p>
                )}
                {success && (
                  <p className="mt-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2">
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2.5 px-4 rounded-lg text-sm font-semibold shadow-md hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <>
                      <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <span>Log in</span>
                      <span className="text-lg">→</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 text-center">
                <p className="text-sm text-slate-300">
                  New to Pet Rescue?{' '}
                  <Link
                    to="/register"
                    className="font-semibold text-amber-300 hover:text-amber-200 hover:underline transition-colors"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </AuthCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
