

import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Plus, Bell, X, Check } from "lucide-react";
import { supabase } from "../supabaseClient";
import { getPendingTransfers, getSentTransfers, acceptTransfer, declineTransfer } from "../services/transferService";
import { getSellerNotifications } from "../services/sellerService";
import { formatFCFA } from "../utils/currencyFormatter";

const Navbar = () => { 
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [pendingTransfers, setPendingTransfers] = useState([]);
  const [sentTransfers, setSentTransfers] = useState([]);
  const [sellerNotifications, setSellerNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
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

  // Fetch pending transfers
  useEffect(() => {
    if (user) {
      fetchPendingTransfers();
    }
  }, [user]);

  const fetchPendingTransfers = async () => {
    const result = await getPendingTransfers();
    if (result.success) {
      setPendingTransfers(result.data || []);
    }
    
    const sentResult = await getSentTransfers();
    if (sentResult.success) {
      setSentTransfers(sentResult.data || []);
    }

    const notificationsResult = await getSellerNotifications();
    if (notificationsResult.success) {
      setSellerNotifications(notificationsResult.data || []);
    }
  };

  const handleAcceptTransfer = async (transferId) => {
    try {
      setLoading(true);
      const result = await acceptTransfer(transferId);
      if (result.success) {
        await fetchPendingTransfers();
        alert('Transfer accepted!');
      } else {
        alert('Failed to accept transfer: ' + result.error);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeclineTransfer = async (transferId) => {
    try {
      setLoading(true);
      const result = await declineTransfer(transferId);
      if (result.success) {
        await fetchPendingTransfers();
        alert('Transfer declined');
      } else {
        alert('Failed to decline transfer: ' + result.error);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
    navigate('/');
  };

  // Don't show navbar if user is not logged in
  if (!user) {
    return null;
  }

  // Get first name from email
  const firstName = user.email?.split('@')[0] || 'User';

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <span>LandVest</span>
          </Link>
        </div>

        {/* Desktop Links - Center */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/about">About</Link>
        </nav>

        {/* Right Section - Notifications, Create Listing, Profile, Logout */}
        <div className="nav-right-section desktop-only">
          {/* Notifications */}
          <div className="notification-container">
            <button 
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="notification-bell"
            >
              <Bell size={20} />
              {(pendingTransfers.length + sentTransfers.length + sellerNotifications.length) > 0 && (
                <span className="notification-badge">{pendingTransfers.length + sentTransfers.length + sellerNotifications.length}</span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Transfers</h3>
                  <button 
                    onClick={() => setNotificationOpen(false)}
                    className="close-notification"
                  >
                    <X size={18} />
                  </button>
                </div>

                {pendingTransfers.length === 0 && sentTransfers.length === 0 ? (
                  <div className="no-notifications">
                    <p>No pending transfers</p>
                  </div>
                ) : (
                  <div className="notification-list">
                    {/* Received Transfers */}
                    {pendingTransfers.length > 0 && (
                      <>
                        <div className="notification-section-header">Received Requests</div>
                        {pendingTransfers.map((transfer) => (
                          <div key={transfer.id} className="notification-item received">
                            <div className="notification-content">
                              <h4>{transfer.properties?.name || 'Property'}</h4>
                              <p className="from-email">From: {transfer.sender?.[0]?.email || 'Unknown'}</p>
                              <p className="fractions-info">
                                <strong>{transfer.num_fractions}</strong> fractions · {formatFCFA(transfer.total_amount, 2)}
                              </p>
                            </div>
                            <div className="notification-actions">
                              <button 
                                onClick={() => handleAcceptTransfer(transfer.id)}
                                className="accept-btn-small"
                                disabled={loading}
                              >
                                <Check size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeclineTransfer(transfer.id)}
                                className="decline-btn-small"
                                disabled={loading}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    {/* Sent Transfers */}
                    {sentTransfers.length > 0 && (
                      <>
                        <div className="notification-section-header sent">Sent Requests</div>
                        {sentTransfers.map((transfer) => (
                          <div key={transfer.id} className="notification-item sent">
                            <div className="notification-content">
                              <h4>{transfer.properties?.name || 'Property'}</h4>
                              <p className="from-email">To: {transfer.to_user_email}</p>
                              <p className="fractions-info">
                                <strong>{transfer.num_fractions}</strong> fractions · {formatFCFA(transfer.total_amount, 2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    {/* Seller Notifications - New Investments */}
                    {sellerNotifications.length > 0 && (
                      <>
                        <div className="notification-section-header seller">Sales</div>
                        {sellerNotifications.slice(0, 5).map((notification) => (
                          <div key={notification.id} className="notification-item seller">
                            <div className="notification-content">
                              <h4>{notification.properties?.name || 'Property'}</h4>
                              <p className="investor-name">Investor: {notification.investor?.full_name || notification.investor?.email}</p>
                              <p className="fractions-info">
                                <strong>{notification.num_fractions}</strong> fractions · {formatFCFA(notification.total_amount, 2)}
                              </p>
                            </div>
                          </div>
                        ))}
                        {sellerNotifications.length > 5 && (
                          <div className="notification-view-all">
                            +{sellerNotifications.length - 5} more investments
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link to="/CreateListing" className="create-listing-btn">
            <Plus size={18} />
            <span>Create Listing</span>
          </Link>
          
          <div className="user-menu">
            <Link to="/profile" className="profile-link">
              <User size={18} />
              <span>{firstName}</span>
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu - Additional Actions */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/CreateListing" className="mobile-menu-item">
            <Plus size={18} />
            Create Listing
          </Link>
          <Link to="/profile" className="mobile-menu-item">
            <User size={18} />
            {firstName}
          </Link>
          <button 
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="mobile-menu-item"
          >
            <Bell size={18} />
            Transfers {(pendingTransfers.length + sentTransfers.length) > 0 && `(${pendingTransfers.length + sentTransfers.length})`}
          </button>
          <button onClick={handleLogout} className="mobile-menu-item logout">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;



// import react, { useState } from "react";
// import './Navbar.css'



// function Navbar() {
//   return (
//     <>

//    <nav className="navbar">
//     <div className="navbar-container">
//       <link to="/" className="navbar-logo"> <h1>Adamz</h1> 
//       </link>
//     </div>
//     <div>
//       <ul>
//         <li>Home</li>
//         <li>Home</li>
//         <li>Home</li>
//         <li>Home</li>
//         <li>Home</li>
//       </ul>
//       </div>
//    </nav>
//     </>
//   )
// }

// export default Navbar
