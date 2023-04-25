import { RiStethoscopeFill } from "react-icons/ri";
import { AiFillSchedule } from "react-icons/ai";
import { MdOutlineVideoCall } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import { FiArrowRightCircle } from "react-icons/fi";
import { RadioGroup } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import { useStore } from "@/lib/store";
import { SignUpInformation } from "./sign-up";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

interface RadioChoice {
  title: string;
  icon: React.ReactElement;
}

const appointmentChoice: RadioChoice[] = [
  {
    title: "Doctor Appointment",
    icon: <RiStethoscopeFill className="w-6 h-6" />,
  },
  {
    title: "Tele-Consulation",
    icon: <MdOutlineVideoCall className="w-6 h-6" />,
  },
  {
    title: "Health Check-up",
    icon: <AiFillSchedule className="w-6 h-6" />,
  },
  {
    title: "Doctor Visitation",
    icon: <GiHealthNormal className="w-6 h-6" />,
  },
];

export interface AppointmentInfo {
  purpose: string;
  date: string;
  time: string;
  doctor: string;
  symptom: string;
}
const useUserStore = () => {
  return useStore((store) => ({
    user: store.user,
    setUser: store.setUser,
  }));
};

const Appointment = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [con, setCon] = useState(false);
  const [selected, setSelected] = useState<RadioChoice>(appointmentChoice[0]);
  const [appointmentInfo, setAppointmentInfo] = useState<AppointmentInfo>({
    purpose: "",
    date: "",
    time: "",
    doctor: "",
    symptom: "",
  });

  const { user, setUser } = useUserStore();
  useEffect(() => checkUserSignIn());

  const checkUserSignIn = () => {
    const dataTele = localStorage.getItem("tele-signup") || "[]";
    const dataTeleResponse = JSON.parse(dataTele);
    setData(dataTeleResponse);

    const getInfo = localStorage.getItem("user") || "{}";
    const response: SignUpInformation = JSON.parse(getInfo);
    setUser(response);
  };

  const handleSubmit = () => {
    appointmentInfo.purpose = selected.title;

    for (let i = 0; i < data.length; i++) {
      if (data[i].email === user?.email) {
        data[i].appointment.push(appointmentInfo);
        localStorage.setItem("tele-signup", JSON.stringify(data));
        if (user) {
          user.appointment.push(appointmentInfo);
        }
        localStorage.setItem("user", JSON.stringify(user));
      }
      toast.success("Successfully made an appointment");
      router.push(`/user/${data[i].uuid}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-500">
        Make an appointment
      </p>
      <div className="flex flex-col gap-10">
        <RadioGroup value={selected} onChange={setSelected}>
          <div className="grid grid-cols-2 gap-6 pt-6">
            {appointmentChoice.map((item: RadioChoice, i: number) => (
              <RadioGroup.Option
                key={i}
                value={item}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-emerald-300/50"
                      : ""
                  }
                  ${
                    checked
                      ? "bg-emerald-700 border-2 border-emerald-400/50 bg-opacity-75 text-white"
                      : "bg-white border-2 border-transparent"
                  }
                    relative flex cursor-pointer rounded-lg px-10 py-8 shadow-md focus:outline-none w-80`
                }
              >
                {({ checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium  ${
                            checked ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.title}
                        </RadioGroup.Label>
                      </div>
                      <div>{item.icon}</div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        <div className="flex justify-start flex-col gap-3">
          <div>
            <h2 className="font-semibold leading-7 text-gray-900">
              Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be send to your doctor so be careful what
              you share.
            </p>
          </div>

          <div className="w-full flex gap-4">
            <div className="w-full">
              <p className="font-medium text-gray-900">Appointment date</p>
              <input
                type="date"
                className="my-2 w-full block flex-1 border rounded-md bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                onChange={(e) => (appointmentInfo.date = e.target.value)}
              />
            </div>
            <div className="w-full">
              <p className="font-medium text-gray-900">Appointment time</p>
              <input
                type="time"
                className="my-2 w-full block flex-1 border rounded-md bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                onChange={(e) => (appointmentInfo.time = e.target.value)}
              />
            </div>
          </div>

          <div className="w-full">
            <p className="font-medium text-gray-900">Choose doctor</p>
            <select
              name="doctor"
              id="doctor"
              className="relative block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring sm:text-sm sm:leading-6 px-2 mt-2"
              placeholder="Let us choose your doctor"
              defaultValue="Let us choose your doctor"
              onChange={(e) => (appointmentInfo.doctor = e.target.value)}
            >
              <option value="">Choose your doctor</option>
              <option value="Zedric Diggory">Zedric Diggory</option>
              <option value="Lupin Sonata">Lupin Sonata</option>
              <option value="Carlitos Ragnvaldr">Carlitos Ragnvaldr</option>
              <option value="Ivan Micheline">Ivan Micheline</option>
              <option value="Marco Berto">Marco Berto</option>
              <option value="Veremund Maurice">Veremund Maurice</option>
              <option value="Kåre Alcibiades">Kåre Alcibiades</option>
            </select>
          </div>

          <div className="w-full">
            <p className="font-medium text-gray-900">Symptoms</p>
            <textarea
              className="my-2 w-full block flex-1 border rounded-md bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              rows={5}
              onChange={(e) => (appointmentInfo.symptom = e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        className="bg-emerald-600/80 text-white px-6 py-2 rounded-md font-semibold flex gap-2 items-center my-2"
        onClick={handleSubmit}
      >
        <p>Submit</p>
        <FiArrowRightCircle />
      </button>
    </div>
  );
};

export default Appointment;
