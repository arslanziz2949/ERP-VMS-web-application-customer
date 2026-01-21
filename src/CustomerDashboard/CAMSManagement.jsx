import React, { useState } from 'react';
import { useTheme } from '../Theme/ThemeContext';

const CAMSManagement = () => {
  const { mode } = useTheme();
  const [cameras, setCameras] = useState([
    { id: 1, name: 'CAM-001', type: 'Indoor', status: 'Active', location: 'Living Room', resolution: '4K', storage: '64GB', lastRecording: '2 mins ago' },
    { id: 2, name: 'CAM-002', type: 'Outdoor', status: 'Active', location: 'Front Door', resolution: '2K', storage: '128GB', lastRecording: '5 mins ago' },
    { id: 3, name: 'CAM-003', type: 'Indoor', status: 'Inactive', location: 'Kitchen', resolution: '1080p', storage: '32GB', lastRecording: '1 hour ago' },
    { id: 4, name: 'CAM-004', type: 'PTZ', status: 'Active', location: 'Backyard', resolution: '4K', storage: '256GB', lastRecording: '15 mins ago' },
    { id: 5, name: 'CAM-005', type: 'Doorbell', status: 'Pending', location: 'Main Gate', resolution: '1080p', storage: '16GB', lastRecording: '2 hours ago' },
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

  const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  };

  const cardStyle = {
    background: 'var(--bg-card)',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--border-color)',
  };

  const cameraPreviewStyle = {
    width: '100%',
    height: '180px',
    background: mode === 'light' ? '#f1f5f9' : '#334155',
    borderRadius: '8px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-secondary)',
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
    padding: '8px 16px',
    background: 'transparent',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '13px',
    marginRight: '8px',
    marginTop: '12px',
  };

  const toggleCameraStatus = (id) => {
    setCameras(cams =>
      cams.map(cam =>
        cam.id === id
          ? {
              ...cam,
              status: cam.status === 'Active' ? 'Inactive' : 'Active',
              lastRecording: 'Just now'
            }
          : cam
      )
    );
  };

  const startRecording = (id) => {
    setCameras(cams =>
      cams.map(cam =>
        cam.id === id
          ? { ...cam, lastRecording: 'Recording...' }
          : cam
      )
    );
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>CAMS Management</h1>
        {/* <button style={buttonStyle}>
          + Add New Camera
        </button> */}
      </div>

      {/* Camera Grid */}
      <div style={cardGridStyle}>
        {cameras.map(camera => (
          <div key={camera.id} style={cardStyle}>
            <div style={cameraPreviewStyle}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>📹</div>
                <div>Live Preview</div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>
                  {camera.status === 'Active' ? 'Streaming' : 'Offline'}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontWeight: '600', fontSize: '16px', color: 'var(--text-primary)' }}>
                {camera.name}
              </div>
              <span style={statusBadgeStyle(camera.status)}>
                {camera.status}
              </span>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Location: <span style={{ color: 'var(--text-primary)' }}>{camera.location}</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Type: <span style={{ color: 'var(--text-primary)' }}>{camera.type}</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Resolution: <span style={{ color: 'var(--text-primary)' }}>{camera.resolution}</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Storage: <span style={{ color: 'var(--text-primary)' }}>{camera.storage}</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Last Recording: <span style={{ color: 'var(--text-primary)' }}>{camera.lastRecording}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                style={{
                  ...actionButtonStyle,
                  background: camera.status === 'Active' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  color: camera.status === 'Active' ? '#ef4444' : '#10b981',
                  borderColor: camera.status === 'Active' ? '#ef4444' : '#10b981',
                }}
                onClick={() => toggleCameraStatus(camera.id)}
              >
                {camera.status === 'Active' ? 'Stop' : 'Start'}
              </button>
              <button
                style={actionButtonStyle}
                onClick={() => startRecording(camera.id)}
              >
                Record
              </button>
              <button
                style={actionButtonStyle}
                onClick={() => console.log('Configure', camera.id)}
              >
                Settings
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Camera Statistics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '32px',
      }}>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Total Cameras
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text-primary)' }}>
            {cameras.length}
          </div>
        </div>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Recording Now
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#8b5cf6' }}>
            3
          </div>
        </div>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Storage Used
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text-primary)' }}>
            496GB
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
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#10b981' }}>
            99.9%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAMSManagement;