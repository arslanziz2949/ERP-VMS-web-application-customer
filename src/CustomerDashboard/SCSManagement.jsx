import React, { useState } from 'react';
import { useTheme } from '../Theme/ThemeContext';

const SCSManagement = () => {
  const { mode } = useTheme();
  const [scsDevices, setScsDevices] = useState([
    { id: 1, name: 'SCS-001', type: 'Main Controller', status: 'Active', location: 'Living Room', power: '120W', lastSeen: '2 mins ago' },
    { id: 2, name: 'SCS-002', type: 'Sub Controller', status: 'Active', location: 'Kitchen', power: '80W', lastSeen: '5 mins ago' },
    { id: 3, name: 'SCS-003', type: 'Main Controller', status: 'Inactive', location: 'Bedroom', power: '0W', lastSeen: '1 hour ago' },
    { id: 4, name: 'SCS-004', type: 'Gateway', status: 'Active', location: 'Office', power: '60W', lastSeen: '15 mins ago' },
    { id: 5, name: 'SCS-005', type: 'Sub Controller', status: 'Pending', location: 'Garage', power: '80W', lastSeen: '2 hours ago' },
  ]);

  const containerStyle = {
    padding: '24px',
    minHeight: '100vh',
    background: 'var(--bg-primary)',
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
    color: 'var(--text-primary)',
    margin: 0,
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  };

  const tableContainerStyle = {
    background: 'var(--bg-card)',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--border-color)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    padding: '16px',
    textAlign: 'left',
    borderBottom: '2px solid var(--border-color)',
    color: 'var(--text-secondary)',
    fontWeight: '600',
    fontSize: '14px',
  };

  const tdStyle = {
    padding: '16px',
    borderBottom: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    fontSize: '14px',
  };

  const statusBadgeStyle = (status) => ({
    padding: '6px 12px',
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

  const actionButtonStyle = {
    padding: '6px 12px',
    background: 'transparent',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '13px',
    marginRight: '8px',
  };

  const toggleDeviceStatus = (id) => {
    setScsDevices(devices =>
      devices.map(device =>
        device.id === id
          ? {
              ...device,
              status: device.status === 'Active' ? 'Inactive' : 'Active',
              lastSeen: 'Just now'
            }
          : device
      )
    );
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>SCS Management</h1>
        {/* <button style={buttonStyle}>
          + Add New SCS Device
        </button> */}
      </div>

      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Device Name</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Power Usage</th>
              <th style={thStyle}>Last Update</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scsDevices.map(device => (
              <tr key={device.id}>
                <td style={tdStyle}>
                  <div style={{ fontWeight: '600' }}>{device.name}</div>
                </td>
                <td style={tdStyle}>{device.type}</td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle(device.status)}>
                    {device.status}
                  </span>
                </td>
                <td style={tdStyle}>{device.location}</td>
                <td style={tdStyle}>{device.power}</td>
                <td style={tdStyle}>{device.lastSeen}</td>
                <td style={tdStyle}>
                  <button
                    style={actionButtonStyle}
                    onClick={() => toggleDeviceStatus(device.id)}
                  >
                    {device.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    style={actionButtonStyle}
                    onClick={() => console.log('Configure', device.id)}
                  >
                    Configure
                  </button>
                  <button
                    style={{
                      ...actionButtonStyle,
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                      borderColor: '#ef4444',
                    }}
                    onClick={() => console.log('Delete', device.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Device Statistics */}
      <div style={{
        marginTop: '32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
      }}>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Total Devices
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text-primary)' }}>
            {scsDevices.length}
          </div>
        </div>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Active Devices
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#10b981' }}>
            {scsDevices.filter(d => d.status === 'Active').length}
          </div>
        </div>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Total Power
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text-primary)' }}>
            340W
          </div>
        </div>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Uptime
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#8b5cf6' }}>
            99.8%
          </div>
        </div>
      </div>
    </div>
  );
};

export default SCSManagement;