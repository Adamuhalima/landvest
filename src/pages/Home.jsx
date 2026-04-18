import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Shield, 
  Users, 
  Home, 
  Building, 
  Wallet,
  ChevronRight,
  ArrowUpRight,
  MapPin,
  DollarSign,
  BarChart3,
  CheckCircle,
  Star,
  Target,
  Clock,
  Calendar,
  Phone,
  Mail,
  Award
} from 'lucide-react';
import '../styles/design-system.css';
import '../styles/Home.css';

const HomePage = () => {
  const [investmentAmount, setInvestmentAmount] = useState(500);
  const [counts, setCounts] = useState({
    investors: 0,
    properties: 0,
    cities: 0,
    returns: 0
  });

  // Animated counters
  useEffect(() => {
    const targets = {
      investors: 15000,
      properties: 234,
      cities: 12,
      returns: 8.2
    };

    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        investors: Math.floor(progress * targets.investors),
        properties: Math.floor(progress * targets.properties),
        cities: Math.floor(progress * targets.cities),
        returns: (progress * targets.returns).toFixed(1)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const featuredProperties = [
    {
      id: 1,
      title: 'Luxury Downtown Lofts',
      location: 'Douala',
      price: '120,000,000 FCFA',
      investors: 234,
      progress: 78,
      roi: 8.4,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500'
    },
    {
      id: 2,
      title: 'Waterfront Villas',
      location: 'Kribi',
      price: '85,000,000 FCFA',
      investors: 156,
      progress: 45,
      roi: 9.2,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500'
    },
    {
      id: 3,
      title: 'Modern Apartments',
      location: 'Yaoundé',
      price: '45,000,000 FCFA',
      investors: 89,
      progress: 62,
      roi: 7.8,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content animate-fade-in">
              <div className="hero-badge">
                <Shield size={18} />
                <span>SEC Registered • 15,000+ Investors</span>
              </div>
              
              <h1 className="hero-title">
                Own Prime Real Estate in Cameroon
                <span className="hero-highlight">Start From 100,000 FCFA</span>
              </h1>
              
              <p className="hero-description">
                Join thousands of Cameroonians building wealth through property investment. 
                No huge down payments. No management headaches. Just passive income.
              </p>

              {/* Stats */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">{counts.investors.toLocaleString()}+</div>
                  <div className="stat-label">Investors</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{counts.properties}</div>
                  <div className="stat-label">Properties</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{counts.cities}</div>
                  <div className="stat-label">Cities</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{counts.returns}%</div>
                  <div className="stat-label">Avg Return</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="hero-cta">
                <Link to="/invest" className="btn btn-primary btn-large">
                  Start Investing
                  <ArrowUpRight size={20} />
                </Link>
                <Link to="/properties" className="btn btn-outline btn-large">
                  Browse Properties
                  <ChevronRight size={20} />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="trust-badges">
                <span className="trust-badge">
                  <CheckCircle size={16} />
                  Title Deeds Guaranteed
                </span>
                <span className="trust-badge">
                  <CheckCircle size={16} />
                  Legal Protection
                </span>
                <span className="trust-badge">
                  <CheckCircle size={16} />
                  Expert Management
                </span>
              </div>
            </div>

            {/* Featured Property Card */}
            <div className="hero-featured animate-fade-in">
              <div className="featured-card">
                <div className="featured-image">
                  <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500" alt="Featured Property" />
                  <span className="badge badge-trending">Hot Investment</span>
                  <div className="featured-progress">
                    <div className="progress-header">
                      <span>Funding Progress</span>
                      <span className="progress-percent">78%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="featured-details">
                  <h3>Luxury Villa - Court Yard</h3>
                  <div className="featured-location">
                    <MapPin size={16} />
                    <span>Wum, Cameroon</span>
                  </div>
                  <div className="featured-meta">
                    <div className="meta-item">
                      <DollarSign size={16} />
                      <span>120M FCFA</span>
                    </div>
                    <div className="meta-item">
                      <TrendingUp size={16} />
                      <span>8.4% ROI</span>
                    </div>
                    <div className="meta-item">
                      <Users size={16} />
                      <span>234 investors</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Target size={18} />
              Simple Process
            </div>
            <h2 className="section-title">Start in 3 Easy Steps</h2>
            <p className="section-subtitle">
              We've made real estate investment accessible to everyone
            </p>
          </div>

          <div className="steps-grid">
            {[
              {
                icon: Wallet,
                title: 'Sign Up',
                description: 'Create your account in minutes. No credit check required.',
                features: ['Free account', 'Instant verification', 'Secure platform']
              },
              {
                icon: Building,
                title: 'Choose Property',
                description: 'Browse our vetted properties across Cameroon.',
                features: ['Professional vetting', 'Detailed analysis', 'Market data']
              },
              {
                icon: TrendingUp,
                title: 'Earn Monthly',
                description: 'Receive rental income directly to your bank account.',
                features: ['Monthly payouts', 'Real-time tracking', 'Tax documents']
              }
            ].map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{index + 1}</div>
                <div className="step-icon">
                  <step.icon size={32} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <ul className="step-features">
                  {step.features.map((feature, i) => (
                    <li key={i}>
                      <CheckCircle size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-properties">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Building size={18} />
              Featured Properties
            </div>
            <h2 className="section-title">Popular Investments</h2>
            <p className="section-subtitle">
              Hand-picked properties with high growth potential
            </p>
          </div>

          <div className="properties-grid">
            {featuredProperties.map(property => (
              <div key={property.id} className="property-card">
                <div className="property-image">
                  <img src={property.image} alt={property.title} />
                  <span className="badge badge-primary">Featured</span>
                </div>
                <div className="property-content">
                  <h4>{property.title}</h4>
                  <div className="property-location">
                    <MapPin size={14} />
                    <span>{property.location}</span>
                  </div>
                  <div className="property-price">
                    <DollarSign size={16} />
                    <span className="price">{property.price}</span>
                  </div>
                  <div className="property-progress">
                    <div className="progress-header">
                      <span>Funded</span>
                      <span>{property.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${property.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="property-footer">
                    <div className="investor-count">
                      <Users size={14} />
                      <span>{property.investors} investors</span>
                    </div>
                    <span className="roi-badge">{property.roi}% ROI</span>
                  </div>
                  <Link to={`/property/${property.id}`} className="btn btn-outline btn-small">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="section-footer">
            <Link to="/properties" className="btn btn-primary">
              View All Properties
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Users size={18} />
              Testimonials
            </div>
            <h2 className="section-title">What Our Investors Say</h2>
            <p className="section-subtitle">
              Real stories from real people building wealth
            </p>
          </div>

          <div className="testimonials-grid">
            {[
              {
                name: 'Adamu Mouminih',
                role: 'First-time Investor',
                content: 'I started with just 500,000 FCFA. Now I own shares in 3 properties and earn monthly passive income.',
                investment: '500k FCFA',
                earnings: '2.3M FCFA',
                rating: 5
              },
              {
                name: 'Christine Ndi',
                role: 'Retired Teacher',
                content: 'Perfect way to diversify my retirement savings. Much better returns than traditional investments.',
                investment: '5M FCFA',
                earnings: '12.5M FCFA',
                rating: 5
              },
              {
                name: 'Shantal Biya',
                role: 'Business Owner',
                content: 'The platform is transparent and professional. I love being able to track my investments in real-time.',
                investment: '2M FCFA',
                earnings: '4.8M FCFA',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < testimonial.rating ? '#f59e0b' : 'none'} color={i < testimonial.rating ? '#f59e0b' : '#d1d5db'} />
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-stats">
                  <div>
                    <span>Invested</span>
                    <strong>{testimonial.investment}</strong>
                  </div>
                  <div>
                    <span>Earned</span>
                    <strong className="text-success">{testimonial.earnings}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Investment Journey?</h2>
            <p>Join 15,000+ Cameroonians already earning passive income through real estate</p>
            <div className="cta-buttons">
              <Link to="/invest" className="btn btn-light btn-large">
                Get Started Today
                <ArrowUpRight size={20} />
              </Link>
              <Link to="/contact" className="btn btn-outline btn-large">
                Talk to an Advisor
                <Phone size={20} />
              </Link>
            </div>
            <p className="cta-note">No minimum. No commitment. Cancel anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;