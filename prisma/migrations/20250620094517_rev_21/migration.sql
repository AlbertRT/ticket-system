/*
  Warnings:

  - Made the column `device_token` on table `UserDevice` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserDevice" ALTER COLUMN "device_token" SET NOT NULL;
