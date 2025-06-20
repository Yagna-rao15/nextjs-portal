"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/actions/login";
import { useSearchParams, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(email, password);
      if (response.message != "Success") {
        setError(response.message || "Something went wrong. Please try again.");
      } else {
        router.push(callbackUrl);
      }
      setIsLoading(false);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto my-auto">
      <form onSubmit={handleLogin} className="w-full md:w-72 lg:w-72 xl:w-72">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <Input
          className="mb-4"
          type="email"
          name="email"
          placeholder="Type your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          className="w-full mb-4"
          type="password"
          name="password"
          placeholder="Type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button className="w-full text-base" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="underline underline-offset-4">
            Sign up
          </a>
        </div>

        <div className="text-center text-sm mt-4">
          <a href="forgot" className="underline underline-offset-4">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
