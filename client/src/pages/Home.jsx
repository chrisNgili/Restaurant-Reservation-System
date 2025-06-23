export default function Home() {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/restaurant2.jpg')" }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 bg-black/10 backdrop-blur-[1px]">
        <h1 className="text-white text-5xl md:text-7xl font-bold font-mono tracking-wide text-center drop-shadow-md">
          ChronoBites
        </h1>
        <p className="text-white text-lg md:text-2xl mt-4 text-center font-light font-mono max-w-2xl">
          Seamless restaurant reservations, redefined.
        </p>

        <div className="flex flex-wrap gap-4 mt-6">
          <button className="bg-white/20 text-white font-semibold px-5 py-2 rounded-md border border-white/30 backdrop-blur-md hover:bg-white/30 transition">
            Daily Menu
          </button>
          <button className="bg-white/20 text-white font-semibold px-5 py-2 rounded-md border border-white/30 backdrop-blur-md hover:bg-white/30 transition">
            Family Meals
          </button>
          <button className="bg-white/20 text-white font-semibold px-5 py-2 rounded-md border border-white/30 backdrop-blur-md hover:bg-white/30 transition">
            Meal Prep
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mt-10 justify-center">
          <input
            type="date"
            className="bg-white/20 text-white placeholder-white font-mono px-4 py-2 rounded-md border border-white/30 backdrop-blur-md focus:outline-none"
          />
          <input
            type="time"
            className="bg-white/20 text-white placeholder-white font-mono px-4 py-2 rounded-md border border-white/30 backdrop-blur-md focus:outline-none"
          />
          <input
            type="text"
            placeholder="Party Size"
            className="bg-white/20 text-white placeholder-white font-mono px-4 py-2 rounded-md border border-white/30 backdrop-blur-md focus:outline-none"
          />
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded-md transition">
            Reserve Table
          </button>
        </div>
      </div>
    </div>
  );
}
