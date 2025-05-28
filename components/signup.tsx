"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { checkSVNITEmail } from "@/lib/utils";
import { sendOTP } from "@/actions/sendOTP";
import { signup } from "@/actions/signup";

type SignPageProps = {
  use: "signup" | "forgot";
};

export default function SignPage({ use }: SignPageProps) {
  type Field = "email" | "otp" | "password" | "confirmPassword";
  type FormDataType = Record<Field, string>;
  type Errors = Record<Field | "general", string | null>;

  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({
    email: null,
    otp: null,
    password: null,
    confirmPassword: null,
    general: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (field: Field, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear only the specific field error instead of all errors
    setErrors((prev) => ({ ...prev, [field]: null, general: null }));
  };

  const validateEmail = (): boolean => {
    const newErrors: Errors = { ...errors }; // Preserve other errors

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      newErrors.email = checkSVNITEmail(formData.email);
    }

    setErrors(newErrors);
    return newErrors.email === null;
  };

  const validatePasswordReset = (): boolean => {
    const newErrors: Errors = { ...errors }; // Preserve other errors

    // Clear password-related errors first
    newErrors.otp = null;
    newErrors.password = null;
    newErrors.confirmPassword = null;

    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (formData.otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits";
    }

    if (!formData.password) {
      newErrors.password =
        use === "signup" ? "Password is required" : "New password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return (
      newErrors.otp === null &&
      newErrors.password === null &&
      newErrors.confirmPassword === null
    );
  };

  const handleSendOTP = async () => {
    if (!validateEmail()) return;
    setIsLoadingOTP(true);

    try {
      await sendOTP({ email: formData.email });
      setStep(2);
    } catch (error) {
      const newErrors: Errors = { ...errors };

      if (error instanceof Error) {
        newErrors.email = error.message;
      } else {
        newErrors.email = String(error);
      }
      setErrors(newErrors);
    } finally {
      setIsLoadingOTP(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePasswordReset()) return;
    setIsLoading(true);
    setErrors({
      email: null,
      otp: null,
      password: null,
      confirmPassword: null,
      general: null,
    });

    try {
      // Create FormData with current form values
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("otp", formData.otp);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("confirmPassword", formData.confirmPassword);

      const result = await signup(formDataToSend);

      if (result.error) {
        const newErrors: Errors = { ...errors };
        if (typeof result.error === "string") {
          newErrors.general = result.error;
          setErrors(newErrors);
        } else {
          alert("Hello");
          setErrors(result.error);
          console.log("Errors: ", result.error);
        }
      } else {
        // Success
        const successMessage =
          use === "signup"
            ? "Signup successful! You can now login with your credentials."
            : "Password reset successful! You can now login with your new credentials.";

        alert(successMessage);

        // Reset form and go back to step 1
        setFormData({
          email: "",
          otp: "",
          password: "",
          confirmPassword: "",
        });
        setStep(1);
        setErrors({
          email: null,
          otp: null,
          password: null,
          confirmPassword: null,
          general: null,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      const newErrors: Errors = { ...errors };
      newErrors.general = "An unexpected error occurred. Please try again.";
      setErrors(newErrors);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep(1);
    setFormData((prev) => ({
      ...prev,
      otp: "",
      password: "",
      confirmPassword: "",
    }));

    setErrors((prev) => ({
      ...prev,
      otp: null,
      password: null,
      confirmPassword: null,
      general: null,
    }));
  };

  return (
    <div className="flex flex-col items-center mx-auto my-auto">
      <div className="w-full md:w-72 lg:w-72 xl:w-72">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {use === "signup" ? "Sign up" : "Forgot Password"}
        </h2>

        {errors.general && (
          <div className="text-red-500 text-center mb-4">{errors.general}</div>
        )}

        {step === 1 ? (
          // Step 1: Email Input
          <>
            <p className="text-sm text-gray-600 dark:text-muted-foreground text-center mb-4">
              Enter your email address and we will send you an OTP to verify
              your identity.
            </p>

            <Input
              className="mb-4"
              type="email"
              placeholder="Type your email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
            {errors.email && (
              <div className="text-red-500 text-sm mb-2 -mt-2">
                {errors.email}
              </div>
            )}

            <Button
              className="w-full text-base mb-4"
              type="button"
              onClick={handleSendOTP}
              disabled={isLoadingOTP}
            >
              {isLoadingOTP ? "Sending OTP..." : "Send OTP"}
            </Button>
          </>
        ) : (
          // Step 2: OTP and New Password
          <form onSubmit={handleResetPassword}>
            <p className="text-sm text-gray-600 text-center mb-4">
              Enter the OTP sent to <strong>{formData.email}</strong> and set
              your {use === "signup" ? "" : "new"} password.
            </p>

            {/* OTP Input */}
            <Input
              className="mb-4"
              type="text"
              placeholder="Enter 6-digit OTP"
              value={formData.otp}
              onChange={(e) =>
                handleInputChange(
                  "otp",
                  e.target.value.replace(/\D/g, "").slice(0, 6),
                )
              }
              maxLength={6}
              required
            />
            {errors.otp && (
              <div className="text-red-500 text-sm mb-2 -mt-2">
                {errors.otp}
              </div>
            )}

            {/* Password Input */}
            <Input
              className="mb-4"
              type="password"
              placeholder={
                use === "signup" ? "Enter your password" : "Enter new password"
              }
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
            />
            {errors.password && (
              <div className="text-red-500 text-sm mb-2 -mt-2">
                {errors.password}
              </div>
            )}

            {/* Confirm Password Input */}
            <Input
              className="mb-4"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              required
            />
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm mb-2 -mt-2">
                {errors.confirmPassword}
              </div>
            )}

            <Button
              className="w-full text-base mb-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? use === "signup"
                  ? "Signing up..."
                  : "Resetting Password..."
                : use === "signup"
                  ? "Sign up"
                  : "Reset Password"}
            </Button>

            <Button
              className="w-full text-base"
              type="button"
              onClick={handleBackToEmail}
              variant="outline"
              disabled={isLoading}
            >
              Back to Email
            </Button>
          </form>
        )}

        {/* Navigation Links */}
        <div className="mt-4 text-center text-sm">
          Remember your password?{" "}
          <a href="/login" className="underline underline-offset-4">
            Login
          </a>
        </div>

        {use === "forgot" && (
          <div className="text-center text-sm mt-2">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
