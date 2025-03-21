'use client';

import LoginForm from "../../components/LoginForm";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xl p-6 rounded-lg shadow-md">
        <LoginForm />
      </div>
    </div>
  );
}
