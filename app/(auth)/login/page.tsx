"use client"

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/actions/login"

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(email, password);
      alert(response?.message || "Signup successful!");
      window.location.href = '/dashboard';
    } catch (err) {
      const error = err as Error
      if (error) {
        setError(error.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center mx-auto">
      <form onSubmit={handleLogin} className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        <Input
          className="text-black w-full mb-4"
          type="email"
          name="email"
          placeholder="Type your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          className="text-black w-full mb-4"
          type="password"
          name="password"
          placeholder="Type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          className="w-full text-base"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        <div className="text-right mb-4 mt-4">
          <a href="/signup" className="text-gray-800">Create a New Account?</a>
        </div>
      </form>
    </div>
  );
};

