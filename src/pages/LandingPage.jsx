import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  DollarSign, 
  Home, 
  Building2,
  Bed,
  Bath,
  Ruler,
  Star,
  TrendingUp,
  Shield,
  Users,
  Award,
  ChevronRight,
  Loader,
  AlertCircle
} from 'lucide-react';
import { getListings } from '../services/listingService';
import { supabase } from '../supabaseClient';
import { formatFCFA } from '../utils/currencyFormatter';
import '../styles/landing-page.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch properties from database
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const result = await getListings();
        
        if (result.success) {
          setProperties(result.data || []);
          setError(null);
        } else {
          setError(result.error);
          setProperties([]);
        }
      } catch (err) {
        setError('Failed to load properties');
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
    };

    checkUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // Handle scroll to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/signup');
    }
  };

  // Get first image from property media files
  const getPropertyImage = (property) => {
    if (property.media_files && Array.isArray(property.media_files)) {
      const imageFile = property.media_files.find(
        f => f.public_url && /\.(jpg|jpeg|png|gif|webp)$/i.test(f.public_url)
      );
      return imageFile?.public_url || null;
    }
    return null;
  };

  return (
    <div className="landing-page">
      {/* Sticky Get Started Button - Only visible for logged in users */}
      {user && (
        <div className={`sticky-get-started ${isScrolled ? 'visible' : 'hidden'}`}>
          <button 
            onClick={handleGetStarted}
            className="get-started-btn-sticky"
          >
            {user ? 'View My Investments' : 'Get Started'}
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-header">
            <h1 className="hero-title">
              Smart Real Estate Investment Platform
            </h1>
            <p className="hero-subtitle">
              Invest in high-quality properties with confidence. 
              Explore, invest, and grow your wealth with our curated property portfolio.
            </p>
            <button 
              onClick={handleGetStarted}
              className="cta-button-hero"
            >
              {user ? 'View My Investments' : 'Get Started Now'}
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Stats Section */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Building2 size={24} />
              </div>
              <div className="stat-content">
                <h3>234+</h3>
                <p>Properties Listed</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <h3>15K+</h3>
                <p>Active Investors</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <h3>8.2%</h3>
                <p>Average Returns</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <MapPin size={24} />
              </div>
              <div className="stat-content">
                <h3>12+</h3>
                <p>Cities Covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <h2 className="section-title">Why Choose LandVest?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={28} />
            </div>
            <h3>Secure & Transparent</h3>
            <p>All properties are verified and backed by transparent documentation</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Star size={28} />
            </div>
            <h3>Best Returns</h3>
            <p>Competitive investment opportunities with proven track record</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp size={28} />
            </div>
            <h3>Real Growth</h3>
            <p>Track your portfolio growth in real-time with detailed analytics</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Award size={28} />
            </div>
            <h3>Expert Support</h3>
            <p>24/7 dedicated support team ready to help your investment journey</p>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="properties-section">
        <div className="properties-header">
          <h2 className="section-title">Available Properties</h2>
          <p className="section-subtitle">
            Discover our curated selection of premium investment properties
          </p>
        </div>

        {loading && (
          <div className="loading-container">
            <Loader size={40} className="loading-spinner" />
            <p>Loading properties...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <AlertCircle size={24} />
            <p>{error}</p>
          </div>
        )}

        {!loading && properties.length === 0 && !error && (
          <div className="empty-state">
            <Home size={48} />
            <h3>No Properties Available Yet</h3>
            <p>Check back soon for new investment opportunities</p>
          </div>
        )}

        {!loading && properties.length > 0 && (
          <div className="properties-grid">
            {properties.map((property) => {
              const propertyImage = getPropertyImage(property);
              return (
                <div key={property.id} className="property-card">
                  {/* Property Image */}
                  <div className="property-image-container">
                    {propertyImage ? (
                      <img 
                        src={propertyImage} 
                        alt={property.name}
                        className="property-image"
                      />
                    ) : (
                      <div className="property-image-placeholder">
                        <Building2 size={48} />
                      </div>
                    )}
                    <div className="property-badge">
                      {property.property_type}
                    </div>
                  </div>

                  {/* Property Content */}
                  <div className="property-content">
                    <h3 className="property-name">{property.name}</h3>
                    
                    <div className="property-location">
                      <MapPin size={16} />
                      <span>{property.location}</span>
                    </div>

                    <div className="property-price">
                      <DollarSign size={20} />
                      <span className="price-value">
                        {formatFCFA(property.price)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="property-description">
                      {property.description?.substring(0, 100)}
                      {property.description?.length > 100 ? '...' : ''}
                    </p>

                    {/* Property Details */}
                    <div className="property-details">
                      {property.bedrooms && (
                        <div className="detail-item">
                          <Bed size={16} />
                          <span>{property.bedrooms} Beds</span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="detail-item">
                          <Bath size={16} />
                          <span>{property.bathrooms} Baths</span>
                        </div>
                      )}
                      {property.area && (
                        <div className="detail-item">
                          <Ruler size={16} />
                          <span>{property.area} m²</span>
                        </div>
                      )}
                    </div>

                    <button 
                      className="property-cta"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      View Details
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Investing?</h2>
          <p>Join thousands of investors already growing their wealth with LandVest</p>
          <button 
            onClick={handleGetStarted}
            className="cta-button-final"
          >
            Get Started Today
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
