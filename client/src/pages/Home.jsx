import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { api_url } from "../config.json";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const { user } = useContext(UserContext);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch(`${api_url}/restaurants`)
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then(setRestaurants)
      .catch((err) => {
        console.error("Failed to fetch restaurants:", err);
        toast.error("Unable to load restaurants");
      });
  }, []);

  if (user) {
    return (
      <div
        className="relative min-h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/restaurant2.jpg')" }}
      >
        <div className="absolute inset-0 flex flex-col items-center px-4 py-10 bg-black/30 backdrop-blur-sm">
          <h1 className="text-white text-5xl md:text-7xl font-bold font-mono tracking-wide text-center drop-shadow-md mb-6">
            ChronoBites
          </h1>
          <p className="text-white text-lg md:text-2xl text-center font-light font-mono max-w-2xl mb-10">
            Seamless restaurant reservations, redefined.
          </p>

          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white/20 border border-white/30 rounded-xl p-4 backdrop-blur-sm shadow-md hover:shadow-lg transition"
              >
                <Link to={`/restaurants/${restaurant.id}`}>
                  <h2 className="text-xl font-semibold text-white mb-2">{restaurant.name}</h2>
                  <p className="text-white/90 text-sm">{restaurant.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/restaurant.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-6 backdrop-blur-sm text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white font-serif drop-shadow-xl mb-6">
          Welcome to ChronoBites
        </h1>
        <p className="text-xl md:text-2xl text-white max-w-2xl leading-relaxed font-light drop-shadow">
          Discover unforgettable dining experiences. Whether you're craving a casual lunch,
          a romantic dinner, or a family feast—ChronoBites connects you with the perfect table, effortlessly.
        </p>
        <a
          href="/signup"
          className="mt-8 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
