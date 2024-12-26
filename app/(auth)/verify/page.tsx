import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className='mt-8 flex items-center mx-auto'>
      <form action="/verify" method="POST">
        <h1>Enter Your OTP</h1>
        <Input
          className="text-black w-96 h-1em"
          type="email"
          name="email"
          placeholder="Type your email address"
          required
        />
        <br />
        <Input
          className="text-black w-96 h-1em"
          type="password"
          name="password"
          placeholder="Set your password"
          required
        />
        <br />
        <Input
          className="text-black w-96 h-1em"
          type="password"
          name="password"
          placeholder="Verify your password"
          required
        />
        <br />
        <br />
        <Button
          className="w-96 h-1em text-base"
          type="submit"
        >
          Signup
        </Button>
        <br />
        <div className="text-right mb-4 mt-4">
          <a href="/login" className="text-gray-800">Already have an Account </a>
        </div>
      </form>
    </div>
  );
};

