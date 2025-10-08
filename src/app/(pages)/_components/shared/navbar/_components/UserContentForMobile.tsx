"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, X } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Logo from "@/components/ui/Logo";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Login from "@/app/_component/shared/login";
import SignUp from "@/app/_component/shared/signup";
import Link from "next/link";

const UserContentForMobile = () => {
  const { data: session } = useSession();
  const [state, setState] = useState<string>("");

  return (
    <div className="sm:hidden ">
      {session ? (
        // After login
        <div>
          {/* checkbox */}
          <input type="checkbox" id="menuToggle" className="hidden peer" />

          <label htmlFor="menuToggle" className="peer-checked:hidden">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                width={100}
                height={100}
                alt="Profile picture"
                className="size-8 rounded-full"
              />
            ) : (
              <User className="bg-accent p-1.5 size-10 rounded-full" />
            )}
          </label>

          {/* Main user content */}

          <div className="absolute bg-white top-0 left-0 w-full h-screen -translate-x-full peer-checked:translate-0 transition duration-150">
            <div className="flex justify-between items-center p-4 pb-18 border-b">
              <Logo />
              <label
                htmlFor="menuToggle"
                className="cursor-pointer flex items-center"
              >
                <X className="mr-1" />
              </label>
            </div>

            <ul className="p-3">
              <Link href="/user">
                <li className="py-1.5 px-2.5 hover:bg-accent rounded-sm">
                  Profile
                </li>
              </Link>
              <Link href="/create-restaurant">
                <li
                  className={`py-1.5 px-2.5 hover:bg-accent rounded-sm ${
                    session.user?.restaurantId && "hidden"
                  }`}
                >
                  Build Restaurant
                </li>
              </Link>
              <DropdownMenuSeparator />
              <li className="py-1.5 px-2.5 hover:bg-accent rounded-sm">
                Pandapay
              </li>
              <li className="py-1.5 px-2.5 hover:bg-accent rounded-sm">
                Subscribe to free delivery
              </li>
              <li className="py-1.5 px-2.5 hover:bg-accent rounded-sm">
                Orders & recording
              </li>
              <li className="py-1.5 px-2.5 hover:bg-accent rounded-sm">
                Voucher
              </li>
              <li className="py-1.5 px-2.5 hover:bg-accent rounded-sm">
                Panda rewards
              </li>
              <DropdownMenuSeparator />
              <Select>
                <SelectTrigger className="w-full text-base border-none outline-none bg-transparent shadow-none">
                  <SelectValue placeholder="Languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="bangla">Bangla</SelectItem>
                </SelectContent>
              </Select>
              <li className="py-1.5 px-2.5 hover:bg-accent rounded-sm">
                Help center
              </li>
              <DropdownMenuSeparator />
              <li
                className="py-1.5 px-2.5 hover:bg-accent rounded-sm"
                onClick={() => signOut()}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // Before login
        <Drawer>
          <DrawerTrigger asChild>
            <User className="bg-accent p-1.5 size-10 rounded-full" />
          </DrawerTrigger>

          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              {state === "login" ? (
                <div className="px-3">
                  <DrawerHeader className="mb-5 flex justify-between flex-row">
                    <ArrowLeft onClick={() => setState("")} />

                    <div>
                      <DrawerTitle className="text-3xl font-bold text-center">
                        Login
                      </DrawerTitle>
                      <DrawerDescription className="font-semibold text-center">
                        Log in to continue
                      </DrawerDescription>
                    </div>

                    <span></span>
                  </DrawerHeader>

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
                <div className="px-3">
                  <DrawerHeader className="mb-5 flex justify-between flex-row">
                    <ArrowLeft onClick={() => setState("")} />

                    <div>
                      <DrawerTitle className="text-3xl font-bold text-center">
                        Sign up
                      </DrawerTitle>
                      <DrawerDescription className="font-semibold text-center">
                        Sign up to continue
                      </DrawerDescription>
                    </div>

                    <span></span>
                  </DrawerHeader>
                  <SignUp />
                  <p className="my-4 text-center text-sm">
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
                  <DrawerHeader className="flex">
                    <DrawerTitle>Welcome!</DrawerTitle>
                    <DrawerDescription>
                      Sign up or log in to continue
                    </DrawerDescription>

                    <DrawerClose asChild className="absolute right-4 top-4">
                      <Button
                        variant="outline"
                        className="rounded-full size-9 shadow-md"
                      >
                        <X />
                      </Button>
                    </DrawerClose>
                  </DrawerHeader>
                  <div className="grid gap-4 px-5">
                    <Button
                      onClick={() => signIn("facebook")}
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
                        src={"/google.svg"}
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
                  <DrawerFooter>
                    <p className="text-xs text-gray-500">
                      By signing up, you agree to our
                      <span className="text-secondary">
                        {" "}
                        Terms and Conditions
                      </span>{" "}
                      and
                      <span className="text-secondary"> Privacy Policy.</span>
                    </p>
                  </DrawerFooter>
                </div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default UserContentForMobile;
