import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const Signup = () => {
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        alert('Signup successful! Check your email for confirmation (if enabled). Redirecting...');
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
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">Create account</h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Start investing with LandVest
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
              <div className="absolute inset-y-0 left-90 pl-3 flex items-center pointer-events-none">
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
              <div className="absolute inset-y-0 left-90 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 sm:h-5 w-4 sm:w-5 text-neutral-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="form-input pl-10"
                placeholder="Create a password (min 6 chars)"
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
                Creating account...
              </>
            ) : (
              <>
                Create account
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-neutral-600 text-xs sm:text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

