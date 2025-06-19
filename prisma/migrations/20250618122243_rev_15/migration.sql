/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Credential" ADD COLUMN     "deviceName" TEXT,
ADD COLUMN     "lastUsedAt" TIMESTAMP(3),
ADD COLUMN     "transports" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Credential_userId_key" ON "Credential"("userId");
