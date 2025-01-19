"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signup } from "@/actions/signup";
import { sendOTP } from "@/actions/sendOTP";
// import { redirect } from "next/navigation";
import { loginUser } from "@/actions/login";

export default function Page() {
  const [errors, setErrors] = useState<{
    name?: string[];
    email?: string[];
    otp?: string[];
    password?: string[];
    confirmPassword?: string[];
  }>({});

  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); // State to store OTP entered by user
  const [password, setPassword] = useState(""); // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);

  type ErrorState = {
    name?: string[];
    email?: string[];
    password?: string[];
    otp?: string[];
    confirmPassword?: string[];
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: ["Passwords do not match"],
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const formData = new FormData(e.currentTarget);
      const result = await signup({}, formData);

      if (result?.errors) {
        if ("general" in result.errors) {
          setErrors({ password: result.errors.general });
        } else {
          setErrors(result.errors as ErrorState);
        }
      } else {
        setErrors({});
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      loginUser(email, password);
    }
  };

  // Send OTP to user's email
  const handleSendOTP = async () => {
    if (!email) {
      alert("Please enter an email address first.");
      return;
    }

    setIsLoadingOTP(true);

    const result = await sendOTP({ email });

    if (result?.success) {
      setOtpSent(true);
      alert("OTP sent to your email.");
    } else {
      setOtpSent(false);
      alert(result?.message || "Failed to send OTP.");
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign up</h2>
        <div>
          <Input
            id="name"
            className="w-full"
            type="text"
            name="name"
            placeholder="Enter your Name"
            required
          />
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
        </div>

        {/* Email & OTP Request */}
        <div className="flex items-center mt-4">
          <Input
            className="w-full mr-2"
            type="email"
            name="email"
            placeholder="Type your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="button"
            onClick={handleSendOTP}
            disabled={otpSent || isLoading}
          >
            {otpSent ? "OTP Sent" : isLoadingOTP ? "Sending..." : "Get OTP"}
          </Button>
        </div>
        {errors.email && <p className="text-red-500">{errors.email[0]}</p>}

        {/* OTP Input */}
        <div className="mt-4">
          <Input
            className="w-full"
            type="text"
            name="otp"
            placeholder="Enter your OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          {errors.otp && <p className="text-red-500">{errors.otp[0]}</p>}
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <Input
            className="w-full"
            type="password"
            name="password"
            placeholder="Set your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <p className="text-red-500">{errors.password[0]}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="mt-4">
          <Input
            className="w-full"
            type="password"
            name="confirmPassword"
            placeholder="Verify your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword[0]}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          className="w-full mt-6"
          type="submit"
          disabled={!otpSent || isLoading}
        >
          {isLoading ? "Signing Up..." : "Signup"}
        </Button>

        {/* Redirect to Login */}
        <div className="mt-4 text-center text-sm">
          Have an account?{" "}
          <a href="/login" className="underline underline-offset-4">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
