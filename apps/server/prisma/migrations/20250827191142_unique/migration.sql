/*
  Warnings:

  - A unique constraint covering the columns `[sensor_id]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Device_sensor_id_key" ON "public"."Device"("sensor_id");
