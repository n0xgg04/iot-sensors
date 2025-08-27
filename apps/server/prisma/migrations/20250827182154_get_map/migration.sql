/*
  Warnings:

  - Added the required column `sensor_id` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Device" ADD COLUMN     "sensor_id" TEXT NOT NULL;
