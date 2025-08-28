# Sensor Monitoring System

## Overview

This system provides real-time monitoring of IoT sensors (temperature, humidity, light) with both historical data visualization and live updates.

## Features

### 1. Real-Time Sensor Data Display

- **Temperature**: Displayed in °C with orange color theme
- **Humidity**: Displayed in % with blue color theme
- **Light**: Displayed in lux with green color theme
- Updates automatically via Socket.IO connection

### 2. Historical Data Chart

- Interactive line chart using Recharts
- Configurable time ranges:
  - Last 15 Minutes
  - Last 30 Minutes
  - Last 1 Hour
  - Last 6 Hours
  - Last 24 Hours
  - Last Week
- Data fetched from GraphQL API with adaptive polling intervals
- Smart polling: more frequent updates for shorter time ranges

### 3. Socket.IO Integration

- Real-time data streaming from MQTT broker
- Automatic reconnection handling
- Low-latency updates
- Fallback to polling if WebSocket fails

## Architecture

### Backend (NestJS)

- **MQTT Observer**: Listens to `esp32/sensors` topic
- **Socket.IO Gateway**: Broadcasts sensor data to web clients
- **GraphQL Resolver**: Provides historical sensor data
- **Prisma Service**: Database operations for sensor data

### Frontend (Next.js)

- **RealTimeSensorData**: Displays current sensor readings
- **SensorChart**: Historical data visualization
- **Socket.IO Client**: Connects to backend for real-time updates

## Configuration

### Environment Variables

```bash
# Web App
NEXT_PUBLIC_WS_URL=http://localhost:3000
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/graphql

# Server
WEB_ORIGIN=http://localhost:3001
```

### Port Configuration

- **Backend Server**: Port 3000 (GraphQL + Socket.IO)
- **Frontend Web App**: Port 3001 (Next.js)

### MQTT Topic Structure

```json
{
  "topic": "esp32/sensors",
  "payload": {
    "temperature": 25.5,
    "humidity": 60.2,
    "lux": 450.0,
    "timestamp": "2024-01-01T12:00:00Z"
  }
}
```

## Usage

1. **Start the server**: `cd apps/server && npm run start:dev`
2. **Start the web app**: `cd apps/web && npm run dev`
3. **Send MQTT data** to `esp32/sensors` topic
4. **View real-time updates** on the home page
5. **Explore historical data** using the interactive chart

## Data Flow

1. ESP32/Arduino sends sensor data to MQTT broker
2. NestJS MQTT observer receives data
3. Data is saved to database via Prisma
4. Socket.IO gateway broadcasts data to connected clients
5. Web app displays real-time updates
6. GraphQL API provides historical data for charts

## Technologies Used

- **Backend**: NestJS, MQTT, Socket.IO, GraphQL, Prisma
- **Frontend**: Next.js, React, Recharts, Ant Design, Socket.IO Client
- **Database**: PostgreSQL (via Prisma)
- **Real-time**: Socket.IO, MQTT
- **Charts**: Recharts library
