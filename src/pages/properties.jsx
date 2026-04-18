import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Home, 
  Landmark, 
  Building2, 
  BedDouble,
  Bath,
  Square,
  DollarSign,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Heart,
  Share2,
  Camera,
  Calendar,
  Users,
  TrendingUp,
  Shield,
  CheckCircle,
  Filter,
  Grid3x3,
  List,
  Star,
  Loader,
  AlertCircle,
  Bed,
  Ruler
} from 'lucide-react';
import { getListings } from '../services/listingService';
import '../styles/properties.css';

const PropertiesPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    location: '',
    bedrooms: '',
    propertyType: '',
    features: []
  });
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 9;

  // Fetch properties from database
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const result = await getListings();
        
        if (result.success) {
          const dbProperties = result.data || [];
          // Transform database properties to match display format
          const transformedProperties = dbProperties.map((prop, index) => ({
            id: prop.id,
            title: prop.name,
            type: prop.property_type,
            category: prop.property_type,
            location: prop.location,
            price: prop.price,
            priceXAF: new Intl.NumberFormat('fr-FR').format(prop.price) + ' FCFA',
            surface: prop.area,
            surfaceUnit: 'm²',
            bedrooms: prop.bedrooms,
            bathrooms: prop.bathrooms,
            features: [],
            images: getPropertyImages(prop),
            status: 'available',
            seller: 'Property Owner',
            datePosted: prop.created_at || new Date().toISOString(),
            views: Math.floor(Math.random() * 1000),
            trending: index < 3,
            description: prop.description
          }));
          setProperties(transformedProperties);
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

  // Get property images from media files
  const getPropertyImages = (property) => {
    if (property.media_files && Array.isArray(property.media_files)) {
      return property.media_files
        .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f.public_url))
        .map(f => f.public_url);
    }
    return ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500'];
  };

  // Filter properties based on selected filters
  const filteredProperties = properties.filter(prop => {
    if (selectedCategory !== 'all' && prop.category !== selectedCategory) return false;
    if (filters.location && !prop.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.minPrice && prop.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && prop.price > parseInt(filters.maxPrice)) return false;
    if (filters.bedrooms && prop.bedrooms < parseInt(filters.bedrooms)) return false;
    if (filters.propertyType && prop.type !== filters.propertyType) return false;
    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch(sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return new Date(b.datePosted) - new Date(a.datePosted);
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const paginatedProperties = sortedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle favorite
  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      location: '',
      bedrooms: '',
      propertyType: '',
      features: []
    });
    setSelectedCategory('all');
  };

  // Format price for display
  const formatPrice = (property) => {
    return property.priceXAF;
  };

  // Get icon for property type
  const getPropertyIcon = (type) => {
    switch(type) {
      case 'land': return <Landmark className="property-type-icon" />;
      case 'house': return <Home className="property-type-icon" />;
      case 'apartment': return <Building2 className="property-type-icon" />;
      case 'commercial': return <Building2 className="property-type-icon" />;
      default: return <Home className="property-type-icon" />;
    }
  };

  return ( 
    <div className="properties-page">
      {/* Hero Section */}
      <section className="properties-hero">
        <div className="properties-hero-overlay"></div>
        <div className="properties-hero-content">
          <h1>Discover the Best Real Estate Properties in Cameroon</h1>
          <p>Land, Houses, Apartments and Commercial - Find your ideal property</p>
          
          {/* Quick Search */}
          <div className="quick-search">
            <div className="quick-search-input">
              <Search />
              <input 
                type="text" 
                placeholder="Search by location (Douala, Yaoundé, Kribi...)"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
            </div>
            <button className="quick-search-btn" onClick={() => setCurrentPage(1)}>
              Search
              
            </button>
          </div>

          {/* Popular Locations */}
          <div className="popular-locations">
            <span>Popular:</span>
            <button onClick={() => setFilters({...filters, location: 'Douala'})}>Douala</button>
            <button onClick={() => setFilters({...filters, location: 'Yaoundé'})}>Yaoundé</button>
            <button onClick={() => setFilters({...filters, location: 'Kribi'})}>Kribi</button>
            <button onClick={() => setFilters({...filters, location: 'Bafoussam'})}>Bafoussam</button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="properties-container">
        {/* Category Tabs */}
        <div className="category-tabs">
          <button 
            className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <Home /> All
          </button>
          <button 
            className={`category-tab ${selectedCategory === 'land' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('land')}
          >
            <Landmark /> Land
          </button>
          <button 
            className={`category-tab ${selectedCategory === 'house' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('house')}
          >
            <Home /> Houses
          </button>
          <button 
            className={`category-tab ${selectedCategory === 'rental' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('rental')}
          >
            <Building2 /> Rentals
          </button>
          <button 
            className={`category-tab ${selectedCategory === 'commercial' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('commercial')}
          >
            <Building2 /> Commercial
          </button>
        </div>

        {/* Toolbar */}
        <div className="properties-toolbar">
          <div className="toolbar-left">
            <button 
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal />
              Filters
              {(Object.values(filters).some(v => v) || selectedCategory !== 'all') && (
                <span className="filter-badge">●</span>
              )}
            </button>
            <span className="results-count">
              {filteredProperties.length} properties found
            </span>
          </div>

          <div className="toolbar-right">
            <div className="sort-select">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="trending">Trending</option>
              </select>
              <ChevronDown className="sort-icon" />
            </div>

            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filters-header">
              <h3>Advanced Filters</h3>
              <button onClick={resetFilters} className="reset-filters">
                Reset
              </button>
              <button className="close-filters" onClick={() => setShowFilters(false)}>
                <X />
              </button>
            </div>

            <div className="filters-grid">
              <div className="filter-group">
                <label>Property Type</label>
                <select 
                  value={filters.propertyType} 
                  onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                >
                  <option value="">All Types</option>
                  <option value="land">Land</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Min Price (FCFA)</label>
                <select 
                  value={filters.minPrice} 
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                >
                  <option value="">Any</option>
                  <option value="10000000">10M</option>
                  <option value="25000000">25M</option>
                  <option value="50000000">50M</option>
                  <option value="100000000">100M</option>
                  <option value="200000000">200M+</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Max Price (FCFA)</label>
                <select 
                  value={filters.maxPrice} 
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                >
                  <option value="">Any</option>
                  <option value="25000000">25M</option>
                  <option value="50000000">50M</option>
                  <option value="100000000">100M</option>
                  <option value="200000000">200M</option>
                  <option value="500000000">500M+</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Min Bedrooms</label>
                <select 
                  value={filters.bedrooms} 
                  onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option> 
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>

            <button className="apply-filters" onClick={() => setCurrentPage(1)}>
              Apply Filters
            </button>
          </div>
        )}

        {/* Properties Grid/List */}
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
            <h3>No Properties Available</h3>
            <p>Check back soon for new investment opportunities</p>
          </div>
        )}

        {!loading && properties.length > 0 && (
          <div className={`properties-${viewMode}`}>
            {paginatedProperties.length > 0 ? (
              paginatedProperties.map(property => (
                <div key={property.id} className={`property-item ${property.status}`}>
                  <div className="property-image">
                    <img src={property.images[0]} alt={property.title} />
                    {property.trending && <span className="trending-badge">Trending 🔥</span>}
                    {property.status === 'premium' && <span className="premium-badge">Premium</span>}
                    <button 
                      className={`favorite-btn ${favorites.includes(property.id) ? 'active' : ''}`}
                      onClick={() => toggleFavorite(property.id)}
                    >
                      <Heart />
                    </button>
                    <div className="property-actions">
                      <button className="action-btn"><Camera /> {property.images.length}</button>
                      <button className="action-btn"><Share2 /></button>
                    </div>
                  </div>

                  <div className="property-info">
                    <div className="property-header">
                      <div className="property-type">
                        {getPropertyIcon(property.type)}
                        <span>{property.type === 'land' ? 'Land' : 
                                 property.type === 'house' ? 'House' :
                                 property.type === 'apartment' ? 'Apartment' : 'Commercial'}</span>
                      </div>
                      <span className="property-date">
                        <Calendar />
                        {new Date(property.datePosted).toLocaleDateString('en-US')}
                      </span>
                    </div>

                    <h3 className="property-title">{property.title}</h3>
                    
                    <div className="property-location">
                      <MapPin />
                      <span>{property.location}</span>
                    </div>

                    <div className="property-features">
                      {property.surface && (
                        <span className="feature">
                          <Square />
                          {property.surface} {property.surfaceUnit}
                        </span>
                      )}
                      {property.bedrooms && (
                        <span className="feature">
                          <BedDouble />
                          {property.bedrooms} rooms
                        </span>
                      )}
                      {property.bathrooms && (
                        <span className="feature">
                          <Bath />
                          {property.bathrooms} baths
                        </span>
                      )}
                    </div>

                    {property.features && (
                      <div className="property-features-list">
                        {property.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="feature-tag">
                            <CheckCircle />
                            {feature}
                          </span>
                        ))}
                        {property.features.length > 3 && (
                          <span className="feature-tag more">+{property.features.length - 3}</span>
                        )}
                      </div>
                    )}

                    <div className="property-footer">
                      <div className="property-price">
                        <DollarSign />
                        <span className="price">{property.priceXAF}</span>
                      </div>
                      
                      <div className="property-stats">
                        <span>
                          <Users />
                          {property.views}
                        </span>
                        {property.trending && (
                          <span className="trending">
                            <TrendingUp />
                            Trending
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="property-seller">
                      <Shield />
                      <span>{property.seller}</span>
                    </div>

                    <Link to={`/property/${property.id}`} className="view-details-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <Home size={48} />
                <h3>No properties found</h3>
                <p>Try adjusting your filters or search criteria</p>
                <button onClick={resetFilters} className="reset-btn">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`page-num ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button 
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              Next
            </button>
          </div>
        )}

        {/* SEO Text Section */}
        <section className="seo-section">
          <h2>Real Estate Investment in Cameroon</h2>
          <p>
            Discover the best real estate investment opportunities in Douala, Yaoundé,
            Kribi and throughout Cameroon. Whether you're looking for land to build,
            a luxury villa, a furnished apartment, or commercial space, our platform
            offers a selection of verified properties with secure land titles.
          </p>
          <div className="seo-links">
            <Link to="/properties?city=douala">Properties in Douala</Link>
            <Link to="/properties?city=yaounde">Properties in Yaoundé</Link>
            <Link to="/properties?city=kribi">Properties in Kribi</Link>
            <Link to="/properties?type=land">Land</Link>
            <Link to="/properties?type=house">Houses</Link>
            <Link to="/properties?type=rental">Rentals</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PropertiesPage;
