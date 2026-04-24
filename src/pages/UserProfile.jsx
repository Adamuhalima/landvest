import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  User,
  TrendingUp,
  DollarSign,
  Building2,
  ArrowRight,
  Loader,
  AlertCircle,
  MapPin,
  Percent,
  Calendar,
  Edit2,
  Send,
  Copy,
  X,
  Check,
  Share2,
  Clock
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { getUserInvestments, getCurrentUserId } from '../services/investmentService';
import { initiateTransfer, getPendingTransfers, getSentTransfers, acceptTransfer, declineTransfer, cancelTransfer } from '../services/transferService';
import { getMyListings, getSellerNotifications } from '../services/sellerService';
import ProgressBar from '../components/ProgressBar';
import { formatFCFA } from '../utils/currencyFormatter';
import '../styles/user-profile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalInvested: 0,
    totalFractions: 0,
    activeInvestments: 0
  });

  // Transfer-related states
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [pendingTransfers, setPendingTransfers] = useState([]);
  const [sentTransfers, setSentTransfers] = useState([]);
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferError, setTransferError] = useState(null);
  const [transferForm, setTransferForm] = useState({
    recipientEmail: '',
    fractionsToTransfer: 1,
    message: ''
  });

  // Seller-related states
  const [myListings, setMyListings] = useState([]);
  const [sellerNotifications, setSellerNotifications] = useState([]);
  const [listingsLoading, setListingsLoading] = useState(false);

  // Fetch current user and their investments
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        
        if (!currentUser) {
          navigate('/login');
          return;
        }

        setUser(currentUser);

        // Get user investments
        const result = await getUserInvestments(currentUser.id);
        
        if (result.success) {
          setInvestments(result.data || []);
          
          // Calculate stats
          const totalInvested = result.data.reduce((sum, inv) => sum + inv.total_amount, 0);
          const totalFractions = result.data.reduce((sum, inv) => sum + inv.num_fractions, 0);
          
          setStats({
            totalInvested,
            totalFractions,
            activeInvestments: result.data.filter(inv => inv.status === 'active').length
          });
          
          setError(null);
        } else {
          setError(result.error);
        }

        // Fetch pending transfers
        const transfersResult = await getPendingTransfers();
        if (transfersResult.success) {
          setPendingTransfers(transfersResult.data || []);
        }

        // Fetch sent transfers
        const sentTransfersResult = await getSentTransfers();
        if (sentTransfersResult.success) {
          setSentTransfers(sentTransfersResult.data || []);
        }

        // Fetch my listings
        const listingsResult = await getMyListings();
        if (listingsResult.success) {
          setMyListings(listingsResult.data || []);
        }

        // Fetch seller notifications
        const notificationsResult = await getSellerNotifications();
        if (notificationsResult.success) {
          setSellerNotifications(notificationsResult.data || []);
        }
      } catch (err) {
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (err) {
      setError('Failed to logout');
    }
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleTransferClick = (investment) => {
    setSelectedInvestment(investment);
    setShowTransferModal(true);
    setTransferForm({
      recipientEmail: '',
      fractionsToTransfer: 1,
      message: ''
    });
    setTransferError(null);
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    
    if (!transferForm.recipientEmail || transferForm.fractionsToTransfer < 1) {
      setTransferError('Please enter a valid recipient email and number of fractions');
      return;
    }

    if (transferForm.fractionsToTransfer > selectedInvestment.num_fractions) {
      setTransferError(`You only own ${selectedInvestment.num_fractions} fractions`);
      return;
    }

    try {
      setTransferLoading(true);
      setTransferError(null);

      const result = await initiateTransfer({
        from_user_id: user.id,
        to_user_email: transferForm.recipientEmail,
        investment_id: selectedInvestment.id,
        num_fractions: parseInt(transferForm.fractionsToTransfer)
      });

      if (result.success) {
        setShowTransferModal(false);
        setTransferForm({
          recipientEmail: '',
          fractionsToTransfer: 1,
          message: ''
        });
        
        // Refresh pending transfers
        const transfersResult = await getPendingTransfers();
        if (transfersResult.success) {
          setPendingTransfers(transfersResult.data || []);
        }

        alert('Transfer request sent successfully!');
      } else {
        setTransferError(result.error);
      }
    } catch (err) {
      setTransferError(err.message);
    } finally {
      setTransferLoading(false);
    }
  };

  const handleAcceptTransfer = async (transferId) => {
    try {
      const result = await acceptTransfer(transferId);

      if (result.success) {
        // Refresh data
        const investmentsResult = await getUserInvestments(user.id);
        if (investmentsResult.success) {
          setInvestments(investmentsResult.data || []);
          const totalInvested = investmentsResult.data.reduce((sum, inv) => sum + inv.total_amount, 0);
          const totalFractions = investmentsResult.data.reduce((sum, inv) => sum + inv.num_fractions, 0);
          setStats({
            totalInvested,
            totalFractions,
            activeInvestments: investmentsResult.data.filter(inv => inv.status === 'active').length
          });
        }

        const transfersResult = await getPendingTransfers();
        if (transfersResult.success) {
          setPendingTransfers(transfersResult.data || []);
        }

        alert('Transfer accepted!');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to accept transfer');
    }
  };

  const handleDeclineTransfer = async (transferId) => {
    try {
      const result = await declineTransfer(transferId);

      if (result.success) {
        const transfersResult = await getPendingTransfers();
        if (transfersResult.success) {
          setPendingTransfers(transfersResult.data || []);
        }

        alert('Transfer declined');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to decline transfer');
    }
  };

  const handleCancelTransfer = async (transferId) => {
    try {
      const result = await cancelTransfer(transferId);

      if (result.success) {
        const sentTransfersResult = await getSentTransfers();
        if (sentTransfersResult.success) {
          setSentTransfers(sentTransfersResult.data || []);
        }

        alert('Transfer cancelled');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to cancel transfer');
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-container">
          <Loader size={40} className="loading-spinner" />
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error && !investments.length) {
    return (
      <div className="profile-container">
        <div className="error-container">
          <AlertCircle size={24} />
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-info">
            <h1>My Profile</h1>
            <p className="profile-email">{user?.email}</p>
            <p className="profile-id">Member since {new Date(user?.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e8f5e9' }}>
            <DollarSign size={24} color="#2e7d32" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Invested</p>
            <p className="stat-value">
              {formatFCFA(stats.totalInvested)}
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e3f2fd' }}>
            <Percent size={24} color="#1976d2" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Fractions</p>
            <p className="stat-value">{stats.totalFractions}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fff3e0' }}>
            <Building2 size={24} color="#e65100" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Active Properties</p>
            <p className="stat-value">{stats.activeInvestments}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f3e5f5' }}>
            <TrendingUp size={24} color="#7b1fa2" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Average Return</p>
            <p className="stat-value">8.2%</p>
          </div>
        </div>
      </div>

      {/* Investments Section */}
      <div className="investments-section">
        <h2>My Investments</h2>
        
        {investments.length === 0 ? (
          <div className="empty-state">
            <Building2 size={48} />
            <h3>No Investments Yet</h3>
            <p>Start investing in properties to see them here</p>
            <button 
              onClick={() => navigate('/properties')}
              className="explore-btn"
            >
              Explore Properties
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="investments-grid">
            {investments.map((investment) => (
              <div key={investment.id} className="investment-card">
                <div className="investment-header">
                  <h3>{investment.properties?.name || 'Property'}</h3>
                  <span className={`status-badge ${investment.status}`}>
                    {investment.status}
                  </span>
                </div>

                <div className="investment-location">
                  <MapPin size={16} />
                  <p>{investment.properties?.location || 'Location not available'}</p>
                </div>

        <div className="cards-for-owrneship">
                <div className="investment-details">
                  <div className="detail-item">
                    <span className="detail-label">Fractions Owned</span>
                    <span className="detail-value">{investment.num_fractions}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Ownership</span>
                    <span className="detail-value">{investment.num_fractions}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Per Fraction</span>
                    <span className="detail-value">
                      {formatFCFA(investment.fraction_price, 2)}
                    </span>
                  </div>
                </div>

                <div className="investment-total">
                  <span>Total Investment</span>
                  <span className="amount">
                    {formatFCFA(investment.total_amount, 2)}
                  </span>
                </div>
                </div>
<br />
                <div className="investment-date">
                  <Calendar size={14} />
                  <span>{new Date(investment.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>

                <button 
                  onClick={() => handleViewProperty(investment.property_id)}
                  className="view-property-btn"
                >
                  View Property
                  <ArrowRight size={16} />
                </button>

                <button 
                  onClick={() => handleTransferClick(investment)}
                  className="transfer-btn"
                >
                  <Share2 size={16} />
                  Transfer Fractions
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Transfers Section */}
      {pendingTransfers.length > 0 && (
        <div className="pending-transfers-section">
          <h2>
            <Clock size={20} />
            Transfer Requests ({pendingTransfers.length})
          </h2>

          <div className="transfers-grid">
            {pendingTransfers.map((transfer) => (
              <div key={transfer.id} className="transfer-request-card">
                <div className="transfer-header">
                  <div className="transfer-from">
                    <span className="label">From</span>
                    <p className="sender-email">{transfer.sender?.email || 'Unknown'}</p>
                  </div>
                  <div className="transfer-status">
                    <Clock size={16} color="#ff9800" />
                    Pending
                  </div>
                </div>

                <div className="transfer-property">
                  <p className="property-name">{transfer.properties?.name || 'Property'}</p>
                  <p className="property-location">
                    <MapPin size={14} />
                    {transfer.properties?.location || 'Location'}
                  </p>
                </div>

                <div className="transfer-details">
                  <div className="detail-item">
                    <span className="label">Fractions</span>
                    <span className="value">{transfer.num_fractions}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Per Fraction</span>
                    <span className="value">{formatFCFA(transfer.fraction_price, 2)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Total</span>
                    <span className="value">{formatFCFA(transfer.total_amount, 2)}</span>
                  </div>
                </div>

                <div className="transfer-actions">
                  <button 
                    onClick={() => handleAcceptTransfer(transfer.id)}
                    className="accept-btn"
                  >
                    <Check size={16} />
                    Accept
                  </button>
                  <button 
                    onClick={() => handleDeclineTransfer(transfer.id)}
                    className="decline-btn"
                  >
                    <X size={16} />
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sent Transfers Section */}
      {sentTransfers.length > 0 && (
        <div className="sent-transfers-section">
          <h2>
            <Share2 size={20} />
            Sent Transfers ({sentTransfers.length})
          </h2>

          <div className="transfers-grid">
            {sentTransfers.map((transfer) => (
              <div key={transfer.id} className="transfer-request-card sent">
                <div className="transfer-header">
                  <div className="transfer-from">
                    <span className="label">To</span>
                    <p className="sender-email">{transfer.to_user_email}</p>
                  </div>
                  <div className="transfer-status">
                    <Clock size={16} color="#3b82f6" />
                    Awaiting Response
                  </div>
                </div>

                <div className="transfer-property">
                  <p className="property-name">{transfer.properties?.name || 'Property'}</p>
                  <p className="property-location">
                    <MapPin size={14} />
                    {transfer.properties?.location || 'Location'}
                  </p>
                </div>

                <div className="transfer-details">
                  <div className="detail-item">
                    <span className="label">Fractions</span>
                    <span className="value">{transfer.num_fractions}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Per Fraction</span>
                    <span className="value">{formatFCFA(transfer.fraction_price, 2)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Total</span>
                    <span className="value">{formatFCFA(transfer.total_amount, 2)}</span>
                  </div>
                </div>

                <div className="transfer-actions">
                  <button 
                    onClick={() => handleCancelTransfer(transfer.id)}
                    className="cancel-btn"
                  >
                    <X size={16} />
                    Cancel Transfer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && selectedInvestment && (
        <div className="modal-overlay" onClick={() => setShowTransferModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Transfer Fractions</h3>
              <button 
                onClick={() => setShowTransferModal(false)}
                className="close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="transfer-info">
                <p><strong>Property:</strong> {selectedInvestment.properties?.name || 'Property'}</p>
                <p><strong>You Own:</strong> {selectedInvestment.num_fractions} fractions</p>
                <p><strong>Price Per Fraction:</strong> {formatFCFA(selectedInvestment.fraction_price, 2)}</p>
              </div>

              <form onSubmit={handleTransferSubmit} className="transfer-form">
                <div className="form-group">
                  <label>Recipient Email *</label>
                  <input
                    type="email"
                    placeholder="friend@example.com"
                    value={transferForm.recipientEmail}
                    onChange={(e) => setTransferForm({
                      ...transferForm,
                      recipientEmail: e.target.value
                    })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Number of Fractions *</label>
                  <div className="fraction-input-group">
                    <button
                      type="button"
                      onClick={() => setTransferForm({
                        ...transferForm,
                        fractionsToTransfer: Math.max(1, transferForm.fractionsToTransfer - 1)
                      })}
                      className="btn-minus"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={selectedInvestment.num_fractions}
                      value={transferForm.fractionsToTransfer}
                      onChange={(e) => setTransferForm({
                        ...transferForm,
                        fractionsToTransfer: parseInt(e.target.value) || 1
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setTransferForm({
                        ...transferForm,
                        fractionsToTransfer: Math.min(selectedInvestment.num_fractions, transferForm.fractionsToTransfer + 1)
                      })}
                      className="btn-plus"
                    >
                      +
                    </button>
                  </div>
                  <small>Total: {formatFCFA(transferForm.fractionsToTransfer * selectedInvestment.fraction_price, 2)}</small>
                </div>

                <div className="form-group">
                  <label>Message (Optional)</label>
                  <textarea
                    placeholder="Add a personal message..."
                    value={transferForm.message}
                    onChange={(e) => setTransferForm({
                      ...transferForm,
                      message: e.target.value
                    })}
                    rows="3"
                  />
                </div>

                {transferError && (
                  <div className="error-message">
                    <AlertCircle size={16} />
                    {transferError}
                  </div>
                )}

                <div className="form-actions">
                  <button 
                    type="button"
                    onClick={() => setShowTransferModal(false)}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={transferLoading}
                    className="btn-submit"
                  >
                    {transferLoading ? (
                      <>
                        <Loader size={16} className="spinner" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Transfer Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* My Listings Section */}
      {myListings.length > 0 && (
        <div className="my-listings-section">
          <h2>
            <Building2 size={20} />
            My Listings ({myListings.length})
          </h2>

          <div className="listings-grid">
            {myListings.map((listing) => (
              <div key={listing.id} className="listing-card">
                <div className="listing-header">
                  <h3>{listing.name}</h3>
                  <span className="listing-type">{listing.property_type}</span>
                </div>

                <div className="listing-location">
                  <MapPin size={16} />
                  <p>{listing.location}</p>
                </div>

                <div className="listing-info">
                  <div className="info-item">
                    <span className="label">Price</span>
                    <span className="value">{formatFCFA(listing.price, 2)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Area</span>
                    <span className="value">{listing.area} m²</span>
                  </div>
                </div>

                {/* Investment Progress Bar */}
                <ProgressBar 
                  percentage={listing.investmentProgress?.percentage || 0}
                  totalFractions={100}
                  soldFractions={listing.investmentProgress?.totalFractionsSold || 0}
                />

                <div className="listing-stats">
                  <div className="stat">
                    <span className="label">Investors</span>
                    <span className="value">{listing.investmentProgress?.investorCount || 0}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Total Invested</span>
                    <span className="value">{formatFCFA(listing.investmentProgress?.totalFractionsSold * (listing.price / 100) || 0, 2)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleViewProperty(listing.id)}
                  className="view-listing-btn"
                >
                  View Details
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seller Notifications Section */}
      {sellerNotifications.length > 0 && (
        <div className="seller-notifications-section">
          <h2>
            <TrendingUp size={20} />
            Recent Investments ({sellerNotifications.length})
          </h2>

          <div className="notifications-list">
            {sellerNotifications.map((notification) => (
              <div key={notification.id} className="notification-item-seller">
                <div className="notification-header">
                  <div className="investor-info">
                    <span className="investor-name">{notification.investor?.full_name || notification.investor?.email}</span>
                    <span className="property-name">{notification.properties?.name}</span>
                  </div>
                  <div className="investment-details">
                    <span className="fractions">{notification.num_fractions} fractions</span>
                    <span className="amount">{formatFCFA(notification.total_amount, 2)}</span>
                  </div>
                </div>
                <div className="notification-date">
                  <Calendar size={14} />
                  <span>{new Date(notification.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Actions */}
      <div className="profile-actions">
        <button 
          onClick={() => navigate('/properties')}
          className="action-btn primary"
        >
          <Building2 size={18} />
          Explore More Properties
        </button>
        <button 
          onClick={() => navigate('/createListing')}
          className="action-btn secondary"
        >
          <Edit2 size={18} />
          Create Your Listing
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
