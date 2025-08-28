"use client";

import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic, Typography } from "antd";
import { FireOutlined, CloudOutlined, BulbOutlined } from "@ant-design/icons";
import { io, Socket } from "socket.io-client";

const { Title } = Typography;

interface RealTimeSensorData {
  temperature: number;
  humidity: number;
  lux: number;
  timestamp: Date;
}

interface SensorDataMessage {
  topic: string;
  payload: {
    temperature: number;
    humidity: number;
    lux: number;
  };
  timestamp: string;
}

export const RealTimeSensorData: React.FC = () => {
  const [sensorData, setSensorData] = useState<RealTimeSensorData>({
    temperature: 0,
    humidity: 0,
    lux: 0,
    timestamp: new Date(),
  });
  const [isClient, setIsClient] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000";
    console.log("Socket.IO connecting to:", wsUrl);

    const newSocket = io(wsUrl, {
      transports: ["websocket", "polling"],
      timeout: 20000,
    });

    newSocket.on("connect", () => {
      console.log("✅ Socket.IO connected successfully!");
      console.log("Socket ID:", newSocket.id);
    });

    newSocket.on("sensor-data", (data: SensorDataMessage) => {
      console.log("📨 Received sensor data:", data);
      if (data.topic === "esp32/sensors") {
        setSensorData({
          temperature: parseFloat(data.payload.temperature.toString()) || 0,
          humidity: parseFloat(data.payload.humidity.toString()) || 0,
          lux: parseFloat(data.payload.lux.toString()) || 0,
          timestamp: new Date(data.timestamp),
        });
      }
    });

    newSocket.on("disconnect", () => {
      console.log("🔌 Socket.IO disconnected");
    });

    newSocket.on("connect_error", (error) => {
      console.error("❌ Socket.IO connection error:", error);
    });

    setSocket(newSocket);

    return () => {
      console.log("Cleaning up Socket.IO connection");
      newSocket.close();
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <Card>
        <Title level={4}>Real-Time Sensor Data</Title>
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Temperature"
                value={0}
                suffix="°C"
                prefix={<FireOutlined style={{ color: "#ff7300" }} />}
                valueStyle={{ color: "#ff7300" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Humidity"
                value={0}
                suffix="%"
                prefix={<CloudOutlined style={{ color: "#0088fe" }} />}
                valueStyle={{ color: "#0088fe" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Light"
                value={0}
                suffix="lux"
                prefix={<BulbOutlined style={{ color: "#00ff00" }} />}
                valueStyle={{ color: "#00ff00" }}
              />
            </Card>
          </Col>
        </Row>
        <div style={{ marginTop: 16, textAlign: "center", color: "#666" }}>
          Loading...
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <Title level={4}>Real-Time Sensor Data</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Temperature"
              value={sensorData.temperature}
              suffix="°C"
              prefix={<FireOutlined style={{ color: "#ff7300" }} />}
              valueStyle={{ color: "#ff7300" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Humidity"
              value={sensorData.humidity}
              suffix="%"
              prefix={<CloudOutlined style={{ color: "#0088fe" }} />}
              valueStyle={{ color: "#0088fe" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Light"
              value={sensorData.lux}
              suffix="lux"
              prefix={<BulbOutlined style={{ color: "#00ff00" }} />}
              valueStyle={{ color: "#00ff00" }}
            />
          </Card>
        </Col>
      </Row>
      <div style={{ marginTop: 16, textAlign: "center", color: "#666" }}>
        Last updated: {sensorData.timestamp.toLocaleTimeString()}
      </div>
      <div
        style={{
          marginTop: 8,
          textAlign: "center",
          color: "#999",
          fontSize: "12px",
        }}
      >
        Socket.IO: {process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000"}
        {socket && ` | Connected: ${socket.connected ? "Yes" : "No"}`}
      </div>
    </Card>
  );
};
