import React, { useState, useEffect } from 'react';
import { useTheme } from '../Theme/ThemeContext';
import { useThemeValues } from '../Theme/theme';
import Card from '../Components/Cards';

const CustomerDashboard = () => {
  const { mode } = useTheme();
  const theme = useThemeValues();
  const [isMobile, setIsMobile] = useState(false);
  const [registrationDate, setRegistrationDate] = useState('');
  
  const containerStyle = {
    padding: '24px',
    minHeight: '100vh',
    background: theme.palette.bg.body,
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: theme.palette.text.primary,
    margin: 0,
  };

  const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  };

  const sectionStyle = {
    background: theme.palette.bg.card,
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: theme.palette.shadow,
    border: `1px solid ${theme.palette.border}`,
    transition: 'all 0.3s ease',
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: theme.palette.text.primary,
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: `2px solid ${theme.palette.border}`,
    color: theme.palette.text.secondary,
    fontWeight: '600',
    fontSize: '14px',
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: `1px solid ${theme.palette.border}`,
    color: theme.palette.text.primary,
    fontSize: '14px',
  };

  const statusBadgeStyle = (status) => ({
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    background: status === 'Active' 
      ? 'rgba(16, 185, 129, 0.1)' 
      : status === 'Pending' 
      ? 'rgba(245, 158, 11, 0.1)' 
      : 'rgba(239, 68, 68, 0.1)',
    color: status === 'Active' 
      ? '#10b981' 
      : status === 'Pending' 
      ? '#f59e0b' 
      : '#ef4444',
    display: 'inline-block',
  });

  useEffect(() => {
    // Check if user is on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Get user registration date from localStorage or API
    const getRegistrationDate = () => {
      const registeredDate = localStorage.getItem('user_registration_date') || '2024-01-15';
      setRegistrationDate(registeredDate);
    };
    
    checkMobile();
    getRegistrationDate();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Format registration date
  const formatRegistrationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate days since registration
  const getDaysSinceRegistration = () => {
    if (!registrationDate) return 0;
    const regDate = new Date(registrationDate);
    const today = new Date();
    const diffTime = Math.abs(today - regDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Stats cards data with short descriptions
  const statCards = [
    {
      text: 'Active Devices',
      heading: '24',
      image: '📡', // You can replace with actual icon paths
      change: '+12%',
      changeType: 'increase',
      shortDescription: isMobile 
        ? `Registered on ${formatRegistrationDate(registrationDate)}` 
        : `${getDaysSinceRegistration()} days active on mobile`
    },
    {
      text: 'Security Cameras',
      heading: '48',
      image: '📹',
      change: '+8%',
      changeType: 'increase',
      shortDescription: isMobile 
        ? `${getDaysSinceRegistration()} days of surveillance` 
        : 'Connected via mobile app'
    },
    {
      text: 'Power Usage',
      heading: '2.4 kW',
      image: '⚡',
      change: '-5%',
      changeType: 'decrease',
      shortDescription: isMobile 
        ? 'Optimized via mobile controls' 
        : 'Controlled through app'
    },
    {
      text: 'Mobile Activity',
      heading: isMobile ? 'Active' : 'Connected',
      image: '📱',
      change: isMobile ? '✓ Online' : '↗ 15%',
      changeType: isMobile ? 'online' : 'increase',
      shortDescription: isMobile 
        ? 'Currently using mobile app' 
        : 'Access via mobile app'
    }
  ];

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>
            Welcome to Your Dashboard
            {isMobile && <span style={{ fontSize: '14px', color: theme.palette.text.secondary, marginLeft: '10px' }}>📱 Mobile</span>}
          </h1>
          <p style={{ 
            fontSize: '14px', 
            color: theme.palette.text.secondary,
            marginTop: '8px' 
          }}>
            {isMobile 
              ? `Using mobile app since ${formatRegistrationDate(registrationDate)}` 
              : `Registered on ${formatRegistrationDate(registrationDate)} • ${getDaysSinceRegistration()} days of service`
            }
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            padding: '10px 20px',
            background: theme.palette.bg.cardGradient,
            color: theme.palette.text.onCard,
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span>⚙️</span> Settings
          </button>
        </div>
      </div>

      {/* Stats Cards using your custom Card component */}
      <div style={cardGridStyle}>
        {statCards.map((card, index) => (
          <div key={index} style={{
            background: theme.palette.bg.card,
            borderRadius: '12px',
            padding: '24px',
            boxShadow: theme.palette.shadow,
            border: `1px solid ${theme.palette.border}`,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = theme.palette.shadowLg;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = theme.palette.shadow;
          }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '12px' 
            }}>
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: theme.palette.text.secondary,
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span>{card.image}</span> {card.text}
                </div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: theme.palette.text.primary,
                  margin: '8px 0',
                }}>
                  {card.heading}
                </div>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: theme.palette.bg.cardGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}>
                {card.image}
              </div>
            </div>
            
            {/* Short description based on mobile registration */}
            <div style={{
              fontSize: '13px',
              color: theme.palette.text.secondary,
              marginTop: '12px',
              padding: '8px',
              background: theme.palette.bg.header,
              borderRadius: '6px',
              borderLeft: `3px solid ${theme.palette.primary}`,
            }}>
              {card.shortDescription}
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: theme.palette.text.secondary,
              marginTop: '12px'
            }}>
              <span style={{ 
                color: card.changeType === 'increase' || card.changeType === 'online' 
                  ? '#10b981' 
                  : '#ef4444', 
                fontWeight: '600' 
              }}>
                {card.change}
              </span>
              <span>from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          <span>📋</span> Recent Activity
        </h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Device</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Last Update</th>
              <th style={thStyle}>Power</th>
              <th style={thStyle}>Connection</th>
            </tr>
          </thead>
          <tbody>
            {[
              { device: 'SCS-001', type: 'Main Controller', status: 'Active', lastUpdate: '2 mins ago', power: '120W', connection: isMobile ? '📱 Mobile' : '💻 Desktop' },
              { device: 'CAM-012', type: 'Security Camera', status: 'Active', lastUpdate: '5 mins ago', power: '45W', connection: isMobile ? '📱 Mobile' : '💻 Desktop' },
              { device: 'SCS-003', type: 'Gateway', status: 'Inactive', lastUpdate: '1 hour ago', power: '0W', connection: '📡 Offline' },
              { device: 'CAM-045', type: 'PTZ Camera', status: 'Pending', lastUpdate: '2 hours ago', power: '45W', connection: isMobile ? '📱 Mobile' : '💻 Desktop' },
              { device: 'SCS-008', type: 'Sub-controller', status: 'Active', lastUpdate: '3 hours ago', power: '120W', connection: isMobile ? '📱 Mobile' : '💻 Desktop' },
            ].map((row, index) => (
              <tr key={index}>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      background: theme.palette.primaryLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.palette.primary,
                    }}>
                      {row.type.includes('Camera') ? '📹' : '📡'}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600' }}>{row.device}</div>
                      <div style={{ fontSize: '12px', color: theme.palette.text.muted }}>Added via mobile app</div>
                    </div>
                  </div>
                </td>
                <td style={tdStyle}>{row.type}</td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle(row.status)}>{row.status}</span>
                </td>
                <td style={tdStyle}>{row.lastUpdate}</td>
                <td style={tdStyle}>{row.power}</td>
                <td style={tdStyle}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    color: theme.palette.text.secondary 
                  }}>
                    {row.connection}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          <span>⚡</span> Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button
            style={{
              padding: '12px 24px',
              background: theme.palette.bg.body,
              border: `2px solid ${theme.palette.primary}`,
              color: theme.palette.primary,
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseOver={(e) => {
              e.target.style.background = theme.palette.primaryLight;
            }}
            onMouseOut={(e) => {
              e.target.style.background = theme.palette.bg.body;
            }}
          >
            <span>📱</span> Open Mobile App
          </button>
          <button style={{
            padding: '12px 24px',
            background: theme.palette.bg.body,
            border: `2px solid ${theme.palette.primary}`,
            color: theme.palette.primary,
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseOver={(e) => {
            e.target.style.background = theme.palette.primaryLight;
          }}
          onMouseOut={(e) => {
            e.target.style.background = theme.palette.bg.body;
          }}
          >
            <span>🔄</span> Sync Mobile Data
          </button>
          <button style={{
            padding: '12px 24px',
            background: theme.palette.bg.body,
            border: `2px solid #10b981`,
            color: '#10b981',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(16, 185, 129, 0.1)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = theme.palette.bg.body;
          }}
          >
            <span>📊</span> View Mobile Analytics
          </button>
          <button style={{
            padding: '12px 24px',
            background: theme.palette.bg.body,
            border: `2px solid ${theme.palette.primary}`,
            color: theme.palette.primary,
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseOver={(e) => {
            e.target.style.background = theme.palette.primaryLight;
          }}
          onMouseOut={(e) => {
            e.target.style.background = theme.palette.bg.body;
          }}
          >
            <span>📧</span> Support Contact
          </button>
        </div>
      </div>

      {/* Mobile App Information */}
      {isMobile && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <span>📱</span> Mobile App Status
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px' 
          }}>
            <div style={{
              background: theme.palette.bg.header,
              borderRadius: '8px',
              padding: '16px',
              border: `1px solid ${theme.palette.border}`,
            }}>
              <div style={{ fontSize: '14px', color: theme.palette.text.secondary, marginBottom: '4px' }}>
                App Version
              </div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: theme.palette.text.primary }}>
                2.4.1
              </div>
            </div>
            <div style={{
              background: theme.palette.bg.header,
              borderRadius: '8px',
              padding: '16px',
              border: `1px solid ${theme.palette.border}`,
            }}>
              <div style={{ fontSize: '14px', color: theme.palette.text.secondary, marginBottom: '4px' }}>
                Last Sync
              </div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: theme.palette.text.primary }}>
                5 mins ago
              </div>
            </div>
            <div style={{
              background: theme.palette.bg.header,
              borderRadius: '8px',
              padding: '16px',
              border: `1px solid ${theme.palette.border}`,
            }}>
              <div style={{ fontSize: '14px', color: theme.palette.text.secondary, marginBottom: '4px' }}>
                Storage Used
              </div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: theme.palette.text.primary }}>
                245 MB
              </div>
            </div>
            <div style={{
              background: theme.palette.bg.header,
              borderRadius: '8px',
              padding: '16px',
              border: `1px solid ${theme.palette.border}`,
            }}>
              <div style={{ fontSize: '14px', color: theme.palette.text.secondary, marginBottom: '4px' }}>
                App Uptime
              </div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: theme.palette.text.primary }}>
                99.8%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Summary */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          <span>📅</span> Registration Summary
        </h2>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '24px',
          background: theme.palette.bg.header,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${theme.palette.border}`,
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: theme.palette.bg.cardGradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            color: theme.palette.text.onCard,
          }}>
            📅
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '18px', fontWeight: '600', color: theme.palette.text.primary, marginBottom: '8px' }}>
              {isMobile ? 'Mobile App User' : 'Registered User'}
            </div>
            <div style={{ fontSize: '14px', color: theme.palette.text.secondary, marginBottom: '4px' }}>
              First registered on {formatRegistrationDate(registrationDate)}
            </div>
            <div style={{ fontSize: '14px', color: theme.palette.text.secondary }}>
              {getDaysSinceRegistration()} days of active service • {isMobile ? 'Primary access via mobile' : 'Access via web & mobile'}
            </div>
          </div>
          <div style={{
            padding: '12px 20px',
            background: theme.palette.bg.cardGradient,
            color: theme.palette.text.onCard,
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px',
          }}>
            {getDaysSinceRegistration()} Days
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;