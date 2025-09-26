import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { signup } from '../API';

const Signup = ({ onClose, onSwitchToLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    return;
  }
  if (!formData.agreeToTerms) {
    setError('You must agree to the terms');
    return;
  }
  setLoading(true);
  try {
    const result = await signup(formData);
    if (result.success || result.token) {
      setSuccess('Account created! You can now log in.');
      onSwitchToLogin(); // Immediately switch to login tab
    } else {
      setError(result.message || 'Signup failed');
    }
  } catch (err) {
    setError('Signup failed. Please try again.');
  }
  setLoading(false);
};

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-sage-100 to-rose-100 p-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-sage-700"><b>Join with Florentino Family</b></span>
          </div>
          <p className="text-sage-600">Create your account and bloom with us</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <label className="block text-sage-700 font-medium mb-2">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-400" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your first name"
                  required
                />
              </div>
            </div>
            {/* Last Name */}
            <div>
              <label className="block text-sage-700 font-medium mb-2">Last Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-400" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="block text-sage-700 font-medium mb-2">Email Address</label>
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
            {/* Phone */}
            <div>
              <label className="block text-sage-700 font-medium mb-2">Contact Number(with country code +94......)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200"
                  placeholder="+94 771234567"
                />
              </div>
            </div>
            {/* Password */}
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
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {/* Confirm Password */}
            <div>
              <label className="block text-sage-700 font-medium mb-2">Retype Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200"
                  placeholder="Retype your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-400 hover:text-sage-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {/* Terms Agreement */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 text-rose-400 border-sage-300 rounded focus:ring-rose-400 mt-1"
                required
              />
              <label className="text-sm text-sage-600 leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-rose-400 hover:text-rose-500 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-rose-400 hover:text-rose-500 transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>
            {/* Error/Success Messages */}
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-500 text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-105 font-semibold"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-sage-200"></div>
            <span className="px-4 text-sage-500 text-sm">or</span>
            <div className="flex-1 border-t border-sage-200"></div>
          </div>
          {/* Switch to Login */}
          <div className="text-center">
            <p className="text-sage-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-rose-400 hover:text-rose-500 font-semibold transition-colors"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
        {/* Close Button */}
        <button
          onClick={onClose}
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

export default Signup;