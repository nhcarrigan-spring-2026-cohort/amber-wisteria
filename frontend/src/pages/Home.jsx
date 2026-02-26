import { useNavigate } from "react-router";
import Navbar from "../components/dashboard/Navbar";
import heroImg from "../assets/hero-pizza.jpg";
import heroWine from "../assets/hero-wine.jpg";

export default function Home() {
  const navigate = useNavigate();

  function scrollToInfo() {
    const el = document.getElementById("info-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="w-full min-h-screen bg-[#fff7e0] font-[Karla]">
      
      <Navbar
        variant="landing"
        hideIcons
        showCTA
        onCTAClick={() => navigate("/create-meal-train")}
      />

      <section className="relative max-w-7xl mx-auto px-6 py-28 flex flex-col md:flex-row items-center gap-20">

        <div className="flex-1 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-[-0.02em] text-[#2d2d2d] text-left">
            Support Your Community <br /> With Meal Trains
          </h1>

          <p className="mt-6 text-[18px] leading-relaxed text-[#555] max-w-lg text-left">
            Help your community when they are in need by joining our meal train website.
            Whether it is providing a meal train for a new parent, a sick friend,
            or someone going through tough times, you can make real difference.
            Create or join meal trains with only a few clicks.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/create-meal-train")}
              className="bg-[#f68300] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:brightness-95 transition"
            >
              Start a meal train
            </button>

            <button
              onClick={scrollToInfo}
              className="bg-white border border-black px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition"
            >
              Learn more
            </button>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center items-center">

          <img
            src={heroWine}
            alt="People sharing a meal"
            className="w-[250px] shadow-xl relative z-10"
          />

          <img
            src={heroImg}
            alt="Wine dinner"
            className="w-[350px] absolute -bottom-10 -right-10 shadow-xl z-20"
          />

        </div>
      </section>

      <section
        id="info-section"
        className="max-w-5xl mx-auto px-6 py-24 text-center"
      >
        <h2 className="text-3xl font-bold text-[#2d2d2d] mb-6">
          What is a Meal Train?
        </h2>

        <p className="text-lg text-[#4c4c4c] max-w-3xl mx-auto leading-relaxed">
          A meal train is a simple way to support someone going through a challenging time.
          Friends, family, and community members sign up to bring meals on different days,
          ensuring the person in need receives consistent support without stress.
        </p>
      </section>

    </div>
  );
}