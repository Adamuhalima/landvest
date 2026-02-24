import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Shield,
  Users,
  Home,
  Building2,
  Wallet,
  ChevronRight,
  ArrowUpRight,
  DollarSign,
  BarChart3,
  PieChart,
  Clock,
  Calendar,
  Percent,
  Plus,
  Minus,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Target,
  Award,
  Sparkles,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Eye,
  Bell,
  Settings,
  HelpCircle
} from 'lucide-react';
import '../styles/design-system.css';
import '../styles/invest.css';

const InvestPage = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState(1250000);
  const [monthlyIncome, setMonthlyIncome] = useState(8750);
  const [totalReturn, setTotalReturn] = useState(12.4);
  const [isLoading, setIsLoading] = useState(false);

  // Mock investment opportunities
  const opportunities = [
    {
      id: 1,
      title: 'Luxury Apartment Complex',
      location: 'Bonanjo, Douala',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
      targetAmount: 500000000,
      raisedAmount: 325000000,
      investors: 234,
      minInvestment: 100000,
      expectedReturn: 8.5,
      term: '5 years',
      risk: 'Low',
      status: 'open',
      type: 'residential',
      features: ['Fully occupied', 'Professional management', 'Prime location'],
      progress: 65,
      endDate: '2024-12-31'
    },
    {
      id: 2,
      title: 'Commercial Office Tower',
      location: 'Bonapriso, Douala',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500',
      targetAmount: 750000000,
      raisedAmount: 412500000,
      investors: 156,
      minInvestment: 250000,
      expectedReturn: 9.2,
      term: '7 years',
      risk: 'Medium',
      status: 'open',
      type: 'commercial',
      features: ['AAA tenants', 'Long-term leases', 'Prime business district'],
      progress: 55,
      endDate: '2024-11-30'
    },
    {
      id: 3,
      title: 'Beachfront Villas',
      location: 'Kribi',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500',
      targetAmount: 300000000,
      raisedAmount: 210000000,
      investors: 89,
      minInvestment: 150000,
      expectedReturn: 10.2,
      term: '4 years',
      risk: 'Medium',
      status: 'open',
      type: 'residential',
      features: ['Tourist area', 'High appreciation', 'Rental income'],
      progress: 70,
      endDate: '2024-10-15'
    },
    {
      id: 4,
      title: 'Mixed-Use Development',
      location: 'Mvan, Yaoundé',
      image: 'https://images.unsplash.com/photo-1502005229762-cf3c11653d8f?w=500',
      targetAmount: 450000000,
      raisedAmount: 157500000,
      investors: 67,
      minInvestment: 100000,
      expectedReturn: 7.8,
      term: '6 years',
      risk: 'Low',
      status: 'open',
      type: 'mixed',
      features: ['Residential + Retail', 'Growing area', 'Pre-selling'],
      progress: 35,
      endDate: '2025-01-31'
    },
    {
      id: 5,
      title: 'Student Housing Complex',
      location: 'Ngoa Ekelle, Yaoundé',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500',
      targetAmount: 200000000,
      raisedAmount: 180000000,
      investors: 123,
      minInvestment: 50000,
      expectedReturn: 11.5,
      term: '3 years',
      risk: 'Medium',
      status: 'closing-soon',
      type: 'commercial',
      features: ['Near university', 'High demand', 'Fully managed'],
      progress: 90,
      endDate: '2024-09-30'
    },
    {
      id: 6,
      title: 'Luxury Residential Tower',
      location: 'Bastos, Yaoundé',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500',
      targetAmount: 600000000,
      raisedAmount: 420000000,
      investors: 198,
      minInvestment: 200000,
      expectedReturn: 8.9,
      term: '5 years',
      risk: 'Low',
      status: 'open',
      type: 'residential',
      features: ['High-end finishes', 'Premium location', 'Amenities'],
      progress: 70,
      endDate: '2024-12-15'
    }
  ];

  // Mock user investments
  const userInvestments = [
    {
      id: 1,
      title: 'Luxury Apartment Complex',
      location: 'Bonanjo, Douala',
      investedAmount: 500000,
      currentValue: 545000,
      shares: 5,
      returnRate: 9.0,
      monthlyIncome: 3750,
      nextPayout: '2024-03-01',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500'
    },
    {
      id: 2,
      title: 'Beachfront Villas',
      location: 'Kribi',
      investedAmount: 300000,
      currentValue: 324000,
      shares: 2,
      returnRate: 8.0,
      monthlyIncome: 2000,
      nextPayout: '2024-03-05',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500'
    },
    {
      id: 3,
      title: 'Student Housing Complex',
      location: 'Ngoa Ekelle, Yaoundé',
      investedAmount: 150000,
      currentValue: 166500,
      shares: 3,
      returnRate: 11.0,
      monthlyIncome: 1375,
      nextPayout: '2024-02-28',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500'
    }
  ];

  // Mock transactions
  const transactions = [
    {
      id: 1,
      type: 'investment',
      property: 'Luxury Apartment Complex',
      amount: 500000,
      date: '2024-01-15',
      status: 'completed',
      shares: 5
    },
    {
      id: 2,
      type: 'dividend',
      property: 'Luxury Apartment Complex',
      amount: 3750,
      date: '2024-02-01',
      status: 'completed',
      shares: 5
    },
    {
      id: 3,
      type: 'investment',
      property: 'Beachfront Villas',
      amount: 300000,
      date: '2024-01-20',
      status: 'completed',
      shares: 2
    },
    {
      id: 4,
      type: 'dividend',
      property: 'Beachfront Villas',
      amount: 2000,
      date: '2024-02-05',
      status: 'completed',
      shares: 2
    },
    {
      id: 5,
      type: 'investment',
      property: 'Student Housing Complex',
      amount: 150000,
      date: '2024-01-25',
      status: 'completed',
      shares: 3
    }
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('XAF', 'FCFA');
  };

  // Handle investment
  const handleInvest = (property) => {
    setSelectedProperty(property);
    setInvestmentAmount(property.minInvestment);
    setShowInvestmentModal(true);
  };

  // Confirm investment
  const confirmInvestment = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowInvestmentModal(false);
      // Show success message or update portfolio
      alert(`Successfully invested ${formatCurrency(investmentAmount)} in ${selectedProperty.title}`);
    }, 1500);
  };

  return (
    <div className="invest-page">
      {/* Hero Section */}
      <section className="invest-hero">
        <div className="invest-hero-overlay"></div>
        <div className="container">
          <div className="invest-hero-content">
            <div className="invest-badge">
              <Shield size={18} />
              <span>SEC Registered • 15,000+ Investors</span>
            </div>
            <h1 className="invest-hero-title">
              Invest in Premium Real Estate
              <span className="invest-hero-highlight">Start From 50,000 FCFA</span>
            </h1>
            <p className="invest-hero-description">
              Build wealth through property investment. Choose from vetted opportunities,
              earn monthly passive income, and watch your portfolio grow.
            </p>

            {/* Portfolio Summary */}
            <div className="portfolio-summary">
              <div className="summary-card">
                <div className="summary-icon">
                  <Briefcase size={24} />
                </div>
                <div className="summary-details">
                  <span className="summary-label">Portfolio Value</span>
                  <span className="summary-value">{formatCurrency(portfolioValue)}</span>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">
                  <TrendingUp size={24} />
                </div>
                <div className="summary-details">
                  <span className="summary-label">Monthly Income</span>
                  <span className="summary-value">{formatCurrency(monthlyIncome)}</span>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">
                  <Percent size={24} />
                </div>
                <div className="summary-details">
                  <span className="summary-label">Total Return</span>
                  <span className="summary-value">{totalReturn}%</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat">
                <span className="stat-value">12</span>
                <span className="stat-label">Properties</span>
              </div>
              <div className="stat">
                <span className="stat-value">3</span>
                <span className="stat-label">Active</span>
              </div>
              <div className="stat">
                <span className="stat-value">9</span>
                <span className="stat-label">Opportunities</span>
              </div>
              <div className="stat">
                <span className="stat-value">8.5%</span>
                <span className="stat-label">Avg Return</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="invest-container">
        {/* Tabs */}
        <div className="invest-tabs">
          <button
            className={`tab-btn ${activeTab === 'opportunities' ? 'active' : ''}`}
            onClick={() => setActiveTab('opportunities')}
          >
            <Target size={18} />
            Investment Opportunities
          </button>
          <button
            className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            <Briefcase size={18} />
            My Portfolio
          </button>
          <button
            className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            <Clock size={18} />
            Transaction History
          </button>
        </div>

        {/* Investment Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div className="opportunities-section">
            {/* Filters */}
            <div className="opportunities-filters">
              <div className="filter-group">
                <select className="filter-select">
                  <option>All Property Types</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Mixed-Use</option>
                </select>
              </div>
              <div className="filter-group">
                <select className="filter-select">
                  <option>Min Investment</option>
                  <option>50,000 FCFA</option>
                  <option>100,000 FCFA</option>
                  <option>250,000 FCFA</option>
                  <option>500,000 FCFA</option>
                </select>
              </div>
              <div className="filter-group">
                <select className="filter-select">
                  <option>Expected Return</option>
                  <option>7%+</option>
                  <option>8%+</option>
                  <option>9%+</option>
                  <option>10%+</option>
                </select>
              </div>
              <div className="filter-group">
                <select className="filter-select">
                  <sort>Sort By</sort>
                  <option>Most Popular</option>
                  <option>Highest Return</option>
                  <option>Lowest Min</option>
                  <option>Closing Soon</option>
                </select>
              </div>
            </div>

            {/* Opportunities Grid */}
            <div className="opportunities-grid">
              {opportunities.map(property => (
                <div key={property.id} className={`opportunity-card ${property.status}`}>
                  <div className="opportunity-image">
                    <img src={property.image} alt={property.title} />
                    {property.status === 'closing-soon' && (
                      <span className="status-badge warning">Closing Soon</span>
                    )}
                    <span className="property-type">{property.type}</span>
                  </div>

                  <div className="opportunity-content">
                    <h3>{property.title}</h3>
                    <p className="opportunity-location">{property.location}</p>

                    <div className="opportunity-stats">
                      <div className="stat-row">
                        <span>Target</span>
                        <strong>{formatCurrency(property.targetAmount)}</strong>
                      </div>
                      <div className="stat-row">
                        <span>Raised</span>
                        <strong>{formatCurrency(property.raisedAmount)}</strong>
                      </div>
                    </div>

                    <div className="progress-section">
                      <div className="progress-header">
                        <span>Funding Progress</span>
                        <span className="progress-percent">{property.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${property.progress}%` }}></div>
                      </div>
                    </div>

                    <div className="opportunity-meta">
                      <div className="meta-item">
                        <Users size={16} />
                        <span>{property.investors} investors</span>
                      </div>
                      <div className="meta-item">
                        <TrendingUp size={16} />
                        <span>{property.expectedReturn}% ROI</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={16} />
                        <span>{property.term}</span>
                      </div>
                    </div>

                    <div className="opportunity-features">
                      {property.features.map((feature, index) => (
                        <span key={index} className="feature-tag">
                          <CheckCircle size={12} />
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="opportunity-footer">
                      <div className="min-investment">
                        <span>Min. Investment</span>
                        <strong>{formatCurrency(property.minInvestment)}</strong>
                      </div>
                      <button
                        className="invest-now-btn"
                        onClick={() => handleInvest(property)}
                      >
                        Invest Now
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="portfolio-section">
            {/* Portfolio Overview */}
            <div className="portfolio-overview">
              <div className="overview-card">
                <h3>Portfolio Performance</h3>
                <div className="performance-chart">
                  {/* Placeholder for chart */}
                  <div className="chart-placeholder">
                    <BarChart3 size={48} />
                    <p>Performance chart will be displayed here</p>
                  </div>
                </div>
              </div>

              <div className="overview-stats">
                <div className="stat-card">
                  <span className="stat-label">Total Invested</span>
                  <span className="stat-value">{formatCurrency(950000)}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Current Value</span>
                  <span className="stat-value">{formatCurrency(1035500)}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Total Profit</span>
                  <span className="stat-value profit">{formatCurrency(85500)}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Dividends Earned</span>
                  <span className="stat-value">{formatCurrency(7125)}</span>
                </div>
              </div>
            </div>

            {/* My Investments */}
            <h3 className="section-title">My Investments</h3>
            <div className="investments-list">
              {userInvestments.map(investment => (
                <div key={investment.id} className="investment-card">
                  <div className="investment-image">
                    <img src={investment.image} alt={investment.title} />
                  </div>
                  <div className="investment-details">
                    <div className="investment-header">
                      <h4>{investment.title}</h4>
                      <span className="investment-status active">Active</span>
                    </div>
                    <p className="investment-location">{investment.location}</p>

                    <div className="investment-metrics">
                      <div className="metric">
                        <span>Invested</span>
                        <strong>{formatCurrency(investment.investedAmount)}</strong>
                      </div>
                      <div className="metric">
                        <span>Current Value</span>
                        <strong>{formatCurrency(investment.currentValue)}</strong>
                      </div>
                      <div className="metric">
                        <span>Shares</span>
                        <strong>{investment.shares}</strong>
                      </div>
                      <div className="metric">
                        <span>Return</span>
                        <strong className="profit">{investment.returnRate}%</strong>
                      </div>
                    </div>

                    <div className="investment-footer">
                      <div className="next-payout">
                        <Calendar size={16} />
                        <span>Next payout: {new Date(investment.nextPayout).toLocaleDateString()}</span>
                      </div>
                      <div className="monthly-income">
                        <TrendingUp size={16} />
                        <span>Monthly: {formatCurrency(investment.monthlyIncome)}</span>
                      </div>
                    </div>

                    <div className="investment-actions">
                      <button className="action-btn">
                        <Eye size={16} />
                        View Details
                      </button>
                      <button className="action-btn">
                        <RefreshCw size={16} />
                        Reinvest
                      </button>
                      <button className="action-btn">
                        <Download size={16} />
                        Statement
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="transactions-section">
            <div className="transactions-header">
              <h3>Transaction History</h3>
              <div className="transaction-filters">
                <select className="filter-select">
                  <option>All Types</option>
                  <option>Investments</option>
                  <option>Dividends</option>
                </select>
                <button className="export-btn">
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>

            <div className="transactions-list">
              {transactions.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-icon">
                    {transaction.type === 'investment' ? (
                      <ArrowUpRight className="investment-icon" />
                    ) : (
                      <TrendingUp className="dividend-icon" />
                    )}
                  </div>
                  <div className="transaction-details">
                    <div>
                      <h4>{transaction.property}</h4>
                      <p>{transaction.type === 'investment' ? 'Investment' : 'Dividend Payout'}</p>
                    </div>
                    <div className="transaction-meta">
                      <span className="transaction-date">
                        <Calendar size={14} />
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                      {transaction.shares && (
                        <span className="transaction-shares">
                          <Users size={14} />
                          {transaction.shares} shares
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="transaction-amount">
                    <span className={transaction.type === 'investment' ? 'negative' : 'positive'}>
                      {transaction.type === 'investment' ? '-' : '+'}
                      {formatCurrency(transaction.amount)}
                    </span>
                    <span className={`transaction-status ${transaction.status}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="load-more">
              <button className="load-more-btn">
                Load More Transactions
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Investment Modal */}
      {showInvestmentModal && selectedProperty && (
        <div className="modal-overlay">
          <div className="investment-modal">
            <button className="modal-close" onClick={() => setShowInvestmentModal(false)}>
              <Minus size={24} />
            </button>

            <h2>Invest in {selectedProperty.title}</h2>
            <p className="modal-location">{selectedProperty.location}</p>

            <div className="modal-property-info">
              <div className="info-row">
                <span>Minimum Investment</span>
                <strong>{formatCurrency(selectedProperty.minInvestment)}</strong>
              </div>
              <div className="info-row">
                <span>Expected Return</span>
                <strong className="profit">{selectedProperty.expectedReturn}%</strong>
              </div>
              <div className="info-row">
                <span>Investment Term</span>
                <strong>{selectedProperty.term}</strong>
              </div>
              <div className="info-row">
                <span>Available Shares</span>
                <strong>1,234</strong>
              </div>
            </div>

            <div className="investment-input">
              <label>Investment Amount (FCFA)</label>
              <div className="amount-input">
                <button
                  className="amount-btn"
                  onClick={() => setInvestmentAmount(prev => Math.max(selectedProperty.minInvestment, prev - 50000))}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  min={selectedProperty.minInvestment}
                  step={50000}
                />
                <button
                  className="amount-btn"
                  onClick={() => setInvestmentAmount(prev => prev + 50000)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="input-hint">Minimum: {formatCurrency(selectedProperty.minInvestment)}</p>
            </div>

            <div className="investment-summary">
              <h3>Investment Summary</h3>
              <div className="summary-row">
                <span>Shares to Acquire</span>
                <strong>{Math.floor(investmentAmount / 100000)} shares</strong>
              </div>
              <div className="summary-row">
                <span>Estimated Monthly Income</span>
                <strong>{formatCurrency(Math.floor(investmentAmount * 0.0075))}</strong>
              </div>
              <div className="summary-row">
                <span>Estimated Annual Return</span>
                <strong>{formatCurrency(Math.floor(investmentAmount * 0.09))}</strong>
              </div>
              <div className="summary-row total">
                <span>Total Investment</span>
                <strong>{formatCurrency(investmentAmount)}</strong>
              </div>
            </div>

            <div className="investment-terms">
              <h4>Terms & Conditions</h4>
              <div className="terms-list">
                <label className="term-item">
                  <input type="checkbox" />
                  <span>I confirm that I have read and understood the investment prospectus</span>
                </label>
                <label className="term-item">
                  <input type="checkbox" />
                  <span>I understand that real estate investments carry risks and returns are not guaranteed</span>
                </label>
                <label className="term-item">
                  <input type="checkbox" />
                  <span>I agree to the terms of service and privacy policy</span>
                </label>
              </div>
            </div>

            <button
              className="confirm-investment-btn"
              onClick={confirmInvestment}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw size={18} className="spinning" />
                  Processing...
                </>
              ) : (
                <>
                  Confirm Investment
                  <Lock size={18} />
                </>
              )}
            </button>

            <p className="security-note">
              <Shield size={14} />
              Your investment is secured and protected
            </p>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="invest-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Investment Journey?</h2>
            <p>Join thousands of Cameroonians already earning passive income through real estate</p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-large">
                Start Investing Today
                <ArrowUpRight size={20} />
              </button>
              <Link to="/contact" className="btn btn-outline btn-large">
                Talk to an Advisor
                <HelpCircle size={20} />
              </Link>
            </div>
            <p className="cta-note">No minimum commitment • Cancel anytime • Secure platform</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestPage;