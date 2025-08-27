#include <Wire.h>
#include <BH1750.h>
#include "DHT.h"
#include <WiFi.h> 
#include <PubSubClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <WiFiManager.h> 

#define DHTPIN 4     
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// ---- Relay ----
#define RELAY_TEMP 32   
#define RELAY_HUMI 33   
#define RELAY_LIGHT 25  

#define ON_MODE LOW
#define OFF_MODE HIGH

struct RelayMap {
  const char* name;
  uint8_t pin;
};

RelayMap relays[] = {
  {"RELAY_TEMP", RELAY_TEMP},
  {"RELAY_HUMI", RELAY_HUMI},
  {"RELAY_LIGHT", RELAY_LIGHT}
};

// ---- MQTT -----
const char* mqtt_server = "105f292e81544bddb610d5c5c50c582b.s1.eu.hivemq.cloud"; 
const int mqtt_port = 8883;
const char* mqtt_user = "tuananh";
const char* mqtt_pass = "Tuananh123";
const char* mqtt_clientID = "ESP32_Client";

const char* MQTT_SENSORS_DATA_TOPIC = "esp32/sensors";
const char* MQTT_ACTIONS_TOPIC = "esp32/actions";

WiFiClientSecure secureClient;
PubSubClient mqttClient(secureClient);
BH1750 lightMeter;

void mqttCallback(char* topic, byte* payload, unsigned int length) {
  Serial.print("MQTT message [");
  Serial.print(topic);
  Serial.print("]: ");

  char msg[length + 1];
  memcpy(msg, payload, length);
  msg[length] = '\0';
  Serial.println(msg);

  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, msg);
  if (error) {
    Serial.print("Lỗi parse JSON: ");
    Serial.println(error.c_str());
    return;
  }

  const char* action = doc["action"];
  const char* relay_name = doc["relay"];

  for (int i = 0; i < sizeof(relays)/sizeof(relays[0]); i++) {
    if (strcmp(relays[i].name, relay_name) == 0) {
      if (strcmp(action, "on") == 0) {
        digitalWrite(relays[i].pin, ON_MODE);   // kích relay
        Serial.print(relay_name); Serial.println(" BẬT");
      } else if (strcmp(action, "off") == 0) {
        digitalWrite(relays[i].pin, OFF_MODE);  // tắt relay
        Serial.print(relay_name); Serial.println(" TẮT");
      }
      return;
    }
  }

  Serial.println("Relay không hợp lệ");
}

void connectMQTT() {
  secureClient.setInsecure();
  mqttClient.setServer(mqtt_server, mqtt_port);
  mqttClient.setCallback(mqttCallback);

  while (!mqttClient.connected()) {
    Serial.print("Đang kết nối MQTT...");
    if (mqttClient.connect(mqtt_clientID, mqtt_user, mqtt_pass)) {
      Serial.println("Đã kết nối MQTT TLS!");
      mqttClient.subscribe(MQTT_ACTIONS_TOPIC); 
      Serial.println("Đã subscribe esp32/actions");
    } else {
      Serial.print("Lỗi code=");
      Serial.print(mqttClient.state());
      Serial.println(", thử lại sau 5s");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  WiFiManager wifiManager;
  wifiManager.resetSettings(); 
  wifiManager.autoConnect("LTA_ESP"); 
  Serial.println("Đã kết nối Wi-Fi!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());

  Wire.begin(21, 22); 
  if (lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) {
    Serial.println("BH1750 sẵn sàng!");
  } else {
    Serial.println("Không tìm thấy BH1750!");
  }

  dht.begin();

  pinMode(RELAY_TEMP, OUTPUT);
  pinMode(RELAY_HUMI, OUTPUT);
  pinMode(RELAY_LIGHT, OUTPUT);

  digitalWrite(RELAY_TEMP, OFF_MODE);
  digitalWrite(RELAY_HUMI, OFF_MODE);
  digitalWrite(RELAY_LIGHT, OFF_MODE);

  connectMQTT();
}

unsigned long lastPublish = 0;   
const unsigned long interval = 1000;  

void loop() {
  if (!mqttClient.connected()) connectMQTT();
  mqttClient.loop();  

  unsigned long now = millis();
  if (now - lastPublish >= interval) {
    lastPublish = now;

    float lux = lightMeter.readLightLevel();
    float h = dht.readHumidity();
    float t = dht.readTemperature();

    char payload[120];
    sprintf(payload, "{\"temperature\":%.2f,\"humidity\":%.2f,\"lux\":%.2f}", t, h, lux);
    mqttClient.publish(MQTT_SENSORS_DATA_TOPIC, payload);

    Serial.print("Gửi data MQTT: ");
    Serial.println(payload);
  }
}
