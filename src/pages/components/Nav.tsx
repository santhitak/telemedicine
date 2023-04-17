interface Props {
  slot: React.ReactElement;
}

import Link from "next/link";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useStore } from "@/lib/store";

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-28 py-20">
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between items-center">
          <Link href="/">
            <p className="font-medium text-lg">Telemedicine</p>
          </Link>
          {user?.email === "" && (
            <Link href="/sign-in" className="flex gap-2 items-center">
              <p className="font-medium text-lg">Sign in</p>
              <IoArrowForwardCircleOutline className="w-6 h-6" />
            </Link>
          )}
          {user?.email !== "" && (
            <div className="flex gap-4">
              <Link
                href={`/user/${user?.uuid}`}
                className="flex gap-2 items-center"
              >
                <p className="font-medium text-lg">{user?.fullname}</p>
              </Link>
              <button
                onClick={handleSignout}
                className="py-1 px-4 rounded-md border border-gray-800 hover:bg-gray-800 transition-all ease-in-out hover:text-white"
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
