"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}
interface SignUpErrors {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
}

export default function SignUp() {
  const router = useRouter();
  const [signup, setSignUp] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: SignUpErrors = {};
    if (!signup.name.trim()) newErrors.name = "Username is required";
    if (!signup.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signup.email))
      newErrors.email = "Email is invalid";
    if (!signup.password.trim()) newErrors.password = "Password is required";
    else if (signup.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUp({ ...signup, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(`api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      });
      const data = await res.json();
      if (res.ok) {
        await signIn("credentials", {
          redirect: false,
          email: signup.email,
          password: signup.password,
        });

        router.push("/");
      } else setErrors({ general: data.message });
    } catch {
      setErrors({ general: "Network or server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4" noValidate>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={signup.name}
        onChange={onInputChange}
        className="inputstyle"
      />
      {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={signup.email}
        onChange={onInputChange}
        className="inputstyle"
      />
      {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={signup.password}
        onChange={onInputChange}
        className="inputstyle"
      />
      {errors.password && (
        <p className="text-red-400 text-sm">{errors.password}</p>
      )}

      {errors.general && (
        <p className="text-red-400 text-sm">{errors.general}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-pink-600 text-white rounded-xl font-semibold"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>
    </form>
  );
}
