import React, { useEffect, useRef, useState } from "react";
import mqtt from "mqtt";

const BROKER_URL = "ws://192.168.18.28:9001";
const TOPIC = "client/+/hub/+/sensor/+/+";

const SafetyGraphs = ({ onSensorDataUpdate }) => {
  const clientRef = useRef(null);
  const [status, setStatus] = useState("Disconnected");
  const [sensorData, setSensorData] = useState(null);
  const [topicInfo, setTopicInfo] = useState("");

  const connectAndSubscribe = () => {
    if (clientRef.current) return;

    console.log("🔌 Connecting to:", BROKER_URL);
    console.log("📡 Subscribing to:", TOPIC);

    const client = mqtt.connect(BROKER_URL, {
      clientId: "react_" + Math.random().toString(16).slice(2),
      clean: true,
      reconnectPeriod: 10000,
      connectTimeout: 50000,
    });

    clientRef.current = client;

    client.on("connect", (connack) => {
      console.log("✅ MQTT CONNECTED", connack);
      setStatus("Connected");

      client.subscribe(TOPIC, (err, granted) => {
        if (err) {
          console.error("❌ SUBSCRIBE ERROR:", err);
        } else {
          console.log("✅ SUBSCRIBED:", granted);
        }
      });
    });

    client.on("message", (topic, payload) => {
      console.log("Topic:", topic);
      console.log("Payload:", payload.toString());

      let data;
      try {
        data = JSON.parse(payload.toString());
      } catch {
        data = payload.toString();
      }

      const topicParts = topic.split("/");
      const hubId = topicParts[3];
      const sensorType = topicParts[4];
      const sensorId = topicParts[5];

      const sensorDataObj = {
        value: data,
        hub_id: hubId,
        sensor_id: sensorId,
        sensor_type: sensorType,
        rawTopic: topic,
        timestamp: new Date().toLocaleString(),
      };

      setSensorData(sensorDataObj);
      setTopicInfo(topic);

      // Pass data to parent component
      if (onSensorDataUpdate) {
        onSensorDataUpdate(sensorDataObj);
      }
    });

    client.on("reconnect", () => {
      console.log("🔄 MQTT RECONNECTING...");
      setStatus("Reconnecting");
    });

    client.on("offline", () => {
      console.log("⚠️ MQTT OFFLINE");
      setStatus("Offline");
    });

    client.on("close", () => {
      console.log("❌ MQTT CLOSED");
      setStatus("Closed");
      clientRef.current = null;
    });

    client.on("error", (err) => {
      console.error("🚨 MQTT ERROR:", err);
      setStatus("Error");
    });
  };

  const disconnect = () => {
    if (!clientRef.current) return;

    console.log("🔌 Disconnecting MQTT");
    clientRef.current.end(true);
    clientRef.current = null;

    setStatus("Disconnected");
    setSensorData(null);
    setTopicInfo("");
  };

  useEffect(() => {
    // Auto-connect on component mount
    connectAndSubscribe();

    return () => {
      disconnect();
    };
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "700px" }}>
      <h2>📡 Live Sensor Data Monitor</h2>

      <p>
        <strong>Status:</strong>{" "}
        <span style={{ color: status === "Connected" ? "green" : "red" }}>
          {status}
        </span>
      </p>

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <button 
          onClick={connectAndSubscribe} 
          disabled={status === "Connected"}
          style={{
            padding: "8px 16px",
            background: status === "Connected" ? "#4CAF50" : "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: status === "Connected" ? "not-allowed" : "pointer",
          }}
        >
          🔌 Connect
        </button>

        <button 
          onClick={disconnect} 
          disabled={!clientRef.current}
          style={{
            padding: "8px 16px",
            background: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: !clientRef.current ? "not-allowed" : "pointer",
          }}
        >
          ❌ Disconnect
        </button>
      </div>

      <div style={{
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        background: "#f9f9f9",
        marginBottom: "20px"
      }}>
        <h4>Latest Sensor Reading</h4>

        {sensorData ? (
          <div>
            <pre style={{ margin: 0, fontSize: "12px" }}>
              {JSON.stringify(sensorData, null, 2)}
            </pre>
            <div style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
              <div><strong>Hub ID:</strong> {sensorData.hub_id}</div>
              <div><strong>Sensor ID:</strong> {sensorData.sensor_id}</div>
              <div><strong>Sensor Type:</strong> {sensorData.sensor_type}</div>
              <div><strong>Value:</strong> {sensorData.value?.value || 'N/A'}</div>
              <div><strong>Received:</strong> {sensorData.timestamp}</div>
            </div>
          </div>
        ) : (
          <p>Waiting for sensor data...</p>
        )}
      </div>

      {topicInfo && (
        <p style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
          <strong>Active Topic:</strong> {topicInfo}
        </p>
      )}
    </div>
  );
};

export default SafetyGraphs;