import React, { useState } from 'react';
import { Eye, EyeOff, Flower2, Mail, Lock } from 'lucide-react';
import { login } from '../API';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ onClose = null, onSwitchToSignup = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      const result = await login(formData);

      if (result.success) {
        setSuccess(result.message);
        localStorage.setItem('token', result.token); // save JWT
        localStorage.setItem('user', JSON.stringify(result.user)); // optional user info
        try { window.dispatchEvent(new CustomEvent('auth:update', { detail: { loggedIn: true } })); } catch {
          // Auth update events are optional UI synchronization.
        }
        navigate(from, { replace: true }); // redirect to intended page
        try { onClose && onClose(); } catch {
          // Closing modal should not block a completed login.
        }
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sage-100 bg white 100 p-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="/images/logo.jpeg"
              className="h-20 w-20 object-contain bg-center"
              alt="Florentino logo"
            />
          </div>
          <h2 className="text-2xl font-bold text-sage-900 mb-2">Welcome Back</h2>
          <p className="text-sage-600">Log in to your blooming account</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-700 text-sm bg-green-50 border border-green-200 rounded-md px-3 py-2">
                {success}
              </div>
            )}
            {/* Email Field */}
            <div>
              <label className="block text-sage-700 font-medium mb-2">Email </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200"
                  placeholder="your@gmail.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sage-700 font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-400 hover:text-sage-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-rose-400 border-sage-300 rounded focus:ring-rose-400"
                />
                <span className="ml-2 text-sm text-sage-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-rose-600 hover:text-rose-500 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-600 hover:bg-rose-500 disabled:opacity-60 text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-105 font-semibold"
            >
              {loading ? 'Signing in...' : 'Log In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-sage-200"></div>
            <span className="px-4 text-sage-500 text-sm">or</span>
            <div className="flex-1 border-t border-sage-200"></div>
          </div>

          {/* Switch to Signup */}
          <div className="text-center">
            <p className="text-sage-600">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  try {
                    if (onSwitchToSignup) onSwitchToSignup();
                    else navigate('/signup');
                  } catch {
                    navigate('/signup');
                  }
                }}
                className="text-rose-600 hover:text-rose-500 font-semibold transition-colors"
              >
                Create one
              </button>
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            if (onClose) {
              try { onClose(); } catch {
                // Fallback navigation below handles close failures.
              }
            } else {
              try { navigate(-1); } catch { navigate('/'); }
            }
          }}
          className="absolute top-4 right-4 text-sage-400 hover:text-sage-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Login;
