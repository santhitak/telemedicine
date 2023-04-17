interface Props {
  slot: React.ReactElement;
}

import Link from "next/link";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { SignUpInformation } from "../sign-up";

const useUserStore = () => {
  return useStore((store) => ({
    user: store.user,
    setUser: store.setUser,
  }));
};

const Nav = (props: Props) => {
  const router = useRouter();
  const { slot } = props;
  const { user, setUser } = useUserStore();

  const handleSignout = () => {
    setUser(null);
    router.push("/");
  };

  useEffect(() => checkUserSignUp(), []);

  const checkUserSignUp = () => {
    const getInfo = localStorage.getItem("tele-signup");
    const response: SignUpInformation = JSON.parse(getInfo || "{}");
    setUser(response);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-28 py-12">
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between items-center">
          <Link href="/">
            <p className="font-medium text-lg">Telemedicine</p>
          </Link>
          {!user && (
            <Link href="/sign-in" className="flex gap-2 items-center">
              <p className="font-medium text-lg">Sign in</p>
              <IoArrowForwardCircleOutline className="w-6 h-6" />
            </Link>
          )}
          {user && (
            <div className="flex gap-4">
              <Link
                href={`/user/${user?.uuid}`}
                className="flex gap-2 items-center"
              >
                <p className="font-medium text-lg">{user?.fullname}</p>
              </Link>
              <button
                onClick={handleSignout}
                className="py-1 px-4 rounded-md text-gray-500 text-sm font-medium bg-gray-200 hover:bg-gray-800 transition-all ease-in-out hover:text-white"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
        {slot}
      </div>
    </div>
  );
};

export default Nav;
