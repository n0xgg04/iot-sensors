/*
  Warnings:

  - A unique constraint covering the columns `[id,sensor_id]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Device_id_sensor_id_idx" ON "public"."Device"("id", "sensor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Device_id_sensor_id_key" ON "public"."Device"("id", "sensor_id");
