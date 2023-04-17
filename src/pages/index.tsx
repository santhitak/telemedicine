import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[80vh] justify-center items-center">
      <div className="flex gap-6 justify-center flex-col items-center">
        <h2 className="text-6xl font-bold">Meet your doctor at home</h2>
        <h4 className="text-4xl font-semibold items-center gap-4 flex">
          with
          <span className="font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-500">
            Telemedicine
          </span>
        </h4>
        <Link href="/sign-in">
          <button className="font-semibold text-white bg-gray-900 rounded-lg py-3 px-6 mt-4">
            Getting Started
          </button>
        </Link>
      </div>
    </main>
  );
}
