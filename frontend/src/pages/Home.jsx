import { useNavigate } from 'react-router';
import Navbar from '../components/dashboard/Navbar';
import heroImg from '../assets/hero-pizza.jpg';
import heroWine from '../assets/hero-wine.jpg';

export default function Home() {
  const navigate = useNavigate();

  function scrollToInfo() {
    const el = document.getElementById('info-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="w-full min-h-screen bg-[#fff7e0] font-[Karla]">
      <Navbar
        variant="landing"
        hideIcons
        showCTA
        onCTAClick={() => navigate('/create-meal-train')}
      />

      <section className="relative min-h-screen max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-20">
        <div className="flex-1 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-[-0.02em] text-[#2d2d2d] text-left">
            Support Your Community <br /> With Meal Trains
          </h1>

          <p className="mt-6 text-[18px] leading-relaxed text-[#555] max-w-lg text-left">
            Help your community when they are in need by joining our meal train website. Whether it
            is providing a meal train for a new parent, a sick friend, or someone going through
            tough times, you can make real difference. Create or join meal trains with only a few
            clicks.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate('/create-meal-train')}
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
        className="relative min-h-screen bg-[#fff7e0] flex items-center justify-center overflow-hidden"
      >
        <div
          className="  px-8 md:px-16 py-16 
                        max-w-6xl w-full mx-6 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-6">
            How a Meal Train Works
          </h2>

          <p className="text-lg text-[#555] max-w-2xl mx-auto mb-16 leading-relaxed">
            A meal train makes it easy to organize support for someone in need. In just a few simple
            steps, friends and family can coordinate meals and show up when it matters most.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-[#FFECC899] rounded-4xl shadow-xl p-8
                            border border-[#e7d5b5] shadow-sm 
                            hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold mb-3 text-[#2d2d2d]">Create a Train</h3>
              <p className="text-[#555] leading-relaxed">
                Set up a meal train in minutes. Choose dates, add details, and invite friends and
                family to participate.
              </p>
            </div>

            <div
              className="bg-[#FFECC899] rounded-4xl shadow-xl p-8
                            border border-[#e7d5b5] shadow-sm 
                            hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-3 text-[#2d2d2d]">Sign Up</h3>
              <p className="text-[#555] leading-relaxed">
                Participants pick a date that works for them and see what others are bringing to
                avoid duplicates.
              </p>
            </div>

            <div
              className="bg-[#FFECC899] rounded-4xl shadow-xl p-8
                            border border-[#e7d5b5] shadow-sm 
                            hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-3 text-[#2d2d2d]">Deliver Support</h3>
              <p className="text-[#555] leading-relaxed">
                Meals are delivered with love, providing practical help and emotional support during
                challenging times.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <button
              onClick={() => navigate('/create-meal-train')}
              className="bg-[#f68300] text-white px-8 py-4 rounded-full 
                        font-semibold text-lg shadow-md 
                        hover:brightness-95 transition"
            >
              Start Supporting Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
