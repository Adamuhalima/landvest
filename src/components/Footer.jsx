import { Building2, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Properties', to: '/properties' },
    { label: 'Invest', to: '/invest' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const resources = [
    'Property Insights',
    'Investor Guide',
    'Market Trends',
    'Legal Support',
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-24 py-14">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
                <Building2 size={22} />
              </span>
              <div>
                <p className="text-xl font-semibold tracking-wide">LandVest</p>
                <p className="text-sm text-slate-400">Real estate investment made accessible</p>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-slate-400">
              Invest in high-potential properties across Cameroon with a trusted platform
              built for secure, transparent, and rewarding wealth creation.
            </p>

            <div className="grid gap-3 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-emerald-400" />
                <span>Douala, Cameroon</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-emerald-400" />
                <span>+237 6XX XXX XXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-emerald-400" />
                <span>hello@landvest.cm</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate-400 transition-colors duration-200 hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Resources</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              {resources.map((resource) => (
                <li key={resource} className="transition-colors duration-200 hover:text-emerald-400">
                  {resource}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-base font-semibold text-white">Stay Updated</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Get the latest property opportunities, investment news, and market insights from LandVest.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-400"
              />
              <button
                type="button"
                className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 LandVest. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="transition-colors hover:text-emerald-400">Privacy Policy</span>
            <span className="transition-colors hover:text-emerald-400">Terms of Service</span>
            <span className="transition-colors hover:text-emerald-400">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
