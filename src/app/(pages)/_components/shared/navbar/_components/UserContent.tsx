"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Login from "@/app/_component/shared/login";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ChevronDown, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
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
import SignUp from "@/app/_component/shared/signup";

const UserContent = () => {
  const [state, setState] = useState<string>("");
  const { data: session } = useSession();

  return (
    <div className="hidden sm:block">
      {!session ? (
        /* Before login */
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
                    <SignUp />
                    <p className="mt-4 text-center text-sm">
                      Don t have an account?{" "}
                      <span
                        onClick={() => setState("login")}
                        className="text-pink-500 cursor-pointer hover:underline"
                      >
                        Log in
                      </span>
                    </p>
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
              <Link href="/user">
                <DropdownMenuItem className="text-base hover:bg-secondary/15 p-3 px-4 cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link href="/create-restaurant">
                <DropdownMenuItem
                  className={`text-base hover:bg-secondary/15 p-3 px-4 cursor-pointer ${
                    session.user?.restaurantId && "hidden"
                  }`}
                >
                  Build Restaurant
                </DropdownMenuItem>
              </Link>
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
