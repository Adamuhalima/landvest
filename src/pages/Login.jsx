import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        alert('Login successful!');
        navigate('/');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-50 to-primary-50">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo/Header */}
        <div className="text-center">
          <div className="mx-auto h-14 sm:h-16 w-14 sm:w-16 flex items-center justify-center rounded-2xl bg-secondary-100 mb-4">
            <span className="text-xl sm:text-2xl font-bold text-secondary-600 text-sky-500">LandVest</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">Welcome back</h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Sign in to your LandVest account
          </p>
        </div>

        {error && (
          <div className="bg-error/10 border border-error/20 text-error rounded-lg p-3 sm:p-4 text-xs sm:text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 sm:h-5 w-4 sm:w-5 text-neutral-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="form-input pl-10"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password 
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 sm:h-5 w-4 sm:w-5 text-neutral-400" />
              </div>
              
              <input
                id="password"
                name="password"
                type="password"
                required
                className="form-input pl-10"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full btn btn-primary btn-large flex items-center justify-center text-sm sm:text-base ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </>
            )}
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center">
          <p className="text-neutral-600 text-xs sm:text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-700">
              Sign up here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

