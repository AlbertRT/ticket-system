/*
  Warnings:

  - A unique constraint covering the columns `[deviceId]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Credential_deviceId_key" ON "Credential"("deviceId");
