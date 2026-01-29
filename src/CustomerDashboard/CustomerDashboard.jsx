import React, { useState, useEffect } from 'react';
import { useThemeValues } from '../Theme/Theme';
import SafetyGraphs from '../Components/SafetyGraphs';
import urls from '../Urls/Urls';

const DeviceDetailsModal = ({ device, onClose, theme, onUpdateArmed, realTimeSensorData }) => {
  if (!device) return null;

  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  };

  const contentStyle = {
    background: theme.palette.bg.card,
    borderRadius: '16px',
    padding: '30px',
    maxWidth: '700px',
    width: '100%',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    border: `1px solid ${theme.palette.border}`,
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    borderBottom: `1px solid ${theme.palette.border}`,
    paddingBottom: '16px',
  };

  const titleStyle = {
    fontSize: '22px',
    fontWeight: '700',
    color: theme.palette.text.primary,
    margin: 0,
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: theme.palette.text.secondary,
    padding: '8px',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: theme.palette.text.primary,
    marginBottom: '16px',
    marginTop: '24px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '20px',
  };

  const cardStyle = {
    background: theme.palette.bg.body,
    borderRadius: '8px',
    padding: '16px',
    border: `1px solid ${theme.palette.border}`,
  };

  const labelStyle = {
    fontSize: '12px',
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: '4px',
  };

  const valueStyle = {
    fontSize: '14px',
    color: theme.palette.text.primary,
    fontWeight: '500',
  };

  const arrayItemStyle = {
    background: theme.palette.bg.card,
    padding: '8px 12px',
    borderRadius: '6px',
    marginBottom: '4px',
    border: `1px solid ${theme.palette.border}`,
  };

  // Filter real-time data for this specific device
  const deviceRealtimeData = realTimeSensorData.filter(
    data => data.hub_id === device.id.toString()
  );

  const handleToggleArmed = () => {
    if (onUpdateArmed) {
      onUpdateArmed(device.id, !device.armed);
    }
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={e => e.stopPropagation()}>
        <div style={headerStyle}>
          <div>
            <h2 style={titleStyle}>Device Details: {device.name}</h2>
            <div style={{ 
              fontSize: '14px', 
              color: theme.palette.text.secondary,
              marginTop: '4px'
            }}>
              ID: {device.id} • {device.mac_adress}
            </div>
          </div>
          <button style={closeButtonStyle} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Real-time Sensor Data Section */}
        {deviceRealtimeData.length > 0 && (
          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
            border: `2px solid #3b82f6`,
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: theme.palette.text.primary,
              margin: 0,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📡 Live Sensor Data
            </h3>
            
            <div style={gridStyle}>
              {deviceRealtimeData.map((data, index) => (
                <div key={index} style={{
                  ...cardStyle,
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #3b82f6'
                }}>
                  <div style={labelStyle}>
                    Sensor: {data.sensor_type} ({data.sensor_id})
                  </div>
                  <div style={valueStyle}>
                    <div style={{ 
                      fontSize: '24px', 
                      fontWeight: '700',
                      color: '#3b82f6',
                      marginBottom: '4px'
                    }}>
                      {data.value?.value || 'N/A'}
                    </div>
                    <div style={{ fontSize: '12px', color: theme.palette.text.secondary }}>
                      Type: {data.value?.type || 'normal'}
                    </div>
                    <div style={{ fontSize: '12px', color: theme.palette.text.secondary }}>
                      Source: {data.value?.source || 'backend'}
                    </div>
                    <div style={{ fontSize: '12px', color: theme.palette.text.muted, marginTop: '8px' }}>
                      📅 {data.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Armed Toggle Section */}
        <div style={{
          background: device.armed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          border: `2px solid ${device.armed ? '#10b981' : '#ef4444'}`,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: theme.palette.text.primary,
                margin: 0,
                marginBottom: '8px'
              }}>
                System {device.armed ? 'Armed' : 'Disarmed'}
              </h3>
              <p style={{
                fontSize: '14px',
                color: theme.palette.text.secondary,
                margin: 0,
              }}>
                {device.armed 
                  ? 'All security systems are active and monitoring' 
                  : 'Security systems are temporarily disabled'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div 
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '60px',
                  height: '30px',
                  cursor: 'pointer'
                }}
                onClick={handleToggleArmed}
              >
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  backgroundColor: device.armed ? '#10b981' : '#dc2626',
                  transition: '.4s',
                  borderRadius: '34px',
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '""',
                    height: '22px',
                    width: '22px',
                    left: device.armed ? '34px' : '4px',
                    bottom: '4px',
                    backgroundColor: 'white',
                    transition: '.4s',
                    borderRadius: '50%',
                  }} />
                </span>
              </div>
              <button 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 20px',
                  background: device.armed ? '#10b981' : '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
                onClick={handleToggleArmed}
              >
                {device.armed ? '🔒 Disarm' : '🔓 Arm'}
              </button>
            </div>
          </div>
        </div>

        {/* Basic Device Info */}
        <div style={gridStyle}>
          <div style={cardStyle}>
            <div style={labelStyle}>Device ID</div>
            <div style={valueStyle}>{device.id}</div>
          </div>
          <div style={cardStyle}>
            <div style={labelStyle}>MAC Address</div>
            <div style={valueStyle}>{device.mac_adress}</div>
          </div>
          <div style={cardStyle}>
            <div style={labelStyle}>Status</div>
            <div style={valueStyle}>
              <span style={{
                color: device.is_claimed ? '#10b981' : '#ef4446',
                fontWeight: '600',
              }}>
                {device.is_claimed ? 'Claimed' : 'Unclaimed'}
              </span>
            </div>
          </div>
          <div style={cardStyle}>
            <div style={labelStyle}>Armed Status</div>
            <div style={valueStyle}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: device.armed ? '#10b981' : '#dc2626',
              }}>
                {device.armed ? '🔒 Armed' : '🔓 Disarmed'}
              </div>
            </div>
          </div>
        </div>

        {/* Captive Data - Sensors */}
        {device.captive_data?.sensors && (
          <div>
            <h4 style={sectionTitleStyle}>Configured Sensors</h4>
            <div style={gridStyle}>
              {Object.entries(device.captive_data.sensors).map(([sensorType, sensorData]) => (
                <div key={sensorType} style={cardStyle}>
                  <div style={labelStyle}>{sensorType.replace(/_/g, ' ')}</div>
                  {Array.isArray(sensorData) ? (
                    <div>
                      {sensorData.map((sensor, index) => (
                        <div key={index} style={arrayItemStyle}>
                          <div style={valueStyle}>
                            {sensor.id && <div>ID: {sensor.id}</div>}
                            {sensor.name && <div>Name: {sensor.name}</div>}
                            {!sensor.id && !sensor.name && JSON.stringify(sensor)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : sensorData && typeof sensorData === 'object' ? (
                    <div style={valueStyle}>
                      {sensorData.id && <div>ID: {sensorData.id}</div>}
                      {sensorData.name && <div>Name: {sensorData.name}</div>}
                    </div>
                  ) : (
                    <div style={valueStyle}>{String(sensorData)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CustomerDashboard = () => {
  const theme = useThemeValues();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [updatingArmed, setUpdatingArmed] = useState(false);
  const [realTimeSensorData, setRealTimeSensorData] = useState([]);
  const [mqttConnected, setMqttConnected] = useState(false);
  
  // Get user data and token from localStorage
  const userData = localStorage.getItem('user');
  const user = JSON.parse(userData); 
  const userId = user?.id;
  const token = localStorage.getItem('access_token') || localStorage.getItem('token');

  useEffect(() => {
    if (userId && token) {
      fetchDevices();
    } else if (!token) {
      setError('Authentication required. Please log in again.');
      setLoading(false);
    }
  }, [userId, token]);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${urls.get_customer_devices}${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("full data",data);
      
      setDevices(data.devices || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch devices. Please try again later.');
      console.error('Error fetching devices:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSensorDataUpdate = (sensorData) => {
    console.log("Received sensor data:", sensorData);
    
    setRealTimeSensorData(prev => {
      // Keep only last 50 readings to prevent memory issues
      const newData = [sensorData, ...prev.slice(0, 49)];
      return newData;
    });
  };

  const handleUpdateArmed = async (deviceId, newArmedStatus) => {
    try {
      setUpdatingArmed(true);
      
      setDevices(prevDevices => 
        prevDevices.map(device => 
          device.id === deviceId 
            ? { ...device, armed: newArmedStatus }
            : device
        )
      );
      
      if (selectedDevice && selectedDevice.id === deviceId) {
        setSelectedDevice(prev => ({
          ...prev,
          armed: newArmedStatus
        }));
      }
      
      console.log(`Updated device ${deviceId} armed status to: ${newArmedStatus}`);
      alert(`Device ${newArmedStatus ? 'armed' : 'disarmed'} successfully!`);
      
    } catch (err) {
      console.error('Error updating armed status:', err);
      alert('Failed to update armed status. Please try again.');
      fetchDevices();
    } finally {
      setUpdatingArmed(false);
    }
  };

  const getTotalDevices = () => devices.length;
  const getTotalSensors = () => {
    return devices.reduce((total, device) => {
      if (device.captive_data?.sensors) {
        const sensors = device.captive_data.sensors;
        let count = Object.keys(sensors).filter(key => key !== 'Door_window').length;
        if (sensors.Door_window && Array.isArray(sensors.Door_window)) {
          count += sensors.Door_window.length;
        }
        return total + count;
      }
      return total;
    }, 0);
  };
  const getTotalCameras = () => {
    return devices.reduce((total, device) => {
      if (device.captive_data?.cams) {
        return total + Object.keys(device.captive_data.cams).length;
      }
      return total;
    }, 0);
  };
  const getClaimedDevices = () => devices.filter(device => device.is_claimed).length;
  const getArmedDevices = () => devices.filter(device => device.armed).length;

  // Get latest sensor readings count
  const getLiveSensorReadings = () => {
    const uniqueSensors = new Set();
    realTimeSensorData.forEach(data => {
      uniqueSensors.add(`${data.hub_id}-${data.sensor_id}`);
    });
    return uniqueSensors.size;
  };

  const containerStyle = {
    padding: '24px',
    minHeight: '100vh',
    background: theme.palette.bg.body,
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: theme.palette.text.primary,
  };

  const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  };

  const sectionStyle = {
    background: theme.palette.bg.card,
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: theme.palette.shadow,
    border: `1px solid ${theme.palette.border}`,
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
    background: status ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
    color: status ? '#10b981' : '#ef4444',
    display: 'inline-block',
  });

  const deviceRowStyle = {
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  const statCards = [
    { 
      text: 'Total Devices', 
      heading: getTotalDevices().toString(), 
      image: '📡',
      description: 'Connected hubs'
    },
    { 
      text: 'Live Sensors', 
      heading: getLiveSensorReadings().toString(), 
      image: '📊',
      description: 'Active readings',
      color: '#3b82f6'
    },
    { 
      text: 'Total Sensors', 
      heading: getTotalSensors().toString(), 
      image: '🔄',
      description: 'Configured sensors'
    },
    { 
      text: 'Armed Devices', 
      heading: getArmedDevices().toString(), 
      image: '🔒',
      description: 'Active security'
    },
    { 
      text: 'Security Cameras', 
      heading: getTotalCameras().toString(), 
      image: '📹',
      description: 'Connected cameras'
    },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleDeviceClick = (device) => {
    console.log("Clicked device details:", device);
    setSelectedDevice(device);
  };

  // Get real-time data for specific device
  const getDeviceLiveData = (deviceId) => {
    return realTimeSensorData.filter(data => data.hub_id === deviceId.toString());
  };

  // Get latest sensor value for display in table
  const getLatestSensorValue = (deviceId) => {
    const deviceData = getDeviceLiveData(deviceId);
    if (deviceData.length > 0) {
      const latest = deviceData[0];
      return latest.value?.value || 'No data';
    }
    return 'No data';
  };

  if (!token) {
    return (
      <div style={containerStyle}>
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          color: '#ef4444' 
        }}>
          Authentication required. Please log in to access the dashboard.
          <button 
            onClick={() => window.location.href = '/login'}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: theme.palette.primary,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{ fontSize: '16px', color: theme.palette.text.secondary }}>
            Loading devices...
          </div>
          <div style={{ fontSize: '12px', color: theme.palette.text.muted }}>
            User ID: {userId}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={{ 
          color: '#ef4444', 
          textAlign: 'center', 
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div>{error}</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={fetchDevices}
              style={{
                padding: '10px 20px',
                background: theme.palette.primary,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Retry
            </button>
            <button 
              onClick={handleLogout}
              style={{
                padding: '10px 20px',
                background: theme.palette.bg.body,
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.border}`,
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {selectedDevice && (
        <DeviceDetailsModal
          device={selectedDevice}
          onClose={() => setSelectedDevice(null)}
          theme={theme}
          onUpdateArmed={handleUpdateArmed}
          realTimeSensorData={getDeviceLiveData(selectedDevice.id)}
        />
      )}
      
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Safety Monitoring Dashboard</h1>
          <div style={{ 
            fontSize: '14px', 
            color: theme.palette.text.secondary, 
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <span>User ID: {userId}</span>
            <span>•</span>
            <span>{devices.length} device(s) found</span>
            <span>•</span>
            <span>Live sensors: {getLiveSensorReadings()}</span>
            <span>•</span>
            <span>Armed: {getArmedDevices()}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={fetchDevices}
            disabled={updatingArmed}
            style={{
              padding: '10px 20px',
              background: theme.palette.bg.cardGradient,
              color: theme.palette.text.onCard,
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: updatingArmed ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: updatingArmed ? 0.6 : 1,
            }}
          >
            {updatingArmed ? '⏳ Updating...' : '🔄 Refresh'}
          </button>
          <button 
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: theme.palette.bg.body,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.border}`,
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={cardGridStyle}>
        {statCards.map((card, index) => (
          <div key={index} style={{
            background: theme.palette.bg.card,
            borderRadius: '12px',
            padding: '20px',
            boxShadow: theme.palette.shadow,
            border: `1px solid ${theme.palette.border}`,
            borderTop: card.color ? `4px solid ${card.color}` : undefined,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: theme.palette.text.secondary }}>
                  {card.text}
                </div>
                <div style={{ 
                  fontSize: '32px', 
                  fontWeight: '700', 
                  color: card.color || theme.palette.text.primary 
                }}>
                  {card.heading}
                </div>
              </div>
              <div style={{ fontSize: '32px' }}>
                {card.image}
              </div>
            </div>
            <div style={{
              fontSize: '13px',
              color: theme.palette.text.secondary,
              marginTop: '8px',
            }}>
              {card.description}
            </div>
          </div>
        ))}
      </div>

      <div style={sectionStyle}>
        <SafetyGraphs onSensorDataUpdate={handleSensorDataUpdate} />
      </div>

      <div style={sectionStyle}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: theme.palette.text.primary }}>
            Your Devices
          </h2>
          <div style={{
            fontSize: '14px',
            color: theme.palette.text.secondary,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {realTimeSensorData.length > 0 && (
              <span style={{
                padding: '4px 8px',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '4px',
                color: '#3b82f6',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                📡 Live data active
              </span>
            )}
            <span>Click any device to view details</span>
          </div>
        </div>
        {devices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: theme.palette.text.secondary }}>
            No devices found. Please add a device to get started.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Device Name</th>
                  <th style={thStyle}>MAC Address</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Armed</th>
                  <th style={thStyle}>Live Data</th>
                  <th style={thStyle}>Created</th>
                  <th style={thStyle}>Sensors</th>
                  <th style={thStyle}>Cameras</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => {
                  const deviceLiveData = getDeviceLiveData(device.id);
                  const hasLiveData = deviceLiveData.length > 0;
                  
                  return (
                    <tr 
                      key={device.id}
                      style={deviceRowStyle}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${theme.palette.primary}10`}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={() => handleDeviceClick(device)}
                    >
                      <td style={tdStyle}>
                        <div style={{ fontWeight: '600', color: theme.palette.primary, cursor: 'pointer' }}>
                          {device.name}
                          {hasLiveData && (
                            <span style={{
                              marginLeft: '8px',
                              fontSize: '10px',
                              background: '#3b82f6',
                              color: 'white',
                              padding: '2px 6px',
                              borderRadius: '10px'
                            }}>
                              LIVE
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '12px', color: theme.palette.text.muted }}>
                          ID: {device.id}
                        </div>
                      </td>
                      <td style={tdStyle}>{device.mac_adress}</td>
                      <td style={tdStyle}>
                        <span style={statusBadgeStyle(device.is_claimed)}>
                          {device.is_claimed ? 'Claimed' : 'Unclaimed'}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <span style={{
                          ...statusBadgeStyle(device.armed),
                          background: device.armed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        }}>
                          {device.armed ? '🔒 Armed' : '🔓 Disarmed'}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        {hasLiveData ? (
                          <div>
                            <div style={{ 
                              fontWeight: '600', 
                              color: '#3b82f6',
                              fontSize: '14px'
                            }}>
                              {deviceLiveData[0].value?.value || 'N/A'}
                            </div>
                            <div style={{ fontSize: '11px', color: theme.palette.text.muted }}>
                              {deviceLiveData.length} reading(s)
                            </div>
                          </div>
                        ) : (
                          <div style={{ 
                            fontSize: '12px', 
                            color: theme.palette.text.secondary,
                            fontStyle: 'italic'
                          }}>
                            No live data
                          </div>
                        )}
                      </td>
                      <td style={tdStyle}>{formatDate(device.created_at)}</td>
                      <td style={tdStyle}>
                        {device.captive_data?.sensors ? 
                          Object.keys(device.captive_data.sensors)
                            .filter(key => key !== 'Door_window').length + 
                            (device.captive_data.sensors.Door_window?.length || 0)
                          : '0'
                        }
                      </td>
                      <td style={tdStyle}>
                        {device.captive_data?.cams ? 
                          Object.keys(device.captive_data.cams).length : '0'
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default CustomerDashboard;