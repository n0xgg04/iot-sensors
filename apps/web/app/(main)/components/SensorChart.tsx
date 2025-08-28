"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Select, Space, Typography } from "antd";
import { useSensorData } from "../../../graphql/queries/useSensorData";

const { Title } = Typography;
const { Option } = Select;

interface SensorDataPoint {
  temperature: number;
  humidity: number;
  lux: number;
  timestamp: string;
}

interface GraphQLResponse {
  getSensorData: Array<{
    temperature: number;
    humidity: number;
    lux: number;
    timestamp: string;
  }>;
}

export const SensorChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<number>(24);

  const { from, to } = useMemo(() => {
    const toDate = new Date();
    const fromDate = new Date();

    if (timeRange <= 1) {
      const minutes = Math.round(timeRange * 60);
      fromDate.setMinutes(fromDate.getMinutes() - minutes);
    } else if (timeRange < 24) {
      fromDate.setHours(fromDate.getHours() - timeRange);
    } else {
      fromDate.setHours(fromDate.getHours() - timeRange);
    }

    return { from: fromDate, to: toDate };
  }, [timeRange]);

  const { data, loading, error } = useSensorData(from, to, timeRange);

  const chartData = useMemo(() => {
    const typedData = data as GraphQLResponse | undefined;
    if (!typedData?.getSensorData) return [];

    return typedData.getSensorData.map((item) => ({
      temperature: item.temperature || 0,
      humidity: item.humidity || 0,
      lux: item.lux || 0,
      timestamp: new Date(item.timestamp).toLocaleTimeString(),
    }));
  }, [data]);

  const handleTimeRangeChange = useCallback((value: number) => {
    setTimeRange(value);
  }, []);

  if (loading && chartData.length === 0) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "40px" }}>
          Loading sensor data...
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "40px", color: "#ff4d4f" }}>
          Error loading sensor data: {error.message}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={3}>Sensor Data Chart</Title>
          <Select
            value={timeRange}
            onChange={handleTimeRangeChange}
            style={{ width: 140 }}
          >
            <Option value={0.25}>Last 15 Minutes</Option>
            <Option value={0.5}>Last 30 Minutes</Option>
            <Option value={1}>Last 1 Hour</Option>
            <Option value={6}>Last 6 Hours</Option>
            <Option value={24}>Last 24 Hours</Option>
            <Option value={168}>Last Week</Option>
          </Select>
        </div>

        {chartData.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            No sensor data available for the selected time range
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temperature"
                stroke="#ff7300"
                strokeWidth={2}
                dot={false}
                name="Temperature (°C)"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="humidity"
                stroke="#0088fe"
                strokeWidth={2}
                dot={false}
                name="Humidity (%)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="lux"
                stroke="#00ff00"
                strokeWidth={2}
                dot={false}
                name="Light (lux)"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Space>
    </Card>
  );
};
