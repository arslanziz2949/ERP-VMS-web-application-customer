import React, { useState, useEffect } from 'react';
import { useTheme } from '../Theme/ThemeContext';
import { useThemeValues } from '../Theme/Theme';
import SafetyGraphs from '../Components/SafetyGraphs';

const CustomerDashboard = () => {
  const { mode } = useTheme();
  const theme = useThemeValues();
  const [isMobile, setIsMobile] = useState(false);
  const [registrationDate, setRegistrationDate] = useState('');

  const containerStyle = {
    padding: isMobile ? '16px' : '24px',
    minHeight: '100vh',
    background: theme.palette.bg.body,
    maxWidth: '100%',
    overflowX: 'hidden',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '16px' : '0',
  };

  const titleStyle = {
    fontSize: isMobile ? '20px' : '24px',
    fontWeight: '700',
    color: theme.palette.text.primary,
    margin: 0,
  };

  const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  };

  const sectionStyle = {
    background: theme.palette.bg.card,
    borderRadius: '12px',
    padding: isMobile ? '16px' : '24px',
    marginBottom: '24px',
    boxShadow: theme.palette.shadow,
    border: `1px solid ${theme.palette.border}`,
    transition: 'all 0.3s ease',
    overflow: 'hidden',
  };

  const sectionTitleStyle = {
    fontSize: isMobile ? '16px' : '18px',
    fontWeight: '600',
    color: theme.palette.text.primary,
    marginBottom: isMobile ? '16px' : '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const tableContainerStyle = {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: isMobile ? '600px' : 'auto',
  };

  const thStyle = {
    padding: isMobile ? '8px 12px' : '12px',
    textAlign: 'left',
    borderBottom: `2px solid ${theme.palette.border}`,
    color: theme.palette.text.secondary,
    fontWeight: '600',
    fontSize: '14px',
    whiteSpace: 'nowrap',
  };

  const tdStyle = {
    padding: isMobile ? '8px 12px' : '12px',
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const getRegistrationDate = () => {
      const registeredDate = localStorage.getItem('user_registration_date') || '2024-01-15';
      setRegistrationDate(registeredDate);
    };
    
    checkMobile();
    getRegistrationDate();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const formatRegistrationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysSinceRegistration = () => {
    if (!registrationDate) return 0;
    const regDate = new Date(registrationDate);
    const today = new Date();
    const diffTime = Math.abs(today - regDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const statCards = [
    {
      text: 'Active Devices',
      heading: '24',
      image: '📡',
      change: '+12%',
      changeType: 'increase',
      shortDescription: `Registered on ${formatRegistrationDate(registrationDate)}`
    },
    {
      text: 'Security Cameras',
      heading: '48',
      image: '📹',
      change: '+8%',
      changeType: 'increase',
      shortDescription: `${getDaysSinceRegistration()} days of surveillance`
    },
    {
      text: 'Power Usage',
      heading: '2.4 kW',
      image: '⚡',
      change: '-5%',
      changeType: 'decrease',
      shortDescription: 'Optimized via mobile controls'
    },
    {
      text: isMobile ? 'Mobile App' : 'System Status',
      heading: isMobile ? 'Active' : 'Connected',
      image: '📱',
      change: isMobile ? '✓ Online' : '↗ 15%',
      changeType: isMobile ? 'online' : 'increase',
      shortDescription: isMobile ? 'Using mobile app' : 'All systems operational'
    }
  ];

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>
            Safety Monitoring Dashboard
            {isMobile && <span style={{ fontSize: '14px', color: theme.palette.text.secondary, marginLeft: '10px' }}>📱 Mobile</span>}
          </h1>
          <p style={{
            fontSize: '14px',
            color: theme.palette.text.secondary,
            marginTop: '8px'
          }}>
            {isMobile
              ? `Real-time monitoring since ${formatRegistrationDate(registrationDate)}`
              : `Registered on ${formatRegistrationDate(registrationDate)} • ${getDaysSinceRegistration()} days of service`
            }
          </p>
        </div>
        <div style={{ 
          display: 'flex', 
          gap: '12px',
          width: isMobile ? '100%' : 'auto',
        }}>
          <button style={{
            padding: isMobile ? '8px 16px' : '10px 20px',
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
            flex: isMobile ? 1 : 'auto',
            justifyContent: 'center',
          }}>
            <span>⚙️</span> {isMobile ? 'Settings' : 'Dashboard Settings'}
          </button>
          {!isMobile && (
            <button style={{
              padding: '10px 20px',
              background: theme.palette.bg.body,
              border: `1px solid ${theme.palette.border}`,
              color: theme.palette.text.primary,
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span>📊</span> Export Report
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div style={cardGridStyle}>
        {statCards.map((card, index) => (
          <div key={index} style={{
            background: theme.palette.bg.card,
            borderRadius: '12px',
            padding: isMobile ? '16px' : '20px',
            boxShadow: theme.palette.shadow,
            border: `1px solid ${theme.palette.border}`,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
            onMouseOver={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = theme.palette.shadowLg;
              }
            }}
            onMouseOut={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = theme.palette.shadow;
              }
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
                  fontSize: isMobile ? '14px' : '16px',
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
                  fontSize: isMobile ? '28px' : '32px',
                  fontWeight: '700',
                  color: theme.palette.text.primary,
                  margin: '8px 0',
                }}>
                  {card.heading}
                </div>
              </div>
              <div style={{
                width: isMobile ? '40px' : '48px',
                height: isMobile ? '40px' : '48px',
                borderRadius: '12px',
                background: theme.palette.bg.cardGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '20px' : '24px',
              }}>
                {card.image}
              </div>
            </div>

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

      {/* Safety Graphs Component */}
      <div style={sectionStyle}>
        <SafetyGraphs />
      </div>

      {/* Recent Activity */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          <span>📋</span> Recent Activity
        </h2>
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Device</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Last Update</th>
                {!isMobile && <th style={thStyle}>Power</th>}
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
                        width: isMobile ? '28px' : '32px',
                        height: isMobile ? '28px' : '32px',
                        borderRadius: '6px',
                        background: theme.palette.primaryLight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.palette.primary,
                        fontSize: isMobile ? '14px' : '16px',
                      }}>
                        {row.type.includes('Camera') ? '📹' : '📡'}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: isMobile ? '14px' : '16px' }}>{row.device}</div>
                        <div style={{ fontSize: '12px', color: theme.palette.text.muted }}>Added via mobile app</div>
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>{row.type}</td>
                  <td style={tdStyle}>
                    <span style={statusBadgeStyle(row.status)}>{row.status}</span>
                  </td>
                  <td style={tdStyle}>{row.lastUpdate}</td>
                  {!isMobile && <td style={tdStyle}>{row.power}</td>}
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
      </div>

      {/* Quick Actions */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          <span>⚡</span> Quick Actions
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px' 
        }}>
          <button
            style={{
              padding: isMobile ? '12px 16px' : '12px 24px',
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
              justifyContent: 'center',
              fontSize: isMobile ? '14px' : '16px',
            }}
            onMouseOver={(e) => {
              e.target.style.background = theme.palette.primaryLight;
            }}
            onMouseOut={(e) => {
              e.target.style.background = theme.palette.bg.body;
            }}
          >
            <span>📱</span> {isMobile ? 'Mobile App' : 'Open Mobile App'}
          </button>
          <button style={{
            padding: isMobile ? '12px 16px' : '12px 24px',
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
            justifyContent: 'center',
            fontSize: isMobile ? '14px' : '16px',
          }}
            onMouseOver={(e) => {
              e.target.style.background = theme.palette.primaryLight;
            }}
            onMouseOut={(e) => {
              e.target.style.background = theme.palette.bg.body;
            }}
          >
            <span>🔄</span> {isMobile ? 'Sync Data' : 'Sync Mobile Data'}
          </button>
          <button style={{
            padding: isMobile ? '12px 16px' : '12px 24px',
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
            justifyContent: 'center',
            fontSize: isMobile ? '14px' : '16px',
          }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(16, 185, 129, 0.1)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = theme.palette.bg.body;
            }}
          >
            <span>📊</span> {isMobile ? 'Analytics' : 'View Analytics'}
          </button>
          <button style={{
            padding: isMobile ? '12px 16px' : '12px 24px',
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
            justifyContent: 'center',
            fontSize: isMobile ? '14px' : '16px',
          }}
            onMouseOver={(e) => {
              e.target.style.background = theme.palette.primaryLight;
            }}
            onMouseOut={(e) => {
              e.target.style.background = theme.palette.bg.body;
            }}
          >
            <span>📧</span> {isMobile ? 'Support' : 'Contact Support'}
          </button>
        </div>
      </div>

      {/* Registration Summary */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          <span>📅</span> Registration Summary
        </h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '16px' : '24px',
          background: theme.palette.bg.header,
          borderRadius: '12px',
          padding: isMobile ? '16px' : '20px',
          border: `1px solid ${theme.palette.border}`,
          flexDirection: isMobile ? 'column' : 'row',
        }}>
          <div style={{
            width: isMobile ? '60px' : '80px',
            height: isMobile ? '60px' : '80px',
            borderRadius: '50%',
            background: theme.palette.bg.cardGradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '24px' : '32px',
            color: theme.palette.text.onCard,
            flexShrink: 0,
          }}>
            📅
          </div>
          <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
            <div style={{ 
              fontSize: isMobile ? '16px' : '18px', 
              fontWeight: '600', 
              color: theme.palette.text.primary, 
              marginBottom: '8px' 
            }}>
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
            padding: isMobile ? '8px 16px' : '12px 20px',
            background: theme.palette.bg.cardGradient,
            color: theme.palette.text.onCard,
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: isMobile ? '14px' : '16px',
            flexShrink: 0,
          }}>
            {getDaysSinceRegistration()} Days
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .quick-actions {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 360px) {
          .container {
            padding: 12px !important;
          }
          
          .section {
            padding: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerDashboard;