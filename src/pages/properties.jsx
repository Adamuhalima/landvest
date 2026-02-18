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
  Star
} from 'lucide-react';
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
  const itemsPerPage = 9;

  // Mock data for Cameroonian properties
  const properties = [
    {
      id: 1,
      title: 'Residential Land - Bastos',
      type: 'land',
      category: 'land',
      location: 'Bastos, Yaoundé',
      price: 45000000,
      priceXAF: '45,000,000 FCFA',
      surface: 500,
      surfaceUnit: 'm²',
      features: ['Land Title', 'Serviced', 'Fenced'],
      images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500'],
      status: 'available',
      seller: 'Agence Immobilière du Centre',
      datePosted: '2024-02-15',
      views: 234,
      trending: true,
      coordinates: { lat: 3.8667, lng: 11.5167 }
    },
    {
      id: 2,
      title: 'Modern 5-Room Villa - Bonanjo',
      type: 'house',
      category: 'house',
      location: 'Bonanjo, Douala',
      price: 120000000,
      priceXAF: '120,000,000 FCFA',
      surface: 350,
      bedrooms: 5,
      bathrooms: 4,
      features: ['Air Conditioning', 'Generator', 'Swimming Pool', 'Garden', '2-Car Garage'],
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500'],
      status: 'available',
      seller: 'Royal Immobilier',
      datePosted: '2024-02-10',
      views: 567,
      trending: true,
      coordinates: { lat: 4.0511, lng: 9.7679 }
    },
    {
      id: 3,
      title: 'Furnished 3-Room Apartment - Mvan',
      type: 'apartment',
      category: 'rental',
      location: 'Mvan, Yaoundé',
      price: 250000,
      priceXAF: '250,000 FCFA/month',
      surface: 120,
      bedrooms: 3,
      bathrooms: 2,
      features: ['Furnished', 'Air Conditioning', 'Generator', 'Parking', 'Security Guard'],
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500'],
      status: 'available',
      seller: 'Groupe SIC',
      datePosted: '2024-02-12',
      views: 189,
      trending: false
    },
    {
      id: 4,
      title: 'Commercial Land - Bonamoussadi',
      type: 'land',
      category: 'land',
      location: 'Bonamoussadi, Douala',
      price: 85000000,
      priceXAF: '85,000,000 FCFA',
      surface: 800,
      features: ['Land Title', 'Commercial Zone', 'Road Frontage', 'Building Permit'],
      images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500'],
      status: 'available',
      seller: 'Africa Real Estate',
      datePosted: '2024-02-14',
      views: 312,
      trending: true
    },
    {
      id: 5,
      title: '4-Room Townhouse - Akwa',
      type: 'house',
      category: 'house',
      location: 'Akwa, Douala',
      price: 95000000,
      priceXAF: '95,000,000 FCFA',
      surface: 250,
      bedrooms: 4,
      bathrooms: 3,
      features: ['Air Conditioning', 'Fitted Kitchen', 'Terrace', 'Garage', 'Water Tank'],
      images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500'],
      status: 'available',
      seller: 'ImmoPlus',
      datePosted: '2024-02-08',
      views: 423,
      trending: false
    },
    {
      id: 6,
      title: 'Furnished Studio - Hippodrome',
      type: 'apartment',
      category: 'rental',
      location: 'Hippodrome, Yaoundé',
      price: 150000,
      priceXAF: '150,000 FCFA/month',
      surface: 45,
      bedrooms: 1,
      bathrooms: 1,
      features: ['Furnished', 'Air Conditioning', 'Internet', 'Running Water', 'Generator'],
      images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500'],
      status: 'available',
      seller: 'City Habitat',
      datePosted: '2024-02-13',
      views: 156,
      trending: true
    },
    {
      id: 7,
      title: 'Agricultural Land - Mbankomo',
      type: 'land',
      category: 'land',
      location: 'Mbankomo, Yaoundé',
      price: 15000000,
      priceXAF: '15,000,000 FCFA',
      surface: 2000,
      features: ['Land Title', 'Road Access', 'Water Source', 'Electricity'],
      images: ['https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500'],
      status: 'available',
      seller: 'Fermier du Centre',
      datePosted: '2024-02-11',
      views: 89,
      trending: false
    },
    {
      id: 8,
      title: 'Luxury Duplex - Santa Barbara',
      type: 'house',
      category: 'house',
      location: 'Santa Barbara, Douala',
      price: 250000000,
      priceXAF: '250,000,000 FCFA',
      surface: 500,
      bedrooms: 6,
      bathrooms: 5,
      features: ['Swimming Pool', 'Gym', 'Tropical Garden', 'Generator', 'Central AC'],
      images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500'],
      status: 'premium',
      seller: 'Prestige Immo',
      datePosted: '2024-02-05',
      views: 678,
      trending: true
    },
    {
      id: 9,
      title: 'Commercial Office - Bonapriso',
      type: 'commercial',
      category: 'commercial',
      location: 'Bonapriso, Douala',
      price: 300000,
      priceXAF: '300,000 FCFA/month',
      surface: 150,
      features: ['Storefront', 'Air Conditioning', 'Customer Parking', '24/7 Security'],
      images: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500'],
      status: 'available',
      seller: 'Business Center SA',
      datePosted: '2024-02-09',
      views: 245,
      trending: false
    },
    {
      id: 10,
      title: 'Villa with Pool - Kribi',
      type: 'house',
      category: 'house',
      location: 'Kribi',
      price: 150000000,
      priceXAF: '150,000,000 FCFA',
      surface: 400,
      bedrooms: 5,
      bathrooms: 4,
      features: ['Ocean View', 'Swimming Pool', 'Private Beach', 'Generator', 'Staff Quarters'],
      images: ['https://images.unsplash.com/photo-1540541338287-41700207dee6?w=500'],
      status: 'premium',
      seller: 'Côte Immobilier',
      datePosted: '2024-02-07',
      views: 445,
      trending: true
    },
    {
      id: 11,
      title: 'F4 Apartment - Mendong',
      type: 'apartment',
      category: 'rental',
      location: 'Mendong, Yaoundé',
      price: 200000,
      priceXAF: '200,000 FCFA/month',
      surface: 100,
      bedrooms: 4,
      bathrooms: 2,
      features: ['Semi-furnished', 'Air Conditioning', 'Generator', 'Parking', 'Security Guard'],
      images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500'],
      status: 'available',
      seller: 'Habitat Plus',
      datePosted: '2024-02-16',
      views: 134,
      trending: false
    },
    {
      id: 12,
      title: 'Serviced Land - Nkolbisson',
      type: 'land',
      category: 'land',
      location: 'Nkolbisson, Yaoundé',
      price: 25000000,
      priceXAF: '25,000,000 FCFA',
      surface: 300,
      features: ['Land Title', 'Electricity', 'Water', 'Paved Road Access'],
      images: ['https://images.unsplash.com/photo-1582408921715-18e78064bdb5?w=500'],
      status: 'available',
      seller: 'Terres du Cameroun',
      datePosted: '2024-02-14',
      views: 167,
      trending: false
    }
  ];

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

        {/* Pagination */}
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