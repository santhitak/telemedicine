import { SignUpInformation } from "../sign-up";

interface Profile {
  name: string;
  age: number;
  gender: "M" | "F";
  symptom: string;
  appointment: Appointment[];
}

interface Appointment {
  doctor: string;
  date: string;
  time: string;
}

interface Props {
  user: SignUpInformation;
}

const UserProfile = (props: Props) => {
  const { user } = props;
  const UserProfile: Profile = {
    name: "Maeve Freddrick",
    age: 34,
    gender: "F",
    symptom: "Savere diarrhea",
    appointment: [
      {
        doctor: "Ross S. Geller",
        date: "2023-04-20",
        time: "15:30 - 16:00 pm",
      },
      {
        doctor: "Ross S. Geller",
        date: "2023-04-30",
        time: "15:30 - 16:00 pm",
      },
    ],
  };

  return (
    <div className="pt-20 flex justify-center">
      <div className="bg-gray-100 rounded-md w-5/12 min-h-96">
        <div className="p-10 flex gap-4 flex-col">
          <p className="font-semibold">Patient&apos;s Information</p>
          <div>
            <p className="font-semibold">{user.fullname}</p>
            <div className="flex gap-2 font-semibold">
              <p>
                Age <span className="font-normal">{UserProfile.age}</span>
              </p>
              <p>
                Gender{" "}
                <span className="font-normal">
                  {UserProfile.gender === "F" ? "Female" : "Male"}
                </span>
              </p>
            </div>
            <p className="font-semibold">
              Symptom <span className="font-normal">{UserProfile.symptom}</span>
            </p>
          </div>
          <p className="font-semibold">Appointment(s)</p>
          <div>
            {UserProfile.appointment.map((item: Appointment, i: number) => (
              <div
                key={i}
                className="bg-emerald-500/20 border border-emerald-400 rounded-md flex justify-center my-2 text-center"
              >
                <div className="p-4 font-medium">
                  <p>Dr. {item.doctor}</p>
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
