import React from "react";
import {
  ShoppingBag,
  MapPin,
  Truck,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden bg-primary-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=2070&auto=format&fit=crop"
            alt="Farm"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 px-4 py-2 rounded-full text-primary-400 text-sm font-bold">
              <Truck size={16} /> Direct from Farm to Table
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white leading-tight">
              Freshness <br />{" "}
              <span className="text-primary-500">You Can Trace</span>
            </h1>
            <p className="text-xl text-gray-300 font-medium max-w-lg">
              Skip the middlemen. Support local farmers and get the freshest
              vegetables and fruits harvested just hours ago.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/products"
                className="btn btn-primary px-8 py-4 text-lg"
              >
                Buy Fresh Produce <ChevronRight className="ml-2" />
              </Link>
              <Link
                to="/register?role=farmer"
                className="btn bg-white/10 text-white hover:bg-white/20 px-8 py-4 text-lg backdrop-blur-sm"
              >
                Sell as Farmer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-10 rounded-3xl shadow-xl shadow-primary-900/5 -mt-20 relative z-20 border border-gray-100">
          <div className="flex items-center gap-5">
            <div className="bg-primary-100 p-4 rounded-2xl text-primary-600">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">100% Quality</h3>
              <p className="text-sm text-gray-500">Handpicked by farmers</p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-x border-gray-100 px-8">
            <div className="bg-secondary-100 p-4 rounded-2xl text-secondary-600">
              <MapPin size={32} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Local Only</h3>
              <p className="text-sm text-gray-500">Sourced within 50km</p>
            </div>
          </div>
          <div className="flex items-center gap-5 lg:pl-8">
            <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">
              <ShoppingBag size={32} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Fair Price</h3>
              <p className="text-sm text-gray-500">Farmers keep 100% profit</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black text-gray-900">
              Shop by Category
            </h2>
            <p className="text-gray-500 font-medium mt-2">
              What are you looking for today?
            </p>
          </div>
          <Link
            to="/products"
            className="text-primary-600 font-bold flex items-center gap-1 group"
          >
            Browse All{" "}
            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Category Column 1 */}
          <Link
            to="/products?category=vegetables"
            className="group relative h-80 rounded-3xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1540331547168-8b63109225b7?q=80&w=2070&auto=format&fit=crop"
              alt="Vegetables"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <h3 className="text-3xl font-black text-white">
                Fresh Vegetables
              </h3>
              <p className="text-white/80 font-medium">
                Daily harvested greens & more
              </p>
            </div>
          </Link>

          {/* Category Column 2 */}
          <Link
            to="/products?category=fruits"
            className="group relative h-80 rounded-3xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=2070&auto=format&fit=crop"
              alt="Fruits"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <h3 className="text-3xl font-black text-white">Fresh Fruits</h3>
              <p className="text-white/80 font-medium">
                Seasonal delights from orchard
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Founders Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-gray-100">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-black text-gray-900 leading-tight">
            The Hearts Behind FreshFarm Hub
          </h2>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
            A vision sparked in the fields, brought to your screen by Anirudha
            and Ankita. Dedicated to empowering local agriculture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {[
            {
              name: "Ankita",
              role: "Co-Founder & Product Strategy",
              bio: "Deeply passionate about organic farming and sustainable food chains. Shiba ensures the platform meets the highest standards for both farmers and customers.",
              image:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
            },
            {
              name: "Anirudha",
              role: "Co-Founder & Lead Architect",
              bio: "A technology veteran dedicated to building local connections through code. Dharma focus is on creating a seamless, transparent experience for everyone.",
              image:
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
            },
          ].map((founder, i) => (
            <div
              key={i}
              className="group relative bg-white p-8 rounded-3xl shadow-xl shadow-primary-900/5 hover:shadow-primary-900/10 transition-all border border-gray-50"
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-600 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform opacity-10"></div>
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-32 h-32 rounded-2xl object-cover relative z-10"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-gray-900">
                    {founder.name}
                  </h3>
                  <p className="text-primary-600 font-bold text-sm tracking-widest uppercase">
                    {founder.role}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed pt-2 italic line-clamp-3">
                    "{founder.bio}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
