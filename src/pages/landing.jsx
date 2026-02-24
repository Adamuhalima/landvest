import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ChevronRight,
  Shield,
  TrendingUp,
  Users,
  Home,
  Building2,
  Wallet,
  Star,
  CheckCircle,
  MapPin,
  DollarSign,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  X,
  Menu,
  Award,
  BarChart3,
  Clock,
  Phone,
  PlayCircle,
  Sparkles,
  Target,
  Globe2,
  Briefcase,
  Percent
} from 'lucide-react';
import '../styles/design-system.css';
 import '../styles/landing.css'

const Landingpage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();

  // Mock login function
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowLoginModal(false);
      // Redirect to homepage after successful login
      navigate('/home');
    }, 1500);
  };

  // Mock signup function
  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSignupModal(false);
      // Redirect to homepage after successful signup
      navigate('/home');
    }, 1500);
  };

  // Quick login demo
  const quickLogin = () => {
    setLoginEmail('demo@landvest.cm');
    setLoginPassword('password123');
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">Land<span>Vest</span></span>
          </div>

          {/* Desktop Menu */}
          <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#properties">Properties</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="nav-auth">
            <button 
              className="auth-btn login"
              onClick={() => setShowLoginModal(true)}
            >
              <LogIn size={18} />
              Log In
            </button>
            <button 
              className="auth-btn signup"
              onClick={() => setShowSignupModal(true)}
            >
              <UserPlus size={18} />
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content animate-fade-in">
              <div className="hero-badge">
                <Sparkles size={18} />
                <span>Real Estate Investment Made Simple</span>
              </div>
              
              <h1 className="hero-title">
                Invest in Cameroon's
                <span className="hero-highlight">Most Promising Real Estate</span>
              </h1>
              
              <p className="hero-description">
                Join thousands of Cameroonians building wealth through property investment. 
                Start with as little as 50,000 FCFA and earn monthly passive income.
              </p>

              {/* CTA Buttons */}
              <div className="hero-cta">
                <button 
                  className="btn btn-primary btn-large"
                  onClick={() => setShowSignupModal(true)}
                >
                  Get Started Now
                  <ArrowRight size={20} />
                </button>
                <button 
                  className="btn btn-outline btn-large"
                  onClick={() => {
                    quickLogin();
                    setShowLoginModal(true);
                  }}
                >
                  Try Demo
                  <PlayCircle size={20} />
                </button>
              </div>

              {/* Stats */}
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-value">15,000+</span>
                  <span className="stat-label">Active Investors</span>
                </div>
                <div className="stat">
                  <span className="stat-value">234</span>
                  <span className="stat-label">Properties Funded</span>
                </div>
                <div className="stat">
                  <span className="stat-value">8.5%</span>
                  <span className="stat-label">Average Return</span>
                </div>
                <div className="stat">
                  <span className="stat-value">12</span>
                  <span className="stat-label">Cities</span>
                </div>
              </div>
            </div>

            <div className="hero-visual animate-fade-in">
              <div className="visual-card">
                <img 
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600" 
                  alt="Luxury Property"
                />
                <div className="visual-overlay">
                  <div className="visual-badge">
                    <Shield size={16} />
                    <span>SEC Registered</span>
                  </div>
                  <div className="visual-stats">
                    <div>
                      <span>Starting From</span>
                      <strong>50,000 FCFA</strong>
                    </div>
                    <div>
                      <span>Monthly Income</span>
                      <strong>Up to 12%</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Target size={18} />
              <span>Why Choose Us</span>
            </div>
            <h2 className="section-title">Real Estate Investment for Everyone</h2>
            <p className="section-subtitle">
              We've removed all barriers to property investment. No huge capital needed, 
              no management headaches, just pure passive income.
            </p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: Wallet,
                title: 'Low Entry Point',
                description: 'Start investing with as little as 50,000 FCFA. No need for huge down payments or bank loans.',
                color: 'primary'
              },
              {
                icon: TrendingUp,
                title: 'Monthly Passive Income',
                description: 'Receive your share of rental income directly to your bank account every single month.',
                color: 'success'
              },
              {
                icon: Shield,
                title: 'Professional Management',
                description: 'We handle tenants, maintenance, and property management. You just relax and earn.',
                color: 'warning'
              },
              {
                icon: Building2,
                title: 'Premium Properties',
                description: 'Access to vetted, high-quality properties in prime locations across Cameroon.',
                color: 'primary'
              },
              {
                icon: Users,
                title: 'Community Investing',
                description: 'Join a community of like-minded investors and grow your wealth together.',
                color: 'success'
              },
              {
                icon: BarChart3,
                title: 'Real-time Dashboard',
                description: 'Track your investments, view performance, and see your earnings grow in real-time.',
                color: 'warning'
              }
            ].map((feature, index) => (
              <div key={index} className={`feature-card ${feature.color}`}>
                <div className="feature-icon">
                  <feature.icon size={28} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Target size={18} />
              <span>Simple Process</span>
            </div>
            <h2 className="section-title">Start Investing in 3 Easy Steps</h2>
            <p className="section-subtitle">
              We've made real estate investment as simple as online shopping
            </p>
          </div>

          <div className="steps-container">
            {[
              {
                step: '01',
                title: 'Create Account',
                description: 'Sign up for free in under 2 minutes. No credit check required.',
                features: ['Free registration', 'Instant verification', 'Secure platform']
              },
              {
                step: '02',
                title: 'Choose Property',
                description: 'Browse our vetted properties and invest in as little as 50,000 FCFA.',
                features: ['Professional vetting', 'Detailed analytics', 'Market research']
              },
              {
                step: '03',
                title: 'Earn Monthly',
                description: 'Receive your share of rental income directly to your bank account.',
                features: ['Monthly payouts', 'Real-time tracking', 'Tax documents']
              }
            ].map((item, index) => (
              <div key={index} className="step-item">
                <div className="step-number">{item.step}</div>
                <div className="step-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul className="step-features">
                    {item.features.map((feature, i) => (
                      <li key={i}>
                        <CheckCircle size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                {index < 2 && <div className="step-arrow"><ChevronRight size={32} /></div>}
              </div>
            ))}
          </div>

          <div className="steps-cta">
            <button 
              className="btn btn-primary btn-large"
              onClick={() => setShowSignupModal(true)}
            >
              Start Your First Investment
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties Preview */}
      <section id="properties" className="properties-preview">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Building2 size={18} />
              <span>Featured Properties</span>
            </div>
            <h2 className="section-title">Popular Investment Opportunities</h2>
            <p className="section-subtitle">
              Hand-picked properties with high growth potential
            </p>
          </div>

          <div className="preview-grid">
            {[
              {
                title: 'Luxury Apartment Complex',
                location: 'Bonanjo, Douala',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
                minInvestment: '100,000 FCFA',
                return: '8.5%',
                investors: 234
              },
              {
                title: 'Beachfront Villas',
                location: 'Kribi',
                image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500',
                minInvestment: '150,000 FCFA',
                return: '10.2%',
                investors: 156
              },
              {
                title: 'Commercial Tower',
                location: 'Bonapriso, Douala',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500',
                minInvestment: '250,000 FCFA',
                return: '9.2%',
                investors: 189
              }
            ].map((property, index) => (
              <div key={index} className="preview-card">
                <div className="preview-image">
                  <img src={property.image} alt={property.title} />
                  <span className="preview-badge">Featured</span>
                </div>
                <div className="preview-content">
                  <h4>{property.title}</h4>
                  <div className="preview-location">
                    <MapPin size={14} />
                    <span>{property.location}</span>
                  </div>
                  <div className="preview-meta">
                    <div>
                      <span>Min. Investment</span>
                      <strong>{property.minInvestment}</strong>
                    </div>
                    <div>
                      <span>Est. Return</span>
                      <strong className="return">{property.return}</strong>
                    </div>
                  </div>
                  <div className="preview-footer">
                    <span className="investor-count">
                      <Users size={14} />
                      {property.investors} investors
                    </span>
                    <button 
                      className="preview-btn"
                      onClick={() => setShowSignupModal(true)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="preview-cta">
            <Link to="/properties" className="btn btn-outline btn-large">
              View All Properties
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Users size={18} />
              <span>Testimonials</span>
            </div>
            <h2 className="section-title">What Our Investors Say</h2>
            <p className="section-subtitle">
              Real stories from real people building wealth through real estate
            </p>
          </div>

          <div className="testimonials-grid">
            {[
              {
                name: 'Paul Mbarga',
                role: 'First-time Investor',
                content: 'I never thought I could own real estate. With just 500,000 FCFA, I now earn monthly passive income. Life-changing!',
                investment: '500k FCFA',
                earnings: '2.3M FCFA',
                rating: 5
              },
              {
                name: 'Christine Ndi',
                role: 'Retired Teacher',
                content: 'Perfect way to diversify my retirement savings. Much better returns than traditional bank savings.',
                investment: '5M FCFA',
                earnings: '12.5M FCFA',
                rating: 5
              },
              {
                name: 'Jean-Pierre Amougou',
                role: 'Business Owner',
                content: 'The platform is transparent and professional. I love tracking my investments in real-time.',
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
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < testimonial.rating ? '#f59e0b' : 'none'} 
                      color={i < testimonial.rating ? '#f59e0b' : '#d1d5db'} 
                    />
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

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Users size={32} />
              </div>
              <div className="stat-number">15,000+</div>
              <div className="stat-label">Active Investors</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Building2 size={32} />
              </div>
              <div className="stat-number">234</div>
              <div className="stat-label">Properties Funded</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <DollarSign size={32} />
              </div>
              <div className="stat-number">12.5B+</div>
              <div className="stat-label">FCFA Invested</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Globe2 size={32} />
              </div>
              <div className="stat-number">12</div>
              <div className="stat-label">Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Real Estate Journey?</h2>
            <p>Join thousands of Cameroonians already earning passive income</p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary btn-large"
                onClick={() => setShowSignupModal(true)}
              >
                Create Free Account
                <ArrowRight size={20} />
              </button>
              <button 
                className="btn btn-outline btn-large"
                onClick={() => {
                  quickLogin();
                  setShowLoginModal(true);
                }}
              >
                Try Demo
                <PlayCircle size={20} />
              </button>
            </div>
            <p className="cta-note">No credit card required • Free account • 2-minute signup</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="landing-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <div className="footer-logo">
                <span className="logo-icon">🏠</span>
                <span className="logo-text">Land<span>Vest</span></span>
              </div>
              <p>Making real estate investment accessible to every Cameroonian. Start building wealth today.</p>
              <div className="social-links">
                <a href="#"><Phone size={18} /></a>
                <a href="#"><Mail size={18} /></a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#properties">Properties</a>
              <a href="#testimonials">Testimonials</a>
            </div>

            <div className="footer-links">
              <h4>Legal</h4>
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Risk Disclosure</a>
              <a href="#">SEC Filings</a>
            </div>

            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p><Phone size={14} /> +237 123 456 789</p>
              <p><Mail size={14} /> contact@landvest.cm</p>
              <p>Bastos, Yaoundé, Cameroon</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 LandVest. All rights reserved. SEC Registered.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="auth-modal">
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>
              <X size={24} />
            </button>

            <div className="modal-icon">
              <LogIn size={32} />
            </div>

            <h2>Welcome Back</h2>
            <p className="modal-subtitle">Log in to your LandVest account</p>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-with-icon">
                  <Lock size={18} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              <button 
                type="submit" 
                className="auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    Log In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="demo-credentials" onClick={quickLogin}>
              <Shield size={14} />
              <span>Use demo credentials</span>
            </div>

            <div className="modal-footer">
              <p>Don't have an account? 
                <button 
                  className="switch-auth-btn"
                  onClick={() => {
                    setShowLoginModal(false);
                    setShowSignupModal(true);
                  }}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="modal-overlay">
          <div className="auth-modal">
            <button className="modal-close" onClick={() => setShowSignupModal(false)}>
              <X size={24} />
            </button>

            <div className="modal-icon">
              <UserPlus size={32} />
            </div>

            <h2>Create Account</h2>
            <p className="modal-subtitle">Start your real estate investment journey today</p>

            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <Users size={18} />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-with-icon">
                  <Lock size={18} />
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                  />
                  <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
                </label>
              </div>

              <button 
                type="submit" 
                className="auth-submit-btn"
                disabled={isLoading || !agreeTerms}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="modal-footer">
              <p>Already have an account? 
                <button 
                  className="switch-auth-btn"
                  onClick={() => {
                    setShowSignupModal(false);
                    setShowLoginModal(true);
                  }}
                >
                  Log In
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landingpage;