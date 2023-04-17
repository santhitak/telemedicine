import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SignUpInformation } from "./sign-up";
import { useStore } from "@/lib/store";

interface UserSignIn {
  email: string;
  password: string;
}

interface Props {
  user: SignUpInformation;
  setUser: (user: SignUpInformation) => void;
}

const useUserStore = () => {
  return useStore((store) => ({
    user: store.user,
    setUser: store.setUser,
  }));
};

const SignIn = (props: Props) => {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const [userSignIn, setUserSignIn] = useState<UserSignIn>({
    email: "",
    password: "",
  });
  const [check, setCheck] = useState(false);
  const checkUserSignUp = () => {
    const getInfo = JSON.parse(localStorage.getItem("tele-signup") || "[]");
    for (let i = 0; i < getInfo.length; i++) {
      if (
        userSignIn.email === getInfo[i].email &&
        userSignIn.password === getInfo[i].password
      ) {
        toast.success("Successfully Login");
        localStorage.setItem("user", JSON.stringify(getInfo[i]));
        setUser(getInfo[i]);
        router.push(`/user/${getInfo[i].uuid}`);
        setCheck(true);
      }
    }
    if (check) {
      null;
    } else {
      toast.error("Wrong email or password");
    }
  };

  return (
    <div className="grid grid-cols-12 justify-center pt-40">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="col-start-5 col-end-9 divide-y-2">
        <div className="grid grid-cols-1 gap-2">
          <h4 className="font-semibold text-4xl">Sign In</h4>
          <p className="text-gray-400">
            Make an appointment with your doctors with few clicks
          </p>
        </div>
        <div className="mt-8 pt-2 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring sm:text-sm sm:leading-6 px-2"
                placeholder="Email address"
                onChange={(e) => (userSignIn.email = e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring sm:text-sm sm:leading-6 px-2"
                placeholder="Password"
                onChange={(e) => (userSignIn.password = e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="font-medium">
                Don&apos;t have an account?{" "}
                <Link
                  className=" text-emerald-600 hover:text-emerald-500"
                  href="/sign-up"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={checkUserSignUp}
              className="group relative flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
