
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signup } from "@/app/actions/signup";
import { redirect } from "next/navigation";

export default function Page() {
  const [errors, setErrors] = React.useState<{
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  }>({});

  const handleError = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await signup({}, formData);
    if (result?.errors) {
      setErrors(result.errors);
    } else {
      setErrors({});
      alert(result?.message || "Signup successful!");
      redirect('/login')
    }
  }

  return (
    <div className="mt-8 flex items-center mx-auto">
      <form onSubmit={handleError}>
        <div>
          <Input
            className="text-black w-96"
            type="text"
            name="name"
            placeholder="Enter your Name"
            required
          />
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
        </div>

        <br />
        <div>
          <Input
            className="text-black w-96"
            type="email"
            name="email"
            placeholder="Type your email address"
            required
          />
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
        </div>
        <br />

        <div>
          <Input
            className="text-black w-96"
            type="password"
            name="password"
            placeholder="Set your password"
            required
          />
          {errors.password && (
            <p className="text-red-500">{errors.password[0]}</p>
          )}
        </div>
        <br />

        <div>
          <Input
            className="text-black w-96"
            type="password"
            name="confirmPassword"
            placeholder="Verify your password"
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword[0]}</p>
          )}
        </div>
        <br />

        <Button className="w-96 mt-4" type="submit">
          Signup
        </Button>
        <div className="text-right mb-4 mt-4">
          <a href="/login" className="text-gray-800">
            Already have an Account
          </a>
        </div>
      </form>
    </div>
  );
}

