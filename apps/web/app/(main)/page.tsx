"use client";
import React from "react";
import { SensorChart } from "./components/SensorChart";
import { RealTimeSensorData } from "./components/RealTimeSensorData";
import { Space } from "antd";

export default function HomePage() {
  return (
    <div style={{ padding: "24px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <RealTimeSensorData />
        <SensorChart />
      </Space>
    </div>
  );
}
