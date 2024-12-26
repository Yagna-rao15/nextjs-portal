import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth"

export default function Page() {
  return (
    <div className='mt-8'>
      <form action="/api/login" method="POST">
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
          placeholder="Type your password"
          required
        />
        <br />
        <Button
          className="w-96 h-1em text-base"
          type="submit"
        >
          Login
        </Button>
        <br />
        <div className="text-right mb-4 mt-4">
          <a href="/signup" className="text-gray-800">Create a New Account!!</a>
        </div>

        <br />
      </form>

      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    </div>
  );
};
