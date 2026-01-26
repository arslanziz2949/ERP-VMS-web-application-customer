import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useThemeValues } from '../Theme/Theme';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

const GasLineChart = ({ data, threshold, title = "Gas Leakage", unit = "PPM" }) => {
  const theme = useThemeValues();
  
  const chartData = {
    labels: data.map((_, i) => `${i + 1}s`),
    datasets: [
      {
        label: "Gas Level",
        data,
        borderColor: theme.palette.primary,
        backgroundColor: `${theme.palette.primary}20`,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: theme.palette.primary,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Danger Threshold",
        data: Array(data.length).fill(threshold),
        borderColor: '#ef4444',
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        backgroundColor: 'transparent',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          color: theme.palette.border,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          maxRotation: 0,
          maxTicksLimit: 6,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: theme.palette.border,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          callback: function(value) {
            return value + unit;
          },
        },
        suggestedMax: Math.max(...data, threshold) * 1.2,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme.palette.text.primary,
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: theme.palette.bg.card,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.border,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}${unit}`;
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      minHeight: "300px",
      padding: "20px",
      background: theme.palette.bg.card,
      borderRadius: "12px",
      border: `1px solid ${theme.palette.border}`,
      boxShadow: theme.palette.shadow,
      position: "relative",
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <div style={{
            fontSize: "24px",
            opacity: 0.8,
          }}>
            🟡
          </div>
          <div>
            <div style={{
              fontSize: "18px",
              fontWeight: "600",
              color: theme.palette.text.primary,
            }}>
              {title}
            </div>
            <div style={{
              fontSize: "14px",
              color: theme.palette.text.secondary,
            }}>
              Real-time monitoring • Threshold: {threshold}{unit}
            </div>
          </div>
        </div>
        <div style={{
          padding: "6px 12px",
          background: theme.palette.bg.header,
          borderRadius: "20px",
          fontSize: "14px",
          color: theme.palette.text.secondary,
          fontWeight: "600",
          border: `1px solid ${theme.palette.border}`,
        }}>
          {data.length} readings
        </div>
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        <Line data={chartData} options={options} />
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "16px",
        paddingTop: "16px",
        borderTop: `1px solid ${theme.palette.border}`,
        fontSize: "12px",
        color: theme.palette.text.muted,
      }}>
        <div>
          <span style={{ color: theme.palette.primary, fontWeight: "600" }}>
            Current: {data.length > 0 ? data[data.length - 1] : "--"}{unit}
          </span>
        </div>
        <div>
          <span style={{ color: '#ef4444', fontWeight: "600" }}>
            Max: {data.length > 0 ? Math.max(...data) : "--"}{unit}
          </span>
        </div>
        <div>
          <span style={{ fontWeight: "600" }}>
            Min: {data.length > 0 ? Math.min(...data) : "--"}{unit}
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .gas-chart-container {
            padding: 16px !important;
            min-height: 280px !important;
          }
        }
        
        @media (max-width: 480px) {
          .gas-chart-container {
            padding: 12px !important;
            min-height: 250px !important;
          }
          
          .gas-chart-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GasLineChart;