/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ScriptConditionType" AS ENUM ('AND', 'OR');

-- CreateEnum
CREATE TYPE "public"."SensorType" AS ENUM ('TEMPERATURE', 'HUMIDITY', 'LIGHT', 'DEVICE_STATUS');

-- CreateEnum
CREATE TYPE "public"."ComparisonType" AS ENUM ('LESS_THAN', 'GREATER_THAN', 'EQUAL_TO', 'NOT_EQUAL_TO', 'LESS_THAN_OR_EQUAL', 'GREATER_THAN_OR_EQUAL');

-- DropIndex
DROP INDEX "public"."User_username_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "phoneNumber",
DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "public"."DeviceScript" (
    "id" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeviceScript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ScriptCondition" (
    "id" TEXT NOT NULL,
    "script_id" TEXT NOT NULL,
    "condition_type" "public"."ScriptConditionType" NOT NULL,
    "sensor_type" "public"."SensorType" NOT NULL,
    "comparison_type" "public"."ComparisonType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ScriptCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ScriptAction" (
    "id" TEXT NOT NULL,
    "script_id" TEXT NOT NULL,
    "action_type" "public"."DeviceActionType" NOT NULL,
    "action_target" TEXT NOT NULL,
    "action_value" TEXT,

    CONSTRAINT "ScriptAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."DeviceScript" ADD CONSTRAINT "DeviceScript_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "public"."Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScriptCondition" ADD CONSTRAINT "ScriptCondition_script_id_fkey" FOREIGN KEY ("script_id") REFERENCES "public"."DeviceScript"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScriptAction" ADD CONSTRAINT "ScriptAction_script_id_fkey" FOREIGN KEY ("script_id") REFERENCES "public"."DeviceScript"("id") ON DELETE CASCADE ON UPDATE CASCADE;
