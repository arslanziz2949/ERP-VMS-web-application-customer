import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../Theme/ThemeContext';
import { useThemeValues } from '../Theme/Theme';

// Mobile Hamburger Menu Button component
export const MobileMenuButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: 'var(--text-primary)',
        padding: '8px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '16px',
        transition: 'all 0.2s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'var(--bg-sidebar-hover)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'transparent';
      }}
      title="Open Menu"
    >
      ☰
    </button>
  );
};

const Sidebar = ({ isMobile = false, isSidebarOpen = false, onCloseSidebar }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userImage, setUserImage] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { mode } = useTheme();
  const theme = useThemeValues();

  useEffect(() => {
    // Get user data from localStorage
    const getUserData = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          
          // Check if user has image in localStorage or from API
          if (user.image && user.image !== "profile.png") {
            // If image is a base64 string or URL
            setUserImage(user.image);
          } else {
            // Try to get image from a separate key
            const userImageData = localStorage.getItem('userImage');
            if (userImageData) {
              setUserImage(userImageData);
            }
          }
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    };

    getUserData();
  }, []);

  // Handle screen resize for desktop
  useEffect(() => {
    if (!isMobile) {
      const handleResize = () => {
        if (window.innerWidth > 1024) {
          setIsCollapsed(false);
        }
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isMobile]);

  // Update main content margin
  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      if (isMobile && !isSidebarOpen) {
        mainContent.style.marginLeft = '0';
      } else if (!isMobile && isCollapsed) {
        mainContent.style.marginLeft = '80px';
      } else if (isMobile && isSidebarOpen) {
        mainContent.style.marginLeft = '280px';
      } else {
        mainContent.style.marginLeft = '280px';
      }
    }
  }, [isCollapsed, isMobile, isSidebarOpen]);

  // Customer menu items
  const customerMenuItems = [
    { icon: '📊', label: 'Customer Dashboard', path: '/customerDashboard' },
    { icon: '📡', label: 'SCS Management', path: '/scsManagement' },
    { icon: '📹', label: 'CAMS Management', path: '/camsManagement' },
    { icon: '📞', label: 'Contact Us', path: '/contactUs' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleMenuItemClick = (path) => {
    navigate(path);
    
    if (isMobile && onCloseSidebar) {
      onCloseSidebar();
    }
    
    if (!isMobile && isCollapsed) {
      setIsCollapsed(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    localStorage.removeItem('userImage');
    navigate('/login');
  };

  const handleToggleSidebar = () => {
    if (isMobile && onCloseSidebar) {
      onCloseSidebar();
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const getUserInfo = () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        return {
          name: user.name || user.username || user.email || 'Customer',
          image: user.image || null
        };
      }
    } catch (error) {
      console.error('Error getting user info:', error);
    }
    return {
      name: 'Customer',
      image: null
    };
  };

  const userInfo = getUserInfo();

  // Get sidebar text colors based on theme
  const getSidebarTextColor = () => {
    return mode === 'light' ? 'var(--text-sidebar)' : 'var(--text-sidebar)';
  };

  const getSidebarActiveTextColor = () => {
    return mode === 'light' ? 'var(--text-sidebar-active)' : 'var(--text-sidebar-active)';
  };

  // Sidebar styles
  const sidebarStyle = {
    width: isMobile ? (isSidebarOpen ? '280px' : '0') : (isCollapsed ? '80px' : '280px'),
    height: '100vh',
    background: 'var(--sidebar-color)',
    color: getSidebarTextColor(),
    transition: 'width 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1100,
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden',
    borderRight: `1px solid var(--border-color)`,
  };

  // Mobile overlay
  const overlayStyle = {
    display: isMobile && isSidebarOpen ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: mode === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.7)',
    zIndex: 1099,
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && (
        <div 
          style={overlayStyle} 
          onClick={onCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <div style={sidebarStyle}>
        {/* Header Section */}
        <div style={{
          padding: '24px 20px',
          borderBottom: `1px solid var(--border-color)`,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '16px',
        }}>
          {/* Toggle button - Desktop */}
          {!isMobile && (
            <button
              onClick={handleToggleSidebar}
              style={{
                position: 'absolute',
                right: '15px',
                top: '15px',
                width: '32px',
                height: '32px',
                background: 'var(--bg-sidebar-hover)',
                border: `1px solid var(--border-color)`,
                borderRadius: '8px',
                color: getSidebarTextColor(),
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                zIndex: 10,
              }}
              onMouseOver={(e) => e.target.style.background = 'var(--bg-card)'}
              onMouseOut={(e) => e.target.style.background = 'var(--bg-sidebar-hover)'}
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? '→' : '←'}
            </button>
          )}

          {/* User Image - Top */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: `3px solid ${getSidebarActiveTextColor()}`,
            boxShadow: mode === 'light' 
              ? '0 4px 12px rgba(0, 0, 0, 0.1)' 
              : '0 4px 12px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: (isMobile && !isSidebarOpen) || isCollapsed ? 0 : 1,
            transition: 'opacity 0.3s ease',
            background: userImage 
              ? `url(${userImage}) center/cover no-repeat`
              : mode === 'light' 
                ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                : 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
          }}>
            {!userImage && (
              <span style={{
                fontSize: '32px',
                color: mode === 'light' ? '#ffffff' : '#f8fafc',
                fontWeight: 'bold',
              }}>
                {userInfo.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Welcome Message - Only show when not collapsed */}
          <div style={{ 
            opacity: (isMobile && !isSidebarOpen) || isCollapsed ? 0 : 1,
            transition: 'opacity 0.3s ease',
            width: '100%',
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '14px',
              fontWeight: 500,
              color: getSidebarTextColor(),
              opacity: 0.8,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              Welcome to
            </h3>
            <h2 style={{
              margin: '4px 0 0 0',
              fontSize: '18px',
              fontWeight: 700,
              color: getSidebarTextColor(),
            }}>
              Customer Portal
            </h2>
          </div>

          {/* User Info - Only show when not collapsed */}
          <div style={{ 
            opacity: (isMobile && !isSidebarOpen) || isCollapsed ? 0 : 1,
            transition: 'opacity 0.3s ease',
            width: '100%',
          }}>
            {/* Username */}
            <h3 style={{
              margin: '16px 0 4px 0',
              fontSize: '16px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: getSidebarActiveTextColor(),
            }}>
              {userInfo.name}
            </h3>
            
            {/* Role with Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '8px',
            }}>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                background: mode === 'light' 
                  ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' 
                  : 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
                color: 'white',
                textTransform: 'uppercase',
              }}>
                CUSTOMER
              </span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav style={{ 
          flex: 1, 
          padding: '16px 0', 
          overflowY: 'auto',
          display: (isMobile && !isSidebarOpen) ? 'none' : 'block'
        }}>
          {customerMenuItems.map((item) => (
            <div
              key={item.path}
              onClick={() => handleMenuItemClick(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 20px',
                margin: '4px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                background: isActive(item.path)
                  ? 'var(--bg-sidebar-hover)'
                  : 'transparent',
                borderLeft: isActive(item.path)
                  ? `3px solid ${getSidebarActiveTextColor()}`
                  : '3px solid transparent',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                color: isActive(item.path) 
                  ? getSidebarActiveTextColor()
                  : getSidebarTextColor(),
              }}
              title={isCollapsed ? item.label : ''}
              onMouseOver={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = 'var(--bg-sidebar-hover)';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateX(0)';
                }
              }}
            >
              <span style={{
                fontSize: '18px',
                minWidth: '24px',
                textAlign: 'center',
                flexShrink: 0
              }}>
                {item.icon}
              </span>

              <span style={{
                marginLeft: '14px',
                fontSize: '14px',
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: (isMobile && !isSidebarOpen) || isCollapsed ? 'none' : 'block'
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{
          padding: '20px',
          borderTop: `1px solid var(--border-color)`,
          display: (isMobile && !isSidebarOpen) ? 'none' : 'block'
        }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: isCollapsed ? '10px' : '12px 16px',
              background: mode === 'light' ? '#8b5cf6' : '#7c3aed',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.background = mode === 'light' ? '#7c3aed' : '#6d28d9'}
            onMouseOut={(e) => e.target.style.background = mode === 'light' ? '#8b5cf6' : '#7c3aed'}
          >
            <span>🚪</span>
            <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Logout</span>
          </button>

          {!isCollapsed && (
            <div style={{
              fontSize: '11px',
              opacity: 0.6,
              textAlign: 'center',
              marginTop: '12px',
              color: getSidebarTextColor(),
            }}>
              Customer Portal v1.0
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;