-- CreateEnum
CREATE TYPE "public"."DeviceStatus" AS ENUM ('on', 'off', 'standby');

-- CreateEnum
CREATE TYPE "public"."DeviceActionType" AS ENUM ('switch_on', 'switch_off', 'adjust_temperature');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sensor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SensorData" (
    "id" SERIAL NOT NULL,
    "sensor_id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "temperature" DOUBLE PRECISION,
    "humidity" DOUBLE PRECISION,
    "light" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SensorData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Device" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CurrentDeviceStatus" (
    "device_id" TEXT NOT NULL,
    "status" "public"."DeviceStatus" NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrentDeviceStatus_pkey" PRIMARY KEY ("device_id")
);

-- CreateTable
CREATE TABLE "public"."DevicesActionLog" (
    "id" SERIAL NOT NULL,
    "device_id" TEXT NOT NULL,
    "action" "public"."DeviceActionType" NOT NULL,
    "user_id" TEXT NOT NULL,
    "is_executing" BOOLEAN NOT NULL DEFAULT false,
    "status_before" TEXT NOT NULL,
    "status_after" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DevicesActionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- AddForeignKey
ALTER TABLE "public"."SensorData" ADD CONSTRAINT "SensorData_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "public"."Sensor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurrentDeviceStatus" ADD CONSTRAINT "CurrentDeviceStatus_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "public"."Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DevicesActionLog" ADD CONSTRAINT "DevicesActionLog_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "public"."Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DevicesActionLog" ADD CONSTRAINT "DevicesActionLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
