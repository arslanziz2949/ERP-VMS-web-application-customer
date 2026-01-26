import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import GasLineChart from "./GasLineChart";
import DigitalGauge from "./DigitalGauge";
import { useThemeValues } from '../Theme/Theme';

const GAS_THRESHOLD = 333;
const FIRE_THRESHOLD = 1;
const GUN_THRESHOLD = 1;

const TOPICS = {
  gas: "safety/gas",
  fire: "safety/fire",
  gun: "safety/gun",
};

const SafetyGraphs = () => {
  const theme = useThemeValues();
  const [gasHistory, setGasHistory] = useState([]);
  const [fire, setFire] = useState(null);
  const [gun, setGun] = useState(null);
  const [mqttStatus, setMqttStatus] = useState("disconnected");
  const [isMobile, setIsMobile] = useState(false);

  const [alerts, setAlerts] = useState({
    gas: false,
    fire: false,
    gun: false,
  });

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    client.on("connect", () => {
      setMqttStatus("connected");
      client.subscribe(Object.values(TOPICS));
    });

    client.on("message", (topic, message) => {
      const value = Number(message.toString());
      if (isNaN(value)) return;

      if (topic === TOPICS.gas) {
        setGasHistory((prev) => {
          const updated = [...prev, value];
          return updated.length > 20 ? updated.slice(-20) : updated;
        });
        setAlerts((p) => ({ ...p, gas: value > GAS_THRESHOLD }));
      }

      if (topic === TOPICS.fire) {
        setFire(value);
        setAlerts((p) => ({ ...p, fire: value >= FIRE_THRESHOLD }));
      }

      if (topic === TOPICS.gun) {
        setGun(value);
        setAlerts((p) => ({ ...p, gun: value >= GUN_THRESHOLD }));
      }
    });

    client.on("error", () => {
      setMqttStatus("error");
    });

    client.on("offline", () => {
      setMqttStatus("disconnected");
    });

    return () => client.end();
  }, []);

  return (
    <div style={{
      width: "100%",
      marginBottom: "32px",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <div>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "700",
            color: theme.palette.text.primary,
            margin: 0,
          }}>
            🚨 Safety Monitoring
          </h2>
          <p style={{
            fontSize: "14px",
            color: theme.palette.text.secondary,
            marginTop: "8px",
          }}>
            Real-time sensor data from connected devices
          </p>
        </div>
        
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            background: mqttStatus === "connected" 
              ? "rgba(16, 185, 129, 0.1)" 
              : "rgba(239, 68, 68, 0.1)",
            borderRadius: "20px",
            border: `1px solid ${mqttStatus === "connected" ? '#10b981' : '#ef4444'}`,
          }}>
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: mqttStatus === "connected" ? '#10b981' : '#ef4444',
              animation: mqttStatus === "connected" ? 'pulse 2s infinite' : 'none',
            }}></div>
            <span style={{
              fontSize: "14px",
              fontWeight: "600",
              color: mqttStatus === "connected" ? '#10b981' : '#ef4444',
            }}>
              {mqttStatus === "connected" ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr",
        gap: "20px",
        marginBottom: "20px",
      }}>
        {/* Gas Chart - Takes full width on mobile, 2/4 on desktop */}
        <div style={{
          gridColumn: isMobile ? "1 / -1" : "1 / 2",
          gridRow: isMobile ? "1" : "1 / 3",
        }}>
          <GasLineChart 
            data={gasHistory} 
            threshold={GAS_THRESHOLD}
            title="Gas Leakage Detection"
          />
        </div>

        {/* Fire Gauge */}
        <div style={{
          gridColumn: isMobile ? "1" : "2 / 3",
          gridRow: isMobile ? "2" : "1",
        }}>
          <DigitalGauge
            title="Fire Detection"
            value={fire}
            active={alerts.fire}
            unit=""
            icon="🔥"
            size={isMobile ? "medium" : "small"}
          />
        </div>

        {/* Gun Gauge */}
        <div style={{
          gridColumn: isMobile ? "1" : "3 / 4",
          gridRow: isMobile ? "3" : "1",
        }}>
          <DigitalGauge
            title="Weapon Detection"
            value={gun}
            active={alerts.gun}
            unit=""
            icon="🔫"
            size={isMobile ? "medium" : "small"}
          />
        </div>
      </div>

      {/* Alert Summary */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: "16px",
      }}>
        <div style={{
          padding: "16px",
          background: alerts.gas 
            ? "rgba(239, 68, 68, 0.05)" 
            : theme.palette.bg.header,
          borderRadius: "12px",
          border: `1px solid ${alerts.gas ? '#ef4444' : theme.palette.border}`,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: alerts.gas 
              ? "linear-gradient(135deg, #ef4444, #dc2626)" 
              : theme.palette.bg.cardGradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            color: alerts.gas ? "white" : theme.palette.text.onCard,
          }}>
            🟡
          </div>
          <div>
            <div style={{
              fontSize: "14px",
              fontWeight: "600",
              color: alerts.gas ? '#ef4444' : theme.palette.text.primary,
            }}>
              Gas Leakage
            </div>
            <div style={{
              fontSize: "12px",
              color: theme.palette.text.secondary,
            }}>
              {alerts.gas ? `Above ${GAS_THRESHOLD} ` : "Within safe limits"}
            </div>
          </div>
        </div>

        <div style={{
          padding: "16px",
          background: alerts.fire 
            ? "rgba(239, 68, 68, 0.05)" 
            : theme.palette.bg.header,
          borderRadius: "12px",
          border: `1px solid ${alerts.fire ? '#ef4444' : theme.palette.border}`,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: alerts.fire 
              ? "linear-gradient(135deg, #ef4444, #dc2626)" 
              : theme.palette.bg.cardGradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            color: alerts.fire ? "white" : theme.palette.text.onCard,
          }}>
            🔥
          </div>
          <div>
            <div style={{
              fontSize: "14px",
              fontWeight: "600",
              color: alerts.fire ? '#ef4444' : theme.palette.text.primary,
            }}>
              Fire Detection
            </div>
            <div style={{
              fontSize: "12px",
              color: theme.palette.text.secondary,
            }}>
              {alerts.fire ? "Fire detected" : "No fire detected"}
            </div>
          </div>
        </div>

        <div style={{
          padding: "16px",
          background: alerts.gun 
            ? "rgba(239, 68, 68, 0.05)" 
            : theme.palette.bg.header,
          borderRadius: "12px",
          border: `1px solid ${alerts.gun ? '#ef4444' : theme.palette.border}`,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: alerts.gun 
              ? "linear-gradient(135deg, #ef4444, #dc2626)" 
              : theme.palette.bg.cardGradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            color: alerts.gun ? "white" : theme.palette.text.onCard,
          }}>
            🔫
          </div>
          <div>
            <div style={{
              fontSize: "14px",
              fontWeight: "600",
              color: alerts.gun ? '#ef4444' : theme.palette.text.primary,
            }}>
              Weapon Detection
            </div>
            <div style={{
              fontSize: "12px",
              color: theme.palette.text.secondary,
            }}>
              {alerts.gun ? "Weapon detected" : "No weapons detected"}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
        gap: "16px",
        marginTop: "20px",
      }}>
        <div style={{
          padding: "16px",
          background: theme.palette.bg.header,
          borderRadius: "12px",
          border: `1px solid ${theme.palette.border}`,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: "24px",
            fontWeight: "700",
            color: theme.palette.text.primary,
          }}>
            {gasHistory.length}
          </div>
          <div style={{
            fontSize: "12px",
            color: theme.palette.text.secondary,
            marginTop: "4px",
          }}>
            Gas Readings
          </div>
        </div>

        <div style={{
          padding: "16px",
          background: theme.palette.bg.header,
          borderRadius: "12px",
          border: `1px solid ${theme.palette.border}`,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: "24px",
            fontWeight: "700",
            color: alerts.gas || alerts.fire || alerts.gun ? '#ef4444' : '#10b981',
          }}>
            {[alerts.gas, alerts.fire, alerts.gun].filter(Boolean).length}
          </div>
          <div style={{
            fontSize: "12px",
            color: theme.palette.text.secondary,
            marginTop: "4px",
          }}>
            Active Alerts
          </div>
        </div>

        <div style={{
          padding: "16px",
          background: theme.palette.bg.header,
          borderRadius: "12px",
          border: `1px solid ${theme.palette.border}`,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: "24px",
            fontWeight: "700",
            color: theme.palette.text.primary,
          }}>
            {gasHistory.length > 0 ? Math.max(...gasHistory) : "--"}
          </div>
          <div style={{
            fontSize: "12px",
            color: theme.palette.text.secondary,
            marginTop: "4px",
          }}>
            Max Gas Level
          </div>
        </div>

        <div style={{
          padding: "16px",
          background: theme.palette.bg.header,
          borderRadius: "12px",
          border: `1px solid ${theme.palette.border}`,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: "24px",
            fontWeight: "700",
            color: theme.palette.text.primary,
          }}>
            {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
          <div style={{
            fontSize: "12px",
            color: theme.palette.text.secondary,
            marginTop: "4px",
          }}>
            Last Update
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        @media (max-width: 1024px) {
          .safety-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 768px) {
          .safety-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SafetyGraphs;