import { Mail, Phone, MapPin, Leaf } from "lucide-react";

const SocialIcon = ({ path, viewBox = "0 0 24 24" }) => (
  <svg
    viewBox={viewBox}
    fill="currentColor"
    className="w-5 h-5 transition-transform group-hover:scale-110"
  >
    <path d={path} />
  </svg>
);

const FB_PATH =
  "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z";
const TW_PATH =
  "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z";
const IG_PATH =
  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z";
const LI_PATH =
  "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary-600 p-2.5 rounded-2xl text-white shadow-lg shadow-primary-900/20">
                <Leaf size={24} fill="currentColor" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                FreshFarm <span className="text-primary-500">Hub</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-medium">
              Connecting local farmers directly to your kitchen. Fresh, organic,
              and harvested just hours before delivery. Join the movement for 
              sustainable agriculture.
            </p>
            <div className="flex gap-4">
              {[
                { path: FB_PATH, link: "#", label: "Facebook" },
                { path: TW_PATH, link: "#", label: "Twitter" },
                { path: IG_PATH, link: "#", label: "Instagram" },
                { path: LI_PATH, link: "#", label: "LinkedIn" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  className="p-2.5 bg-gray-900 rounded-xl text-gray-400 hover:text-primary-500 hover:bg-gray-800 transition-all border border-gray-800 hover:border-primary-500/50"
                  title={item.label}
                >
                  <SocialIcon path={item.path} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-8 text-lg">Explore Hub</h4>
            <ul className="flex flex-col gap-4 text-sm font-semibold">
              <li>
                <a href="/products" className="hover:text-primary-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Products
                </a>
              </li>
              <li>
                <a href="/farmers" className="hover:text-primary-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Farmers Map
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Bulk Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Farm Visits
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-bold text-white mb-8 text-lg">Support</h4>
            <ul className="flex flex-col gap-4 text-sm font-semibold">
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-8 text-lg">Get in Touch</h4>
            <div className="flex flex-col gap-6 text-sm font-semibold">
              <div className="flex items-start gap-4 group">
                <div className="p-2.5 bg-gray-900 rounded-xl text-primary-500 border border-gray-800">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-white group-hover:text-primary-500 transition-colors">hello@freshfarm.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="p-2.5 bg-gray-900 rounded-xl text-primary-500 border border-gray-800">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Call Us</p>
                  <p className="text-white group-hover:text-primary-500 transition-colors">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="p-2.5 bg-gray-900 rounded-xl text-primary-500 border border-gray-800">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Visit Us</p>
                  <p className="text-white group-hover:text-primary-500 transition-colors leading-relaxed">Green Valley, Village<br/>Pincode 560001</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-xs text-gray-400 font-medium italic text-center">
            © 2026 FreshFarm Hub. Locally grown with love by Anirudha & Ankita.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
