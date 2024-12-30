"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updatePassword } from "@/actions/updatePassword";
import { sendOTP } from "@/actions/sendOTP";
import { redirect } from "next/navigation";

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
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    const formData = new FormData(e.currentTarget);
    const result = await updatePassword({}, formData);

    if (result?.errors) {
      alert(result?.errors || "Unable to Change your Password, Better luck next time");
    } else {
      setErrors({});
      alert(result?.message || "Password chaged successfully");
      redirect("/login");
    }
    setIsLoading(false);
  };

  const handleSendOTP = async () => {
    if (!email) {
      alert("Please enter an email address first.");
      return;
    }

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
    <div className="mt-8 flex flex-col items-center mx-auto">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        {/* Name Input */}
        <div>
          <Input
            className="text-black w-full"
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
            className="text-black w-full mr-2"
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
            {otpSent ? "OTP Sent" : isLoading ? "Sending..." : "Get OTP"}
          </Button>
        </div>
        {errors.email && <p className="text-red-500">{errors.email[0]}</p>}

        {/* OTP Input */}
        <div className="mt-4">
          <Input
            className="text-black w-full"
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
            className="text-black w-full"
            type="password"
            name="password"
            placeholder="Set your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
        </div>

        {/* Confirm Password Input */}
        <div className="mt-4">
          <Input
            className="text-black w-full"
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
        <Button className="w-full mt-6" type="submit" disabled={!otpSent || isLoading}>
          {isLoading ? "Just a sec....." : "Update Password"}
        </Button>
      </form>
    </div>
  );
}

