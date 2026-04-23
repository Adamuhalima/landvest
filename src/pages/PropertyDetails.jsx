import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Ruler,
  Building2,
  Calendar,
  User,
  Phone,
  Mail,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Image as ImageIcon,
  Loader,
  AlertCircle,
  TrendingUp,
  Percent,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { getListingById } from '../services/listingService';
import { createInvestment, getCurrentUserId, getPropertyInvestmentStats } from '../services/investmentService';
import { getPropertyInvestmentProgress } from '../services/sellerService';
import ProgressBar from '../components/ProgressBar';
import { formatFCFA } from '../utils/currencyFormatter';
import { supabase } from '../supabaseClient';
import '../styles/property-details.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [user, setUser] = useState(null);
  
  // Investment states
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [numFractions, setNumFractions] = useState(1);
  const [fractionPrice, setFractionPrice] = useState(0);
  const [investmentStats, setInvestmentStats] = useState({ totalFractions: 0, totalAmount: 0 });
  const [investmentProgress, setInvestmentProgress] = useState({ percentage: 0, totalFractionsSold: 0, fractionsAvailable: 100 });
  const [investmentLoading, setInvestmentLoading] = useState(false);
  const [investmentError, setInvestmentError] = useState(null);
  const [investmentSuccess, setInvestmentSuccess] = useState(false);

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const result = await getListingById(id);
        
        if (result.success) {
          setProperty(result.data);
          setError(null);
          // Set default fraction price to 1% of property price
          setFractionPrice(result.data.price / 100);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
      
      if (currentUser) {
        const userId = await getCurrentUserId();
        setCurrentUserId(userId);
      }
    };
    checkUser();
  }, []);

  // Fetch investment stats for property
  useEffect(() => {
    const fetchStats = async () => {
      if (property) {
        const stats = await getPropertyInvestmentStats(property.id);
        setInvestmentStats(stats);
        
        // Fetch investment progress
        const progressResult = await getPropertyInvestmentProgress(property.id);
        if (progressResult.success) {
          setInvestmentProgress(progressResult.data);
        }
      }
    };
    fetchStats();
  }, [property]);

  // Get images and videos from media files
  const getMediaFiles = (mediaFiles) => {
    if (!mediaFiles || !Array.isArray(mediaFiles)) return { images: [], videos: [] };
    
    const images = mediaFiles.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f.public_url));
    const videos = mediaFiles.filter(f => /\.(mp4|webm|ogg)$/i.test(f.public_url));
    
    return { images, videos };
  };

  if (loading) {
    return (
      <div className="property-details-container">
        <div className="loading-container">
          <Loader size={40} className="loading-spinner" />
          <p>Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="property-details-container">
        <div className="error-container">
          <AlertCircle size={24} />
          <p>{error || 'Property not found'}</p>
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { images, videos } = getMediaFiles(property.media_files);
  const allMedia = images; // For now, show images
  const mainImage = allMedia.length > 0 ? allMedia[currentImageIndex].public_url : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800';

  const handleInvestment = async (e) => {
    e.preventDefault();
    
    if (!currentUserId) {
      setInvestmentError('You must be logged in to invest');
      return;
    }

    if (currentUserId === property.user_id) {
      setInvestmentError('You cannot invest in your own property');
      return;
    }

    if (numFractions < 1) {
      setInvestmentError('Please enter at least 1 fraction');
      return;
    }

    setInvestmentLoading(true);
    setInvestmentError(null);

    try {
      const result = await createInvestment({
        property_id: property.id,
        num_fractions: numFractions,
        fraction_price: fractionPrice
      });

      if (result.success) {
        setInvestmentSuccess(true);
        setNumFractions(1);
        setShowInvestModal(false);
        // Refresh investment stats
        const stats = await getPropertyInvestmentStats(property.id);
        setInvestmentStats(stats);
        
        // Refresh investment progress
        const progressResult = await getPropertyInvestmentProgress(property.id);
        if (progressResult.success) {
          setInvestmentProgress(progressResult.data);
        }
        
        setTimeout(() => {
          setInvestmentSuccess(false);
        }, 3000);
      } else {
        setInvestmentError(result.error || 'Failed to complete investment');
      }
    } catch (err) {
      setInvestmentError(err.message);
    } finally {
      setInvestmentLoading(false);
    }
  };

  const handleCall = () => {
    window.open('tel:+237652244621', '_self');
  };

  const handleMessage = () => {
    window.open('https://wa.me/237652244621?text=Hi%20I%20am%20interested%20in%20your%20property%20listing', '_blank');
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/property/${property.id}`;
    
    // Try to use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: property.name,
        text: `Check out this property: ${property.name}`,
        url: shareUrl
      }).catch(err => {
        // Fallback: copy to clipboard
        copyShareLink(shareUrl);
      });
    } else {
      // Fallback: copy to clipboard
      copyShareLink(shareUrl);
    }
  };

  const copyShareLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      alert('Share link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy link. Here is the URL: ' + link);
    });
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % Math.max(allMedia.length, 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + Math.max(allMedia.length, 1)) % Math.max(allMedia.length, 1));
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % allMedia.length);
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  return (
    <div className="property-details-container">
      {/* Header */}
      <div className="property-details-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>
        <button 
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart size={20} />
        </button>
      </div>

      {/* Main Image Gallery */}
      <div className="image-gallery">
        <div className="main-image-container">
          <img src={mainImage} alt={property.name} className="main-image" />
          
          {allMedia.length > 1 && (
            <>
              <button className="gallery-nav prev" onClick={handlePrevImage}>
                <ChevronLeft size={24} />
              </button>
              <button className="gallery-nav next" onClick={handleNextImage}>
                <ChevronRight size={24} />
              </button>
              <div className="image-counter">
                {currentImageIndex + 1} / {allMedia.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {allMedia.length > 1 && (
          <div className="thumbnails">
            {allMedia.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img src={image.public_url} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="property-details-content">
        {/* Property Header Info */}
        <div className="property-header-info">
          <div>
            <div className="property-type-badge">
              <Building2 size={16} />
              <span>{property.property_type}</span>
            </div>
            <h1 className="property-name">{property.name}</h1>
            <div className="property-location-info">
              <MapPin size={18} />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="price-section">
            <p className="property-price">
              <DollarSign size={24} />
              {formatFCFA(property.price)}
            </p>
          </div>
        </div>

        <div className="details-grid">
          {/* Left Column - Main Details */}
          <div className="details-left">
            {/* Key Features */}
            <section className="details-section">
              <h2>Key Features</h2>
              <div className="features-list">
                {property.bedrooms && (
                  <div className="feature-item">
                    <Bed size={20} />
                    <div>
                      <p className="feature-label">Bedrooms</p>
                      <p className="feature-value">{property.bedrooms}</p>
                    </div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="feature-item">
                    <Bath size={20} />
                    <div>
                      <p className="feature-label">Bathrooms</p>
                      <p className="feature-value">{property.bathrooms}</p>
                    </div>
                  </div>
                )}
                {property.area && (
                  <div className="feature-item">
                    <Ruler size={20} />
                    <div>
                      <p className="feature-label">Area</p>
                      <p className="feature-value">{property.area} m²</p>
                    </div>
                  </div>
                )}
                {property.property_type && (
                  <div className="feature-item">
                    <Building2 size={20} />
                    <div>
                      <p className="feature-label">Type</p>
                      <p className="feature-value">{property.property_type}</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Description */}
            {property.description && (
              <section className="details-section">
                <h2>Description</h2>
                <p className="description-text">{property.description}</p>
              </section>
            )}

            {/* Media Gallery - All Images and Videos */}
            {(images.length > 1 || videos.length > 0) && (
              <section className="details-section">
                <h2>Gallery</h2>
                <div className="media-grid">
                  {images.map((image, index) => (
                    <div 
                      key={`img-${index}`}
                      className="media-item image-item"
                      onClick={() => {
                        setLightboxIndex(index);
                        setShowLightbox(true);
                      }}
                    >
                      <img src={image.public_url} alt={`Gallery ${index}`} />
                      <div className="media-overlay">
                        <ImageIcon size={32} />
                      </div>
                    </div>
                  ))}
                  {videos.map((video, index) => (
                    <div key={`vid-${index}`} className="media-item video-item">
                      <video src={video.public_url} />
                      <div className="media-overlay">
                        <Play size={32} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Contact & Additional Info */}
          <div className="details-right">
            {/* Property Info Card */}
            <div className="info-card">
              <h3>Property Information</h3>
              <div className="info-item">
                <Calendar size={16} />
                <div>
                  <p className="info-label">Listed</p>
                  <p className="info-value">
                    {new Date(property.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="info-item">
                <Building2 size={16} />
                <div>
                  <p className="info-label">Property ID</p>
                  <p className="info-value">{property.id}</p>
                </div>
              </div>
            </div>

            {/* Investment Card */}
            <div className="investment-card">
              <h3>Investment Opportunity</h3>
              
              {/* Investment Progress Bar */}
              <ProgressBar 
                percentage={investmentProgress.percentage || 0}
                totalFractions={100}
                soldFractions={investmentProgress.totalFractionsSold || 0}
              />

              <div className="investment-info">
                <div className="investment-stat">
                  <span className="stat-label">Fractions Available</span>
                  <span className="stat-value">{investmentProgress.fractionsAvailable || 100}</span>
                </div>
                <div className="investment-stat">
                  <span className="stat-label">Per Fraction</span>
                  <span className="stat-value">{formatFCFA(fractionPrice, 2)}</span>
                </div>
                <div className="investment-stat">
                  <span className="stat-label">Total Invested</span>
                  <span className="stat-value">{investmentStats.totalFractions} fractions</span>
                </div>
              </div>
              {investmentSuccess && (
                <div className="success-message">
                  ✓ Investment successful! Check your profile for details.
                </div>
              )}
              <button 
                onClick={() => {
                  if (!user) {
                    navigate('/login');
                  } else {
                    setShowInvestModal(true);
                  }
                }}
                className="invest-button"
                disabled={user && currentUserId === property.user_id}
              >
                <TrendingUp size={18} />
                Invest Now
              </button>
            </div>

            {/* Contact Card */}
            <div className="contact-card">
              <h3>Contact Property Owner</h3>
              <p className="contact-description">
                Interested in this property? Get in touch with the owner for more information.
              </p>
              <button onClick={handleMessage} className="contact-button">
                <MessageCircle size={18} />
                Send Message
              </button>
              <button onClick={handleCall} className="contact-button secondary">
                <Phone size={18} />
                Call Owner
              </button>
              <button onClick={handleShare} className="contact-button secondary">
                <Share2 size={18} />
                Share Property
              </button>
            </div>

            {/* Additional Features */}
            {property.features && property.features.length > 0 && (
              <div className="features-card">
                <h3>Amenities & Features</h3>
                <ul className="features-tags">
                  {property.features.map((feature, index) => (
                    <li key={index} className="feature-tag">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && allMedia.length > 0 && (
        <div className="lightbox" onClick={() => setShowLightbox(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setShowLightbox(false)}>
              <X size={28} />
            </button>
            
            <img 
              src={allMedia[lightboxIndex].public_url} 
              alt={`Lightbox ${lightboxIndex}`} 
              className="lightbox-image"
            />

            {allMedia.length > 1 && (
              <>
                <button className="lightbox-nav prev" onClick={handleLightboxPrev}>
                  <ChevronLeft size={32} />
                </button>
                <button className="lightbox-nav next" onClick={handleLightboxNext}>
                  <ChevronRight size={32} />
                </button>
                <div className="lightbox-counter">
                  {lightboxIndex + 1} / {allMedia.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Investment Modal */}
      {showInvestModal && (
        <div className="modal-overlay" onClick={() => setShowInvestModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Invest in {property.name}</h2>
              <button className="modal-close" onClick={() => setShowInvestModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleInvestment} className="investment-form">
              <div className="form-section">
                <h3>Investment Details</h3>
                
                <div className="form-group">
                  <label>Property Price</label>
                  <div className="form-value">
                    {formatFCFA(property.price)}
                  </div>
                </div>

                <div className="form-group">
                  <label>Price per Fraction (1%)</label>
                  <div className="form-value">
                    {formatFCFA(fractionPrice, 2)}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="numFractions">Number of Fractions to Buy</label>
                  <div className="input-with-info">
                    <input
                      id="numFractions"
                      type="number"
                      min="1"
                      max="100"
                      value={numFractions}
                      onChange={(e) => setNumFractions(parseInt(e.target.value) || 1)}
                      className="form-input"
                      placeholder="Enter number of fractions"
                    />
                    <span className="info-text">Max: 100 fractions (100% of property)</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Investment Amount</label>
                  <div className="total-amount">
                    {formatFCFA(numFractions * fractionPrice, 2)}
                  </div>
                  <span className="percentage-text">{numFractions}% of the property</span>
                </div>
              </div>

              {investmentError && (
                <div className="error-message">
                  <AlertCircle size={18} />
                  {investmentError}
                </div>
              )}

              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => setShowInvestModal(false)}
                  className="btn-secondary"
                  disabled={investmentLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={investmentLoading}
                >
                  {investmentLoading ? 'Processing...' : 'Confirm Investment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
