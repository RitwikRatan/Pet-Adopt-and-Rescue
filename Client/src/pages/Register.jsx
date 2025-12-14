import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../UI/AuthCard';
import TextInput from '../UI/TextInput';
import PasswordInput from '../UI/PasswordInput';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
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
    const response = await fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }),
    });

    const data = await response.json();
    console.log('register response:', data);

    if (!response.ok) {
      // Django REST Framework will return field errors like:
      setErrors(data);
      return;
    }
    setSuccess(' Registration successful! You can now log in.');
    setFormData({
      username: '',
      email: '',
      password: '',
      phone: '',
    });
    setTimeout(()=>{navigate('/login')},2000);
  } catch (error) {
    setErrors((prev) => ({
      ...prev,
      general: error.message || 'Something went wrong. Please try again.',
    }));
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Form Section - First on mobile, second on lg */}
        <div className="w-full flex justify-center order-1 lg:order-2">
          <div className="w-full max-w-md">
            <AuthCard title="">
              {/* Header centered */}
              <div className="mb-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 shadow-sm mb-3">
                  <span className="text-3xl">🐶</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-50">
                  Create your Pet Rescue account
                </h1>
                <p className="mt-1 text-sm text-slate-300">
                  Join a community of pet lovers and start your rescue journey today.
                </p>
              </div>

              {/* Form left-aligned */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <TextInput
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={errors.username}
                  placeholder="Choose a unique username"
                />
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
                    placeholder="Create a strong password"
                  />
                 {!errors.password && (
                    <p className="mt-1 text-xs text-slate-300/90 pl-1">
                      Use at least 8 characters with a mix of letters and numbers.
                    </p>
                  )}

                </div>
                <TextInput
                  label="Phone "
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="Contact number for adoption updates"
                />

                {errors.general && (
                  <p className="mt-2 text-sm text-red-500 bg-red-50/90 border border-red-200 rounded-md px-3 py-2">
                    {errors.general}
                  </p>
                )}
                {success && (
                  <p className="mt-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2.5 px-4 rounded-lg text-sm font-semibold shadow-md hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
                >
                  {loading ? (
                    <>
                      <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <span>Create account</span>
                      <span className="text-lg">➜</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 text-center">
                <p className="text-xs text-slate-400 mb-2">
                  By signing up, you agree to our{' '}
                  <span className="underline underline-offset-2 cursor-pointer hover:text-amber-300 transition-colors">
                    Terms
                  </span>{' '}
                  and{' '}
                  <span className="underline underline-offset-2 cursor-pointer hover:text-amber-300 transition-colors">
                    Privacy Policy
                  </span>.
                </p>
                <p className="text-sm text-slate-300">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-semibold text-amber-300 hover:text-amber-200 hover:underline transition-colors"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </AuthCard>
          </div>
        </div>

        {/* Hero Section - Second on mobile, first on lg */}
        <div className="flex flex-col gap-6 order-2 lg:order-1 pl-20">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80"
              alt="Happy pets"
              className="h-80 w-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-200">
                Pet Rescue
              </p>
              <h2 className="text-2xl font-semibold">
                Find a forever home for every paw 🐾
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-1">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80"
              alt="Dog"
              className="h-20 w-full object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=400&q=80"
              alt="Cat"
              className="h-20 w-full object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=400&q=80"
              alt="Puppy"
              className="h-20 w-full object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          <p className="text-sm text-slate-200/80 leading-relaxed">
            Create an account to{' '}
            <span className="font-semibold text-amber-300">adopt, rescue, or rehome</span> pets in a safe and loving
            community. Join thousands of pet lovers making a difference every day. ❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
