"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Login from "@/app/_component/shared/login";

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

const UserContent = () => {
  const [state, setState] = useState<string>("");

  const router = useRouter();

  const [loading, setLoading] = useState(false); // ✅ loading state



  // Sign up start
  const [signup, setSignUp] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<SignUpErrors>({});
  // const [loading, setLoading] = useState(false);
  // const [showConfirmMessage, setShowConfirmMessage] = useState(false);

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
  // Sign up end

  const { data: session } = useSession();

  return (
    <div className="hidden sm:block">
      {!session ? (
        /* before login */
        <div>
          <Dialog>
            <form>
              <div className="flex gap-7">
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    Log in
                  </Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Button className="hidden md:block cursor-pointer">
                    Sign up for free delivery
                  </Button>
                </DialogTrigger>
              </div>

              <DialogContent className="sm:max-w-[425px]">
                {state === "login" ? (
                  <div>
                    <DialogHeader className="mb-5 flex justify-between flex-row">
                      <ArrowLeft onClick={() => setState("")} />

                      <div>
                        <DialogTitle className="text-3xl font-bold text-center">
                          Login
                        </DialogTitle>
                        <DialogDescription className="font-semibold text-center">
                          Log in to continue
                        </DialogDescription>
                      </div>

                      <span></span>
                    </DialogHeader>

                    <div>
                      <Login />
                      <p className="mt-4 text-center text-sm">
                        Don t have an account?{" "}
                        <span
                          onClick={() => setState("signup")}
                          className="text-pink-500 cursor-pointer hover:underline"
                        >
                          Sign Up
                        </span>
                      </p>
                    </div>
                  </div>
                ) : state === "signup" ? (
                  <div>
                    <DialogHeader className="mb-5 flex justify-between flex-row">
                      <ArrowLeft onClick={() => setState("")} />

                      <div>
                        <DialogTitle className="text-3xl font-bold text-center">
                          Sign up
                        </DialogTitle>
                        <DialogDescription className="font-semibold text-center">
                          Sign up to continue
                        </DialogDescription>
                      </div>

                      <span></span>
                    </DialogHeader>

                    <div>
                      <form
                        onSubmit={handleSignUp}
                        className="space-y-4"
                        noValidate
                      >
                        <input
                          type="text"
                          name="name"
                          placeholder="name"
                          value={signup.name}
                          onChange={onInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        {errors.name && (
                          <p className="text-red-400 text-sm">{errors.name}</p>
                        )}

                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={signup.email}
                          onChange={onInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm">{errors.email}</p>
                        )}

                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={signup.password}
                          onChange={onInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        {errors.password && (
                          <p className="text-red-400 text-sm">
                            {errors.password}
                          </p>
                        )}

                        {errors.general && (
                          <p className="text-red-400 text-sm">
                            {errors.general}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-3 bg-pink-600 text-white rounded-xl font-semibold"
                        >
                          {loading ? "Creating Account..." : "Sign Up"}
                        </button>
                        <p className="mt-4 text-center text-sm">
                          I have an account?{" "}
                          <span
                            onClick={() => setState("login")}
                            className="text-pink-500 cursor-pointer hover:underline"
                          >
                            Login
                          </span>
                        </p>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div>
                    <DialogHeader className="mb-10">
                      <DialogTitle className="text-3xl font-bold">
                        Welcome!
                      </DialogTitle>
                      <DialogDescription className="font-semibold">
                        Sign up or log in to continue
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                      <Button
                        disabled
                        size="lg"
                        variant="outline"
                        className="cursor-pointer text-[15px] h-11 text-white bg-[#1877F2] grid grid-cols-4"
                      >
                        <Image
                          src="/facebook.svg"
                          width={100}
                          height={100}
                          alt="facebook"
                          className="size-6"
                        />
                        Continue with Facebook
                      </Button>

                      <Button
                        onClick={() => signIn("google")}
                        size="lg"
                        variant="outline"
                        className="cursor-pointer text-[15px] h-11 hover:bg-gray-300/50 grid grid-cols-4"
                      >
                        <Image
                          src="/google.svg"
                          width={100}
                          height={100}
                          alt="google"
                          className="size-6"
                        />
                        Continue with Google
                      </Button>

                      <Button
                        disabled
                        size="lg"
                        variant="outline"
                        className="cursor-pointer text-[15px] h-11 text-white bg-[#000000] grid grid-cols-4"
                      >
                        <Image
                          src="/apple.svg"
                          width={100}
                          height={100}
                          alt="apple"
                          className="size-6"
                        />
                        Continue with Apple
                      </Button>

                      <Separator className="my-2" />

                      <Button
                        onClick={() => setState("login")}
                        size="lg"
                        className="cursor-pointer text-[15px] h-11 "
                      >
                        Login
                      </Button>

                      <Button
                        onClick={() => setState("signup")}
                        size="lg"
                        variant="outline"
                        className="cursor-pointer text-[15px] h-11"
                      >
                        Sign up
                      </Button>
                    </div>

                    <DialogFooter>
                      <p className="text-xs text-gray-500 mt-5">
                        By signing up, you agree to our
                        <span className="text-secondary">
                          {" "}
                          Terms and Conditions
                        </span>{" "}
                        and
                        <span className="text-secondary"> Privacy Policy.</span>
                      </p>
                    </DialogFooter>
                  </div>
                )}
              </DialogContent>
            </form>
          </Dialog>
        </div>
      ) : (
        <div>
          {/* after login */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    width={100}
                    height={100}
                    alt="Profile picture"
                    className="size-6 rounded-full"
                  />
                ) : (
                  <User />
                )}
                {session.user?.name}
                <ChevronDown color="var(--primary)" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-75 p-3" align="start">
              <DropdownMenuLabel className="text-lg">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuItem className="text-base hover:bg-secondary/15 p-3 px-4 cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-base hover:bg-secondary/15 p-3 px-4 cursor-pointer">
                  Pandapay
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base hover:bg-secondary/15 p-3 px-4 cursor-pointer">
                  Subscribe to free Delivery
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base hover:bg-secondary/15 p-3 px-4 cursor-pointer">
                  Orders and Recording
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base hover:bg-secondary/15 p-3 px-4 cursor-pointer">
                  Vouchers
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base hover:bg-secondary/15 p-3 px-4 cursor-pointer">
                  Panda rewards
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-base hover:bg-secondary/15 p-3 px-4 cursor-pointer">
                Help Center{" "}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-base hover:bg-secondary/15 p-3 px-4 cursor-pointer"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default UserContent;
