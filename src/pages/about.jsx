import React from 'react';
import { Link } from 'react-router-dom';
//import {Map,  GoogleApiWrapper} from '@vis.gl/react-google-maps';
import {
  Heart,
  Target,
  Shield,
  Users,
  Award,
  TrendingUp,
  Globe2,
  Handshake,
  Building2,
  MapPin,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  Star,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Briefcase,
  GraduationCap,
  Calendar
} from 'lucide-react';
import '../styles/design-system.css';
import '../styles/about.css';

// import {GoogleMapsContext, useJsApiLoader} from '@vis.gl/react-google-maps'

const AboutPage = () => {
  // Company milestones


  const milestones = [
    {
      year: '2020',
      title: 'LandVest Founded',
      description: 'Started with a vision to make real estate investment accessible to all Cameroonians.',
      icon: Sparkles
    },
    {
      year: '2021',
      title: 'First 10 Properties',
      description: 'Successfully funded our first 10 properties with 500+ investors.',
      icon: Building2
    },
    {
      year: '2022',
      title: 'SEC Registration',
      description: 'Became a SEC-registered platform, ensuring regulatory compliance and investor protection.',
      icon: Shield
    },
    {
      year: '2023',
      title: 'Expanded to 12 Cities',
      description: 'Extended our reach to 12 cities across Cameroon, from Douala to Garoua.',
      icon: Globe2
    },
    {
      year: '2024',
      title: '15,000+ Investors',
      description: 'Celebrated 15,000 investors and 12.5B FCFA in assets funded.',
      icon: Users
    }
  ];

  // Team members
  const teamMembers = [
    {
      name: 'Adamu Halima',
      role: 'Founder & CEO',
      bio: 'Former real estate developer with 15+ years experience in the Cameroonian market. Passionate about democratizing property investment.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
      expertise: ['Real Estate Development', 'Investment Strategy', 'Market Analysis']
    },
    {
      name: 'Jean-Pierre Mbarga',
      role: 'Chief Investment Officer',
      bio: 'Ex-investment banker with expertise in property valuation and portfolio management. Leads our property vetting process.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      expertise: ['Financial Analysis', 'Risk Management', 'Portfolio Strategy']
    },
    {
      name: 'Christine Ndi',
      role: 'Head of Operations',
      bio: 'Ensures smooth day-to-day operations and investor relations. Previously managed large-scale property portfolios.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      expertise: ['Operations Management', 'Investor Relations', 'Property Management']
    },
    {
      name: 'Dr. Paul Akono',
      role: 'Legal & Compliance',
      bio: 'Real estate attorney ensuring all properties have clean titles and our platform complies with regulations.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      expertise: ['Property Law', 'Regulatory Compliance', 'Title Verification']
    }
  ];

  // Values
  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We believe in complete transparency. Every property is thoroughly vetted, and all documents are available for review.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We\'re building a community of investors who grow together. Your success is our success.'
    },
    {
      icon: Target,
      title: 'Accessibility',
      description: 'Real estate shouldn\'t be just for the wealthy. We\'re breaking down barriers to entry.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in property selection, management, and investor service.'
    }
  ];

  // Stats
  const stats = [
    { value: '15,000+', label: 'Active Investors', icon: Users },
    { value: '12.5B+', label: 'FCFA Invested', icon: TrendingUp },
    { value: '234', label: 'Properties Funded', icon: Building2 },
    { value: '12', label: 'Cities', icon: Globe2 },
    { value: '8.5%', label: 'Avg. Return', icon: Award },
    { value: '4.9', label: 'Trustpilot Rating', icon: Star }
  ];

  
  return (

    
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="container">
          <div className="about-hero-content">
            <div className="about-badge">
              <Heart size={18} />
              <span>Our Story</span>
            </div>
            <h1 className="about-hero-title">
              Democratizing Real Estate
              <span className="about-hero-highlight">Investment in Cameroon</span>
            </h1>
            <p className="about-hero-description">
              We're on a mission to make property investment accessible to every Cameroonian. 
              No matter your budget, you can now own a piece of Cameroon's most promising real estate.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-content">
              <div className="section-badge">
                <Target size={18} />
                <span>Our Mission</span>
              </div>
              <h2>Building Wealth Together</h2>
              <p className="mission-text">
                LandVest was born from a simple observation: real estate wealth in Cameroon has 
                traditionally been accessible only to those with significant capital. We're changing that.
              </p>
              <p className="mission-text">
                By fractionalizing property ownership, we allow anyone to invest in premium real estate 
                starting from just 50,000 FCFA. Our platform handles everything - from property selection 
                and legal verification to tenant management and monthly payouts.
              </p>
              <div className="mission-highlight">
                <div className="highlight-item">
                  <CheckCircle size={20} />
                  <span>SEC Registered</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={20} />
                  <span>Verified Properties</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={20} />
                  <span>Monthly Returns</span>
                </div>
              </div>
            </div>
            <div className="mission-image">
              <img 
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600" 
                alt="Building wealth together"
              />
              <div className="image-caption">
                <Users size={16} />
                <span>15,000+ investors and growing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <stat.icon size={24} />
                </div>
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Heart size={18} />
              <span>Our Values</span>
            </div>
            <h2 className="section-title">What Guides Us</h2>
            <p className="section-subtitle">
              These principles shape every decision we make and every property we list.
            </p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  <value.icon size={32} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Calendar size={18} />
              <span>Our Journey</span>
            </div>
            <h2 className="section-title">The LandVest Story</h2>
            <p className="section-subtitle">
              From a bold idea to Cameroon's leading real estate investment platform
            </p>
          </div>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">
                  <span>{milestone.year}</span>
                </div>
                <div className="timeline-content">
                  <div className="timeline-icon">
                    <milestone.icon size={24} />
                  </div>
                  <div className="timeline-text">
                    <h3>{milestone.title}</h3>
                    <p>{milestone.description}</p>
                  </div>
                </div>
                {index < milestones.length - 1 && <div className="timeline-line"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Users size={18} />
              <span>Our Team</span>
            </div>
            <h2 className="section-title">Meet the Experts</h2>
            <p className="section-subtitle">
              Passionate professionals dedicated to your investment success
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-content">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-expertise">
                    {member.expertise.map((skill, i) => (
                      <span key={i} className="expertise-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="container">
          <div className="choose-grid">
            <div className="choose-content">
              <div className="section-badge">
                <Award size={18} />
                <span>Why Choose Us</span>
              </div>
              <h2>We Put Investors First</h2>
              <p className="choose-text">
                Our platform is built around one goal: helping you build wealth through real estate. 
                Every feature, every property, every decision is made with your success in mind.
              </p>

              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h4>SEC Registered</h4>
                    <p>Fully compliant with regulatory requirements for your protection</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4>Vetted Properties</h4>
                    <p>Every property undergoes rigorous due diligence and title verification</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <Handshake size={20} />
                  </div>
                  <div>
                    <h4>Professional Management</h4>
                    <p>We handle tenants, maintenance, and all property management</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h4>Monthly Returns</h4>
                    <p>Receive your share of rental income directly to your account</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="choose-cta">
              <div className="cta-card">
                <h3>Ready to Start?</h3>
                <p>Join 15,000+ Cameroonians already building wealth through real estate</p>
                <div className="cta-features">
                  <div className="cta-feature">
                    <CheckCircle size={16} />
                    <span>Minimum 50,000 FCFA</span>
                  </div>
                  <div className="cta-feature">
                    <CheckCircle size={16} />
                    <span>No hidden fees</span>
                  </div>
                  <div className="cta-feature">
                    <CheckCircle size={16} />
                    <span>Monthly payouts</span>
                  </div>
                </div>
                <Link to="/invest" className="btn btn-primary btn-large">
                  Start Investing
                  <ArrowRight size={20} />
                </Link>
                <p className="cta-note">Free account • 2-minute signup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="contact-cta">
        <div className="container">
          <div className="contact-content">
            <h2>Have Questions? We're Here to Help</h2>
            <p>Our team is ready to guide you through your investment journey</p>
            <div className="contact-buttons">
              <Link to="/contact" className="btn btn-primary btn-large">
                Contact Us
                <Mail size={20} />
              </Link>
              <a href="tel:+237123456789" className="btn btn-outline btn-large">
                <Phone size={20} />
                Call +237 123 456 789
              </a>
            </div>
            <div className="office-hours">
              <Clock size={16} />
              <span>Monday - Friday: 8am - 6pm | Saturday: 9am - 1pm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Map/Location Section */}
      <section className="location-section">
        <div className="container">
          <div className="location-grid">
            <div className="location-info">
              <h3>Visit Our Headquarters</h3>
              <p>Come meet us in person to discuss your investment goals</p>
              
              <div className="office-details">
                <div className="detail-item">
                  <MapPin size={20} />
                  <div>
                    <h4>Address</h4>
                    <p>Bastos, Rue Principale<br />Yaoundé, Cameroon</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <Phone size={20} />
                  <div>
                    <h4>Phone</h4>
                    <p>+237 123 456 789<br />+237 987 654 321</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <Mail size={20} />
                  <div>
                    <h4>Email</h4>
                    <p>contact@landvest.cm<br />support@landvest.cm</p>
                  </div>
                </div>
              </div>

              <div className="social-proof">
                <p>Trusted by investors from</p>
                <div className="company-logos">
                  <span>National Bank</span>
                  <span>Afriland</span>
                  <span>Société Générale</span>
                </div>
              </div>
            </div>

            <div className="location-map">
              <div className="map-placeholder">
                {/* <img 
                  src="https://images.unsplash.com/photo-1577086664693-894d8405334a?w=600" 
                  alt="Map of Yaoundé"
                /> */}
                <Map
                google = {this.props.google}
                style = {{width: '100%', height: '400px', position: 'relative'}}
                zoom = {10}
                initialCenter = {{
                  lat: 4.155966,
                  lng: 9.263224
                }}
                />
                <div className="map-overlay">
                  <MapPin size={32} />
                  <span>LandVest Headquarters</span>
                </div>
              </div>
             {/* <box className="position-relative width-100% height-400px left-0 top-0 "> </box> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;