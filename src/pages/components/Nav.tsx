interface Props {
  slot: React.ReactElement;
}

import Link from "next/link";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const Nav = (props: Props) => {
  const { slot } = props;
  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-28 py-20">
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between items-center">
          <Link href="/">
            <p className="font-medium text-lg">Telemedicine</p>
          </Link>
          <Link href="/sign-in" className="flex gap-2 items-center">
            <p className="font-medium text-lg">Sign in</p>
            <IoArrowForwardCircleOutline className="w-6 h-6" />
          </Link>
        </div>
        {slot}
      </div>
    </div>
  );
};

export default Nav;
