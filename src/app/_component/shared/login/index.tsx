"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setLogin({ ...login, [e.target.name]: e.target.value });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: login.email,
      password: login.password,
    });

    setLoading(false);

    if (res?.error) setError(res.error);
    else router.push("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={login.email}
        onChange={onChange}
        className="inputstyle"
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={login.password}
        onChange={onChange}
        className="inputstyle"
        required
      />

      {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading} // disable while loading
        className={`w-full cursor-pointer py-4 rounded-xl font-semibold text-white transition duration-200 ${
          loading
            ? "bg-pink-400 cursor-not-allowed"
            : "bg-pink-600 hover:bg-pink-700"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
