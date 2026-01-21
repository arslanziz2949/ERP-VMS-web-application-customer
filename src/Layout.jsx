import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import CustomerDashboard from './CustomerDashboard/CustomerDashboard';
import SCSManagement from './CustomerDashboard/SCSManagement';
import CAMSManagement from './CustomerDashboard/CAMSManagement';
import ContactUs from './CustomerDashboard/ContactUs';

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false); // Close sidebar when resizing to desktop
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar 
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={handleCloseSidebar}
      />

      {/* MAIN WRAPPER */}
      <div
        className="main-content"
        style={{
          flex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s ease",
          width: '100%',
        }}
      >
        {/* HEADER */}
        <Header 
          isMobile={isMobile}
          onToggleSidebar={handleToggleSidebar}
        />

        {/* PAGE CONTENT */}
        <div
          style={{
            flex: 1,
            padding: isMobile ? "20px" : "30px",
          }}
        >
          <Routes>
            <Route path="/" element={<CustomerDashboard />} />
            <Route path="/customerDashboard" element={<CustomerDashboard />} />
            <Route path="/scsManagement" element={<SCSManagement />} />
            <Route path="/camsManagement" element={<CAMSManagement />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route
              path="/projects"
              element={<div style={{ textAlign: "center" }}>Projects Coming Soon</div>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;