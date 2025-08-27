# 🌟 IoT Smart Sensors Project

A comprehensive IoT ecosystem for smart sensor monitoring and control, featuring real-time data collection, cloud connectivity, and intelligent automation.

## 🚀 Project Overview

This project implements a complete IoT solution with three main components:

- **Arduino ESP32**: Smart sensor hub with environmental monitoring
- **NestJS Backend**: GraphQL API server with MQTT integration
- **Next.js Web App**: Modern dashboard for real-time monitoring and control

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ESP32 Device  │    │  NestJS Server  │    │  Next.js Web    │
│                 │    │                 │    │                 │
│ • DHT11 Sensor │────│ • GraphQL API   │────│ • Real-time UI  │
│ • BH1750 Light │    │ • MQTT Broker   │    │ • Device Control│
│ • Relay Control│    │ • Prisma DB     │    │ • Data Viz      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

### Hardware

- **ESP32 Development Board**
- **DHT11** - Temperature & Humidity Sensor
- **BH1750** - Digital Light Sensor
- **Relay Modules** - Temperature, Humidity, and Light Control

### Backend

- **NestJS** - Progressive Node.js framework
- **GraphQL** - Apollo Server with GraphQL
- **Prisma** - Database ORM
- **MQTT** - IoT messaging protocol
- **TypeScript** - Type-safe development

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **Turborepo** - Monorepo build system

## 📋 Prerequisites

- **Node.js** >= 18
- **Bun** >= 1.0.7 (Package Manager)
- **Arduino IDE** with ESP32 support
- **WiFi Network** for device connectivity

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <repository-url>
cd iot-smart-sensors
bun install
```

### 2. Environment Setup

Create environment files for the server:

```bash
cd apps/server
cp .env.example .env
```

Configure your MQTT broker and database settings.

### 3. Database Setup

```bash
cd apps/server
bun run prisma generate
bun run prisma db push
```

### 4. Start Development

```bash
# Start all services
bun run dev

# Or start individually:
bun run dev --filter=server
bun run dev --filter=web
```

## 🔧 Hardware Setup

### ESP32 Pin Configuration

| Component   | Pin                        | Function               |
| ----------- | -------------------------- | ---------------------- |
| DHT11       | GPIO 4                     | Temperature & Humidity |
| BH1750      | SDA: GPIO 21, SCL: GPIO 22 | I2C Light Sensor       |
| Relay Temp  | GPIO 32                    | Temperature Control    |
| Relay Humi  | GPIO 33                    | Humidity Control       |
| Relay Light | GPIO 25                    | Light Control          |

### Wiring Instructions

1. Connect DHT11 to GPIO 4 with 4.7kΩ pull-up resistor
2. Connect BH1750 via I2C (SDA: GPIO 21, SCL: GPIO 22)
3. Connect relay modules to respective GPIO pins
4. Power ESP32 via USB or external 5V supply

## 📡 MQTT Configuration

### Topics

- **Sensors Data**: `esp32/sensors`
- **Actions Control**: `esp32/actions`

### Message Format

**Sensor Data:**

```json
{
  "temperature": 25.5,
  "humidity": 65.2,
  "lux": 450.75
}
```

**Control Actions:**

```json
{
  "pattern": "esp32/actions",
  "data": {
    "action": "on",
    "relay": "RELAY_TEMP"
  }
}
```

## 🌐 API Endpoints

### GraphQL Playground

- **Development**: `http://localhost:3001/graphql`
- **Production**: Configure in environment

### Available Queries

- Device status and sensor readings
- Historical data analysis
- Device configuration

## 📱 Web Dashboard

Access the web interface at `http://localhost:3000` to:

- View real-time sensor data
- Control relay devices
- Monitor system status
- Analyze historical trends

## 🔒 Security Features

- **TLS/SSL** MQTT connection
- **WiFi Manager** for secure network configuration
- **Authentication** for MQTT broker access
- **Environment-based** configuration management

## 📊 Monitoring & Control

### Real-time Monitoring

- Temperature and humidity tracking
- Ambient light level measurement
- Device status monitoring

### Automated Control

- Temperature-based relay control
- Humidity management
- Light automation

## 🚀 Deployment

### Production Build

```bash
# Build all applications
bun run build

# Start production server
cd apps/server
bun run start:prod
```

### Docker Support

```bash
# Build and run with Docker
docker-compose up -d
```

## 🧪 Testing

```bash
# Run all tests
bun run test

# Run specific app tests
bun run test --filter=server
bun run test --filter=web
```

## 📁 Project Structure

```
iot-smart-sensors/
├── apps/
│   ├── arduino/          # ESP32 firmware
│   ├── server/           # NestJS backend
│   └── web/             # Next.js frontend
├── packages/
│   ├── eslint-config/    # Shared ESLint config
│   ├── typescript-config/ # Shared TS config
│   └── ui/              # Shared UI components
├── bun.lockb            # Bun lockfile
└── turbo.json           # Turborepo config
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Documentation**: [Wiki](https://github.com/your-repo/wiki)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)

## 🙏 Acknowledgments

- ESP32 community for hardware support
- NestJS team for the excellent framework
- Next.js team for the React framework
- All contributors and maintainers

---

**Made with ❤️ for the IoT community**
