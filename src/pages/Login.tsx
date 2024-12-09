import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { AppIcon } from '../components/icons/AppIcon';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: '1',
      email,
      name: email.split('@')[0],
    });
    navigate('/dashboard');
  };

  const handleGuestLogin = () => {
    login({
      id: 'guest',
      email: 'guest@example.com',
      name: 'Guest User',
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <AppIcon />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to IPL Predictor
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGuestLogin}
            >
              Continue as Guest
            </Button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
                    Register
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}