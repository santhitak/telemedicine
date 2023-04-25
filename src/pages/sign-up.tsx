import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AppointmentInfo } from "./appointment";

export interface SignUpInformation {
  uuid: string;
  fullname: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  appointment: AppointmentInfo[];
}

const SignUp = () => {
  const router = useRouter();
  const [userSignUpInformation, setUserSignUpInformation] =
    useState<SignUpInformation>({
      uuid: "",
      fullname: "",
      email: "",
      password: "",
      age: 0,
      gender: "",
      appointment: [],
    });
  const handleSignup = async () => {
    if (
      userSignUpInformation.email &&
      userSignUpInformation.fullname &&
      userSignUpInformation.password
    ) {
      await fetch("https://www.uuidgenerator.net/api/version4")
        .then(async (response) => {
          userSignUpInformation.uuid = await response.text();
        })
        .then(() => {
          if (localStorage.getItem("tele-signup")) {
            const tele = JSON.parse(
              localStorage.getItem("tele-signup") || "[]"
            );
            tele.push(userSignUpInformation);
            localStorage.setItem("tele-signup", JSON.stringify(tele));
          } else {
            const user = [userSignUpInformation];
            localStorage.setItem("tele-signup", JSON.stringify(user));
          }
          // localStorage.setItem(
          //   "tele-signup",
          //   JSON.stringify(userSignUpInformation)
          // );
          toast.success("Redirecting");
        })
        .then(() => router.push("/sign-in"));
    } else {
      toast.error("Please complete all fields");
    }
  };

  return (
    <div className="grid grid-cols-12 justify-center pt-40">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="col-start-5 col-end-9 divide-y-2">
        <div className="grid grid-cols-1 gap-2">
          <h4 className="font-semibold text-4xl">Sign Up</h4>
          <p className="text-gray-400">
            Provide your information for future conveniency
          </p>
        </div>
        <div className="mt-8 pt-2 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="fullname" className="sr-only">
                Full Name
              </label>
              <input
                name="fullname"
                type="text"
                autoComplete="name"
                required
                className="relative block w-full rounded-t-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring sm:text-sm sm:leading-6 px-2"
                placeholder="Firstname Surname"
                onChange={(e) =>
                  (userSignUpInformation.fullname = e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring sm:text-sm sm:leading-6 px-2"
                placeholder="Email address"
                onChange={(e) => (userSignUpInformation.email = e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring sm:text-sm sm:leading-6 px-2"
                placeholder="Password"
                onChange={(e) =>
                  (userSignUpInformation.password = e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor="age" className="sr-only">
                Age
              </label>
              <input
                name="age"
                type="number"
                min={1}
                required
                className="relative block w-full border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring sm:text-sm sm:leading-6 px-2"
                placeholder="Age"
                onChange={(e) =>
                  (userSignUpInformation.age = Number(e.target.value))
                }
              />
            </div>
            <div>
              <select
                name="gender"
                id="gender"
                className="relative block w-full rounded-b-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring sm:text-sm sm:leading-6 px-2"
                placeholder="Gender"
                defaultValue="Gender"
                onChange={(e) =>
                  (userSignUpInformation.gender = e.target.value)
                }
              >
                <option value="default">Gender</option>
                <option value="F">Female</option>
                <option value="M">Male</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="font-medium">
                Already have an account?{" "}
                <Link
                  className=" text-emerald-600 hover:text-emerald-500"
                  href="/sign-in"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={handleSignup}
              className="group relative flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
