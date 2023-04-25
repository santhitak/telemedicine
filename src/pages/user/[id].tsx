import { useStore } from "@/lib/store";
import Link from "next/link";
import { useEffect } from "react";

interface Profile {
  name: string;
  age: number;
  gender: string;
  appointment: Appointment[];
}

interface Appointment {
  doctor: string;
  symptom: string;
  date: string;
  time: string;
}

const useUserStore = () => {
  return useStore((store) => ({
    user: store.user,
    setUser: store.setUser,
  }));
};

const UserProfile = () => {
  const { user, setUser } = useUserStore();
  useEffect(() => checkUserSignIn());
  const checkUserSignIn = () => {
    const getInfo = JSON.parse(localStorage.getItem("user") || "null");
    setUser(getInfo);
  };

  let UserProfileInfo: Profile = {
    name: "",
    age: 0,
    gender: "",
    appointment: [],
  };

  if (user) {
    UserProfileInfo = {
      name: user.fullname,
      age: 34,
      gender: user.gender,
      appointment: user.appointment,
    };
  }

  return (
    <div className="pt-20 flex flex-col items-center justify-center">
      <Link href="/appointment">
        <button className="mb-6 py-2 px-14 font-semibold text-white rounded-md bg-emerald-600 ">
          Make new appointment
        </button>
      </Link>
      <div className="bg-gray-100 rounded-md w-5/12 min-h-96">
        <div className="p-10 flex gap-4 flex-col">
          <p className="font-semibold">Patient&apos;s Information</p>
          <div>
            <p className="font-semibold">{user?.fullname}</p>
            <div className="flex gap-2 font-semibold">
              <p>
                Age <span className="font-normal">{user?.age}</span>
              </p>
              <p>
                Gender{" "}
                <span className="font-normal">
                  {user?.gender === "F" ? "Female" : "Male"}
                </span>
              </p>
            </div>
          </div>
          <p className="font-semibold">Appointment(s)</p>
          <div>
            {UserProfileInfo.appointment.map((item: Appointment, i: number) => (
              <div
                key={i}
                className="bg-emerald-500/20 border border-emerald-400 rounded-md flex justify-center my-2 text-center"
              >
                <div className="p-4 font-medium">
                  <p>Dr. {item.doctor}</p>
                  <p className="font-semibold">{item.symptom}</p>
                  <p>Time {item.time}</p>
                  <p>On {item.date}</p>
                  <button className="mt-4 py-1 px-6 rounded-md bg-emerald-500/30 text-emerald-700">
                    Start Meeting
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
