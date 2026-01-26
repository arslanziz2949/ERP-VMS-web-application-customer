import React from "react";
import { useTheme } from '../Theme/ThemeContext';
import { useThemeValues } from '../Theme/Theme';

const DigitalGauge = ({ title, value, active, unit = "", icon = "📊", size = "medium" }) => {
  const theme = useThemeValues();
  
  // Size variations
  const sizes = {
    small: {
      containerPadding: "12px 16px",
      titleFontSize: "14px",
      valueFontSize: "28px",
      iconSize: "24px",
      borderRadius: "8px"
    },
    medium: {
      containerPadding: "16px 24px",
      titleFontSize: "16px",
      valueFontSize: "36px",
      iconSize: "32px",
      borderRadius: "12px"
    },
    large: {
      containerPadding: "20px 32px",
      titleFontSize: "18px",
      valueFontSize: "48px",
      iconSize: "40px",
      borderRadius: "16px"
    }
  };

  const selectedSize = sizes[size];

  return (
    <div
      style={{
        padding: selectedSize.containerPadding,
        borderRadius: selectedSize.borderRadius,
        border: `2px solid ${active ? '#ef4444' : theme.palette.border}`,
        background: active 
          ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))'
          : theme.palette.bg.card,
        textAlign: "center",
        width: "100%",
        height: "100%",
        minHeight: "180px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        boxShadow: active 
          ? `0 0 20px rgba(239, 68, 68, 0.3), ${theme.palette.shadow}`
          : theme.palette.shadow,
      }}
    >
      {/* Alert indicator */}
      {active && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(90deg, #ef4444, #dc2626)',
          color: 'white',
          padding: "4px 0",
          textAlign: "center",
          fontSize: "12px",
          fontWeight: "600",
          zIndex: 1,
        }}>
          🚨 ALERT
        </div>
      )}

      {/* Icon */}
      <div style={{
        fontSize: selectedSize.iconSize,
        marginBottom: "12px",
        marginTop: active ? "20px" : "0",
        opacity: active ? 0.9 : 0.7,
        transition: "all 0.3s ease",
      }}>
        {icon}
      </div>

      {/* Title */}
      <div style={{
        fontSize: selectedSize.titleFontSize,
        fontWeight: "600",
        color: active ? '#ef4444' : theme.palette.text.secondary,
        marginBottom: "8px",
        transition: "all 0.3s ease",
      }}>
        {title}
      </div>

      {/* Value */}
      <div style={{
        fontSize: selectedSize.valueFontSize,
        fontWeight: "700",
        color: active ? '#ef4444' : theme.palette.text.primary,
        marginBottom: "4px",
        lineHeight: 1,
        transition: "all 0.3s ease",
      }}>
        {value ?? "--"}
        {unit && <span style={{ fontSize: "0.6em", marginLeft: "4px" }}>{unit}</span>}
      </div>

      {/* Status */}
      <div style={{
        fontSize: "14px",
        color: active ? '#ef4444' : theme.palette.text.muted,
        marginTop: "8px",
        padding: "4px 12px",
        background: active 
          ? 'rgba(239, 68, 68, 0.1)' 
          : theme.palette.bg.header,
        borderRadius: "20px",
        fontWeight: "600",
        transition: "all 0.3s ease",
      }}>
        {active ? "ALERT" : "Normal"}
      </div>

      {/* Pulsing effect for alert */}
      {active && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)",
          animation: "pulse 2s infinite",
          zIndex: 0,
        }}></div>
      )}

      <style>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.2; }
          100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
        }
        
        @media (max-width: 768px) {
          .digital-gauge {
            min-height: 160px !important;
          }
        }
        
        @media (max-width: 480px) {
          .digital-gauge {
            min-height: 140px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DigitalGauge;